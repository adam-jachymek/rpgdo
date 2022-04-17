import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service';
import { Public } from './auth/guards/publicDecorator';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class AppController {
  constructor(private authService: AuthService, private readonly userService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string) {
    return this.authService.validateUser(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Public()
  @Get('profile')
  getUserId(@Request() req: any) {
    return req.user;
  }

  @Public()
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.userService.insertUser(
      email,
      hashedPassword,
    );
  }
}