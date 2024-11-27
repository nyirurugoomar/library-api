import { Controller, Post, Body,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import {ApiOperation,ApiCreatedResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({summary:'Sign Up for new user'})
  @ApiCreatedResponse({description: 'User created successfully',type:SignUpDto,isArray:true})
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  @ApiOperation({summary:'Login'})
  @ApiCreatedResponse({
    description:'Login successfully',
    type:LoginDto,
    isArray:true
  })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
