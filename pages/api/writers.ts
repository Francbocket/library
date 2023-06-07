import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { Book, Writer } from '@/app/types/common';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    const jsonDirectory = path.join(process.cwd(), 'json');
    const writersFileContents = await fs.readFile(jsonDirectory + '/writers.json', 'utf8');
    const booksFileContents = await fs.readFile(jsonDirectory + '/books.json', 'utf8');

    // Counting the books of each writer and adding the result to the record
    const numberOfBooksByAuthorId = JSON.parse(booksFileContents)?.reduce((res: Record<number, number>, book: Book) => {
        const authorId = book.author_id;
        if (!res[authorId]) {
            res[authorId] = 1;
        } else {
            res[authorId] += 1
        }

        return res
    }, {}) || {};

    const writersWithNumberOfBooks = JSON.parse(writersFileContents)
        ?.map((writer: Writer) =>
        ({
            ...writer, number_of_books: numberOfBooksByAuthorId.hasOwnProperty(writer.id)
                ? numberOfBooksByAuthorId[writer.id]
                : 0
        }))

    res.status(200).json(writersWithNumberOfBooks);
}