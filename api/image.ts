import { VercelRequest, VercelResponse } from '@vercel/node';
import sharp from 'sharp';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        try {
            const imageBuffer = req.body; // Получение тела POST-запроса (изображения)

            if (!imageBuffer) {
                res.status(400).send('No image data received.');
                return;
            }

            // Обработка изображения с помощью sharp
            const processedImageBuffer = await sharp(imageBuffer)
                // Выполнение операций с изображением (например, изменение размера, обрезка и т.д.)
                .resize({ width: 300 }) // Пример: изменение размера до ширины 300px

                // Получение буфера обработанного изображения
                .toBuffer();

            // Отправка обработанного изображения в качестве ответа
            res.setHeader('Content-Type', 'image/jpeg'); // Установка типа контента
            res.status(200).send(processedImageBuffer); // Отправка обработанного изображения
        } catch (error) {
            console.error('Error processing image:', error);
            res.status(500).send('Error processing image.');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
