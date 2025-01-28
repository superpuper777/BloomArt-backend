import express from 'express';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/upload', uploadRoutes);

export default app;