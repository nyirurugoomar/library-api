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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookDto = void 0;
const class_validator_1 = require("class-validator");
const book_schema_1 = require("../schemas/book.schema");
const user_schema_1 = require("../../auth/schemas/user.schema");
const swagger_1 = require("@nestjs/swagger");
class CreateBookDto {
}
exports.CreateBookDto = CreateBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The tittle of book',
        example: 'The Great Gatsby'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The description of book',
        example: 'A tragic tale of the human condition'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The author of book',
        example: 'F. Scott Fitzgerald'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBookDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The price of book',
        example: 15.99
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The category of book',
        example: book_schema_1.Category.ADVENTURE,
        enum: book_schema_1.Category,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(book_schema_1.Category, { message: 'Please enter correct category' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)({ message: 'You cannot pass user id' }),
    __metadata("design:type", user_schema_1.User)
], CreateBookDto.prototype, "user", void 0);
//# sourceMappingURL=create-book.dto.js.map