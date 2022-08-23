import { Controller, Get, Body, Post, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() registerUserDto: UserDto) {

  }
  @Post('login')
  async login(@Body() loginUserDto: UserDto) {
    
  }
  @UseGuards(AuthGuard)
  @Get('protected')
  async protected() {
    return "Access granted"
  }
}