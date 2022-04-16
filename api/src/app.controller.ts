import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from './roles.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service';
import { Public } from './publicDecorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private readonly userService: UsersService) { }

  @Public()
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string) {
    return this.authService.validateUser(email, password);
  }

  @Public()
  @Get('profile')
  getProfile(@Request() req) {
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