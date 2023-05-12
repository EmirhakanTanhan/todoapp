import Pool from 'pg-pool';
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: 'todoapp'
});

export default pool;