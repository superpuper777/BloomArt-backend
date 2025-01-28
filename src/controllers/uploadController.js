import { pool } from '../utils/db.js';

export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send('Нет файла для загрузки');
  }

  const { filename, path: filePath } = req.file;
  const sql = 'INSERT INTO images (filename, path) VALUES (?, ?)';
  pool.query(sql, [filename, filePath], (err, result) => {
    if (err) {
      return res.status(500).send('Ошибка сохранения в базе данных');
    }
    res.status(200).send('Файл успешно загружен и информация сохранена');
  });
};
