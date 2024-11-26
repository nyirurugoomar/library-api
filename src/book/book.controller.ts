import { Body, Controller, Get,Param,Post,Put,Delete, Query, UseGuards, Req, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import {Query as ExpressQuery} from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService){}
    @Get()
    @SkipThrottle()
    @UseGuards(AuthGuard(),RoleGuard)
    @Roles(Role.Moderator, Role.Admin)
    async getAllBooks(@Query()query : ExpressQuery): Promise<Book[]>{
        return this.bookService.findAll(query);
    }
    @Post()
    @UseGuards(AuthGuard())
    async createBook(
        @Body()
        book:CreateBookDto,
        @Req() req
        ):Promise<Book>{
            
        return this.bookService.create(book,req.user)
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id:string
    ): Promise<Book>{
        return this.bookService.findById(id);
    }


    @Put(':id')
    async updateBook(
        @Param('id')
        id:string,
        @Body()book:UpdateBookDto,):Promise<Book>{
        return this.bookService.updateById(id, book);
    }

    @Delete(':id')
    async deleteBook(
        @Param('id')
        id:string
    ): Promise<Book>{
        return this.bookService.deleteById(id);
    }



    @Put('upload/:id')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('files'))
    async uploadImages(
     @Param('id') id:string,
     @UploadedFiles(
        new ParseFilePipeBuilder().addFileTypeValidator({
            fileType: /(jpg|png|jpeg)$/,
        })
        .addMaxSizeValidator({
            maxSize:1000 * 1000,
            message:'File must be less than 10Mb'
        })
        .build({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
     ) files: Array <Express.Multer.File>

    ){
        return this.bookService.uploadImages(id,files)
    }

}
