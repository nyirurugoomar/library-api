import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";
export declare enum Category {
    ADVENTURE = "Adventure",
    CLASSICS = "Classics",
    CRIME = "Crime",
    FANTASY = "Fantasy",
    HORROR = "Horror",
    MUSIC = "Music",
    ROMANCE = "Romance",
    SCIENCE_FICTION = "Science Fiction"
}
export declare class Book {
    title: string;
    description: string;
    author: string;
    price: number;
    category: Category;
    images?: object[];
    user: User;
}
export declare const BookSchema: mongoose.Schema<Book, mongoose.Model<Book, any, any, any, mongoose.Document<unknown, any, Book> & Book & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Book, mongoose.Document<unknown, {}, mongoose.FlatRecord<Book>> & mongoose.FlatRecord<Book> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
