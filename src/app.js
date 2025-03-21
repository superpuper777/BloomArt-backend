import express from 'express';
import cors from 'cors'; 
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

const corsOptions = {
    origin: `${process.env.CLIENT_URL}`,
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type', 
  };

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/upload', uploadRoutes);

export default app;