import express from 'express';
import cors from 'cors'; 
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import uploadRoutes from './routes/uploadRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const app = express();

// Получаем путь к текущей директории, используя import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
    origin: `${process.env.CLIENT_URL}`,
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type', 
  };

app.use(cors(corsOptions));

app.use(express.json());


app.use('/api/upload', uploadRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/uploads', express.static(join(__dirname,'..', 'uploads')));

export default app;