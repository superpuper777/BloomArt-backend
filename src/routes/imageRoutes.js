import { Router } from 'express';
import { pool } from './../utils/db.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM images';
    const [images] = await connection.execute(sql);

    connection.release();
    
    res.status(200).json({
      message: 'Изображения успешно получены',
      images
    });
  } catch (err) {
    console.error('Ошибка при получении изображений:', err);
    res.status(500).json({ message: 'Ошибка при получении изображений' });
  }
});

export default router;
