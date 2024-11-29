"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const passport_1 = require("@nestjs/passport");
const role_decorator_1 = require("../auth/decorators/role.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const roles_guard_1 = require("../auth/guards/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const throttler_1 = require("@nestjs/throttler");
const swagger_1 = require("@nestjs/swagger");
const book_dto_1 = require("./dto/book.dto");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async getAllBooks(query) {
        return this.bookService.findAll(query);
    }
    async createBook(book, req) {
        return this.bookService.create(book, req.user);
    }
    async getBook(id) {
        return this.bookService.findById(id);
    }
    async updateBook(id, book) {
        return this.bookService.updateById(id, book);
    }
    async deleteBook(id) {
        return this.bookService.deleteById(id);
    }
    async uploadImages(id, files) {
        return this.bookService.uploadImages(id, files);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch a list of books' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of book fetched successfully',
    }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Fail to fetch list of books' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'List of books retrived successfully',
        type: book_dto_1.BookDto,
        isArray: true,
    }),
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), roles_guard_1.RoleGuard),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Moderator, role_enum_1.Role.User),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new book' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Book created successfully',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Book created successfully',
        type: create_book_dto_1.CreateBookDto,
        isArray: true,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid data provided',
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "createBook", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch book by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Book found' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Book not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBook", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update book' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Book updated successfully' }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Book not found',
        type: update_book_dto_1.UpdateBookDto,
        isArray: true
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete book by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Book deleted successfully' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Book id not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
__decorate([
    (0, common_1.Put)('upload/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload image' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Upload image successfully' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /(jpg|png|jpeg)$/,
    })
        .addMaxSizeValidator({
        maxSize: 1000 * 1000,
        message: 'File must be less than 10Mb',
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "uploadImages", null);
exports.BookController = BookController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map