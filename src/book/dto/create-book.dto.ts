import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../schemas/book.schema";
import { User } from "../../auth/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";


export class CreateBookDto{

    @ApiProperty({
        description:'The tittle of book',
        example: 'The Great Gatsby'
    })
    @IsNotEmpty()
    @IsString()
    readonly title: string;
    
    @ApiProperty({
        description:'The description of book',
        example: 'A tragic tale of the human condition'
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;


    @ApiProperty({
        description:'The author of book',
        example: 'F. Scott Fitzgerald'
    })
    @IsNotEmpty()
    @IsString()
    readonly author: string;


    @ApiProperty({
        description:'The price of book',
        example: 15.99
    })
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;


    @ApiProperty({
        description:'The category of book',
        example: Category.ADVENTURE,
        enum: Category,
    })
    @IsNotEmpty()
    @IsEnum(Category,{message:'Please enter correct category'})
    readonly category: Category;

    @IsEmpty({ message: 'You cannot pass user id'})
    readonly user:User
}