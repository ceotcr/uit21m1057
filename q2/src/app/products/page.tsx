'use client'
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Select, SelectItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Pagination } from '@nextui-org/react'
import React, { useEffect } from 'react'

const Page = () => {
    // const products = fetch('http://localhost:8000/categories')
    const [category, setCategory] = React.useState("Phone")
    const [priceFrom, setPriceFrom] = React.useState(100)
    const [priceTo, setPriceTo] = React.useState(10000)
    const [count, setCount] = React.useState(10)
    const [products, setProducts] = React.useState([] as any[])
    const categories = [
        "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"
    ]
    const [pages, setPages] = React.useState(1)
    const [currentPage, setCurrentPage] = React.useState(1)
    const handleCategory = (e: any) => {
        setCategory(e.target.value)
    }

    useEffect(() => {
        showResult()
    }, [currentPage])

    const showResult = () => {
        console.log(
            category, priceFrom, priceTo, count, currentPage
        )
        fetch(`http://localhost:8000/categories/${category}/products?n=${count}&minPrice=${priceFrom}&maxPrice=${priceTo}&page=${currentPage}`).then(res => res.json()).then(data => {
            setProducts(data.products)
            setPages(data.pages)
        }).catch(err => {
            console.log(err)
        }
        )
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="w-[96vw] max-w-[1440px] h-full grid lg:grid-cols-6 items-center justify-start gap-4">
            <div className="flex w-full gap-4 col-span-1 flex-wrap flex-col">
                <Select

                    label="Select Category"
                    value={category}
                    className="w-full text-black"
                >
                    {categories.map((category) => (
                        <SelectItem className='text-black' key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </Select>
                <div className="flex flex-col">
                    <label htmlFor="min">Min Price: </label>
                    <input type="number" id='min' placeholder="Price from" value={priceFrom} onChange={(e) => setPriceFrom(parseInt(e.target.value))} className='bg-black outline-slate-300 outline-1 outline rounded-lg p-2' />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="max">Max Price: </label>
                    <input type="number" id='max' placeholder="Price to" value={priceTo} onChange={(e) => setPriceTo(parseInt(e.target.value))} className='bg-black outline-slate-300 outline-1 outline rounded-lg p-2' />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="count">Count: </label>
                    <input type="number" id='count' placeholder="Count" value={count} onChange={(e) => setCount(parseInt(e.target.value))} className='bg-black outline-slate-300 outline-1 outline rounded-lg p-2' />
                </div>
                <Button
                    onClick={showResult}
                >Show Result</Button>
            </div>
            <div className='w-full col-span-5 grid md:grid-cols-2 h-full overflow-hidden overflow-y-scroll p-4 gap-4'>
                {
                    products?.length === 0 ? <h1>No Products Found</h1> : products?.map((product) => (
                        <div key={product.id} className='flex flex-col gap-4 bg-slate-900 p-4 rounded-lg'>
                            <h1>Product Name: {product.productName}</h1>
                            <h2>$ {product.price} with {product.discount}% discount</h2>
                            <p>{product.availability == "yes" ? "Available" : "Out of Stock"}</p>
                        </div>
                    ))
                }
            </div>
            <Pagination total={pages} initialPage={currentPage}
                onChange={setCurrentPage}
            />
        </div>
    )
}

export default Page