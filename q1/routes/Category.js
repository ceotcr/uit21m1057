import { Router } from "express";
export const catRouter = Router();
import { configDotenv } from 'dotenv';
import { generateToken } from "../libs/generateToken.js";
configDotenv();


catRouter.get('/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;
    const { access_token } = await generateToken();
    if (!categoryname || !productid) {
        return res.status(400).send('Missing required parameters');
    }
    const company = productid.split('-')[0];
    const productName = productid.split('-').slice(1).join(' ');
    const response = await fetch(`${process.env.BASEURL}/companies/${company}/categories/${categoryname}/products?productName=${productName}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    console.log(response)
    const data = await response.json();
    res.send(data);
});

catRouter.get('/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n, minPrice, maxPrice, page = 1 } = req.query;
    const { access_token } = await generateToken();
    console.log(access_token)
    if (!categoryname || !n) {
        return res.status(400).send('Missing required parameters');
    }
    const companies = [
        'AMZ',
        'FLP',
        'SNP',
        'MYN',
        'AZO'
    ]
    const products =
        await Promise.all(companies.map(async (company) => {
            const response = await fetch(`${process.env.BASEURL}/companies/${company}/categories/${categoryname}/products?top=${10}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            const data = await response.json()
            const productswithids = data.map((product) => ({ ...product, id: `${company}-${product.productName.split(' ').join('-')}` }));
            return productswithids;
        }
        ));
    const allProducts = products.reduce((acc, val) => acc.concat(val), []);
    const sortedProducts = allProducts.sort((a, b) => a.price - b.price).slice((page - 1) * 10, page * 10);
    res.send({
        products: sortedProducts.slice(0, 10),
        pages: Math.ceil(n / 10)
    });
});
