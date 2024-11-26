import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { uploadImages } from '../utils/aws';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  //GET ALL BOOK
  async findAll(query: Query): Promise<Book[]> {
    //Pagination
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = (currentPage - 1) * resPerPage;
    //Search query filter for book
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  //CREATE BOOK
  async create(book: Book,user:User): Promise<Book> {
    const data = Object.assign(book,{user:user._id})
    const res = await this.bookModel.create(data);
    return res;
  }
  //Get Book by id
  async findById(id: string): Promise<Book> {

    const isValidId = mongoose.isValidObjectId(id)
    if (!isValidId) {
        throw new BadRequestException('Wrong ID.');
      }

    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    return book;
  }
  //Update the book
  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  //Delete book
  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }


  async uploadImages(id:string,files:Array<Express.Multer.File>){
    const book = await this.bookModel.findById(id);

    if(!book){
        throw new NotFoundException('Book not found.');
    }
    const images = await uploadImages(files)

    book.images = images as object[];

    await book.save()

    return book;
  }
}
