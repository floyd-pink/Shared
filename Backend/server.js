import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import connectDb from './utils/db.js';
env.config();
const app = express();
app.use(express.json());

connectDb();

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:5173","http://localhost:8000"],
  credentials: true,
}));
const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });