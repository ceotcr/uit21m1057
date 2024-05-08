import express from 'express';
import { configDotenv } from 'dotenv';
import { catRouter } from './routes/Category.js';
import cors from 'cors';
configDotenv();
const app = express();
const port = 8000;

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/categories', catRouter);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});