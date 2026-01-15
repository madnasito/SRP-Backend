import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserGuard } from 'src/common/guards/user.guard';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAllUsers() {
    return this.userService.findAll();
  }

  @UseGuards(UserGuard)
  @Patch('edit')
  editUser(@Body() data: EditUserDto, @Req() req: any) {
    return this.userService.editUser(data, req.user.id);
  }
}
