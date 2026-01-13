import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entity/user.entity';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto): Promise<User> {
    return await this.authService.signUp(body);
  }

  @Post('sign-in')
  async signin(@Body() body: SignInDto) {
    return await this.authService.signIn(body);
  }
}
