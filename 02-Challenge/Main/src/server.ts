import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT) || 5432
});

export { pool }; // <-- Exporting so it can be used in queries.ts

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    res.send('✅ Employee Tracker API Running');
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error(`❌ Server failed to start:`, err);
});