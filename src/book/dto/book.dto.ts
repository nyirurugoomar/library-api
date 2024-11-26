import { ApiProperty } from "@nestjs/swagger";
import { Category } from "../schemas/book.schema";
import { IsEnum, IsNumber, IsString } from "class-validator";



export class BookDto{


    @ApiProperty({
        description:'The tittle of book',
        example: 'The Great Gatsby'
    })
    @IsString()
    title:string
    
    @ApiProperty({
        description:'The description of book',
        example: 'A tragic tale of the human condition'
    })
    @IsString()
    description: string;


    @ApiProperty({
        description:'The author of book',
        example: 'F. Scott Fitzgerald'
    })
    @IsString()
    author: string

    @ApiProperty({
        description:'The price of book',
        example: 15.99,
        type: 'number',
        format: 'decimal'
    })
    @IsNumber()
    price:number


    @ApiProperty({
        description:'The category of book',
        example: Category.ADVENTURE,
        enum: Category,
    })
    @IsEnum(Category)
    category: Category;
}