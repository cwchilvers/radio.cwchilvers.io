import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 5000;

app.use(cors());

app.use('/music', express.static(path.join(__dirname, '../music')));
app.use('/img', express.static(path.join(__dirname, '../img')));

function readJSON(filename: string): any {
    const filePath = path.resolve(__dirname, `../json/${filename}`);
    const rawdata = fs.readFileSync(filePath);
    return JSON.parse(rawdata.toString());
}

app.get('/:songId', (req: Request, res: Response) => {
    const songId = req.params.songId;
    const metadataFile = `${songId}.json`;

    try {
        const songMetadata = readJSON(metadataFile);
        res.json(songMetadata);
    } catch (error) {
        console.error('Error reading metadata file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend for radio.cwchilvers.io running at http://localhost:${PORT}`);
});
