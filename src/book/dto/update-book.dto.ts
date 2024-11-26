import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/book.schema";
import { IsEmpty, IsEnum,IsNumber, IsOptional, IsString } from "class-validator";



export class UpdateBookDto{
    
    @ApiProperty({description:'The tittle of book'})
    @IsOptional()
    @IsString()
    readonly title: string;


    @ApiProperty({description:'The description of book'})
    @IsOptional()
    @IsString()
    readonly description: string;


    @ApiProperty({description:'The author of book'})
    @IsOptional()
    @IsString()
    readonly author: string;


    @ApiProperty({description:'The price of book'})
    @IsOptional()
    @IsNumber()
    readonly price: number;


    @ApiProperty({description:'The category of book'})
    @IsOptional()
    @IsEnum(Category,{message:'Please enter correct category'})
    readonly category: Category;

    @IsEmpty({ message: 'You cannot pass user id'})
    readonly user:User
}