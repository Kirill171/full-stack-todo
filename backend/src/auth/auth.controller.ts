import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(
      registerDto.username,
      registerDto.email,
      registerDto.password,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: String,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(@Body() loginDto: LoginDto) {
    const { usernameOrEmail, password } = loginDto;

    if (!usernameOrEmail) {
      throw new Error('Username or email is required');
    }

    if (usernameOrEmail.includes('@')) {
      return this.authService.loginByEmail(usernameOrEmail, password);
    } else {
      return this.authService.loginByUsername(usernameOrEmail, password);
    }
  }
}
