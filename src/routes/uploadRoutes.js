import { Router } from 'express';
import upload from '../middlewares/multerConfig.js';

import { pool } from './../utils/db.js';

const router = Router();

router.post('/', upload.single('image'), async (req, res) => {
  console.log('req.file:', req.file);
    if (!req.file) {
        return res.status(400).json({ message: 'Нет файла для загрузки' });
    }
    const { filename, path: filePath } = req.file;
    try {
       const connection = await pool.getConnection();
        console.log('Загружен файл:', filename, filePath);
    
        const sql = 'INSERT INTO images (filename, path) VALUES (?, ?)';
        console.log('Выполнение SQL запроса с параметрами:', filename, filePath);
        const [result] = await connection.execute(sql, [filename, filePath]);
        // Освобождаем соединение обратно в пул
        connection.release();
        console.log('Результат выполнения запроса:', result);
    
        res.status(200).json({ message: 'Файл успешно загружен', fileId: result.insertId });
      } catch (err) {
        console.error('Ошибка при сохранении в базе данных:', err);
        res.status(500).json({ message: 'Ошибка при сохранении в базе данных' });
      }
  });

export default router;