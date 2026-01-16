import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entity/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { UserAdminGuard } from 'src/common/guards/user-admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(UserAdminGuard)
  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto): Promise<{ user: User; token: string }> {
    return await this.authService.signUp(body);
  }

  @Post('sign-in')
  async signin(@Body() body: SignInDto): Promise<{ user: User; token: string }> {
    return await this.authService.signIn(body);
  }
}
