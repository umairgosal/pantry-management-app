'use server'
import { writeFileSync } from 'fs'

const pathtoimg = (imgsrc: string) => {
    const base64Image = imgsrc;

    const buffer = Buffer.from(base64Image, 'base64');
    const imagePath = '/home/gosal/Documents/coding/fellowship/pantry-management-app/public/img.jpg';

    writeFileSync(imagePath, buffer);
}

export default pathtoimg