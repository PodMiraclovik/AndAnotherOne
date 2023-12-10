import { VercelRequest, VercelResponse } from '@vercel/node';
import sharp from 'sharp';

export default async function imageHandler(req: VercelRequest, res: VercelResponse) {
    try {
        const buffer = await getBufferFromRequest(req);
        const processedImage = await processImage(buffer);
        res.setHeader('Content-Type', 'image/jpeg');
        res.status(200).send(processedImage);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing image');
    }
}

async function getBufferFromRequest(req: VercelRequest): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
    });
}

async function processImage(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
        .grayscale() // Применяем черно-белый эффект
        .toFormat('jpeg')
        .toBuffer();
}
