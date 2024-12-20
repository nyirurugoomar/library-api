import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    getAllBooks(query: ExpressQuery): Promise<Book[]>;
    createBook(book: CreateBookDto, req: any): Promise<Book>;
    getBook(id: string): Promise<Book>;
    updateBook(id: string, book: UpdateBookDto): Promise<Book>;
    deleteBook(id: string): Promise<Book>;
    uploadImages(id: string, files: Array<Express.Multer.File>): Promise<import("mongoose").Document<unknown, {}, Book> & Book & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
