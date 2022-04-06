import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { SignUpDto } from './dto/auth.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary:
      'Sign up user by email and password and retrieve user with bearer token',
    description: `
            '/auth/sign-up'  - метод регистрации пользователя
            `,
  })
  @ApiBody({
    type: SignUpDto,
  })
  @Post('auth/sing-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiBody({ type: 'object', schema: { example: { email: '', password: '' } } })
  @ApiOperation({
    summary:
      'Sign in user by email and password and retrieve user with bearer token',
    description: `
            '/auth/sign-in'  - метод авторизации пользователя
            `,
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/sing-in')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
}
