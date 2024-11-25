import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
export declare class BookService {
    private bookModel;
    constructor(bookModel: mongoose.Model<Book>);
    findAll(): Promise<Book[]>;
    create(book: Book): Promise<Book>;
    findById(id: string): Promise<Book>;
    updateById(id: string, book: Book): Promise<Book>;
    deleteById(id: string): Promise<Book>;
}
