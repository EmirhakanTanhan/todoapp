const PORT = 8000;

import express from 'express';
import cors from 'cors';
import apiRouter from './router.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(apiRouter);

app.listen(PORT,() => console.log(`Server running on PORT ${PORT}`));