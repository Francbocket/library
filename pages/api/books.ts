import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const booksFileContents = await fs.readFile(jsonDirectory + '/books.json', 'utf8');
    res.status(200).json(JSON.parse(booksFileContents));
}