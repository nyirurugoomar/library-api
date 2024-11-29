import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SkipThrottle } from '@nestjs/throttler';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { BookDto } from './dto/book.dto';

@ApiBearerAuth()
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  @ApiOperation({ summary: 'Fetch a list of books' })
  @ApiResponse({
    status: 200,
    description: 'List of book fetched successfully',
  })
  @ApiNotFoundResponse({ description: 'Fail to fetch list of books' })
  @ApiOkResponse({
    description: 'List of books retrived successfully',
    type: BookDto,
    isArray: true,
  })
  @SkipThrottle()
  @UseGuards(AuthGuard(), RoleGuard)
  @Roles(Role.Moderator, Role.User)
  async getAllBooks(
    @Query()
    query: ExpressQuery,
  ): Promise<Book[]> {
    return this.bookService.findAll(query);
  }
  @Post()
  @ApiOperation({ summary: 'Create new book' })
  @ApiCreatedResponse({
    description: 'Book created successfully',
  })
  @ApiOkResponse({
    description: 'Book created successfully',
    type: CreateBookDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch book by id' })
  @ApiResponse({ status:200,description: 'Book found' })
  @ApiNotFoundResponse({ description: 'Book not found.' })
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update book'})
  @ApiOkResponse({description:'Book updated successfully'})
  @ApiNotFoundResponse({ 
    description: 'Book not found',
    type:UpdateBookDto,
    isArray:true
 })
  async updateBook(
    @Param('id')
    id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  @ApiOperation({summary:'Delete book by id'})
  @ApiResponse({status:200,description: 'Book deleted successfully'})
  @ApiNotFoundResponse({description:'Book id not found'})
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.deleteById(id);
  }

  @Put('upload/:id')
  @ApiOperation({summary:'Upload image'})
  @ApiResponse({status:200,description: 'Upload image successfully'})
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    @Param('id') id: string,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|png|jpeg)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1000,
          message: 'File must be less than 10Mb',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.bookService.uploadImages(id, files);
  }
}
