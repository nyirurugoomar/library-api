
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty,IsString, MinLength } from "class-validator";

export class LoginDto{

    @ApiProperty({
        description:'email',
        example: 'john.doe@example.com'
    })
    @IsNotEmpty()
    @IsEmail({},{message:"Please enter corrent email"})
    readonly email :string;


    @ApiProperty({
        description:'password',
        example: 'password123'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password :string;
}