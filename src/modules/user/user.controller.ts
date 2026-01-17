import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserAdminGuard } from 'src/common/guards/user-admin.guard';
import { UserService } from './user.service';
import { UserGuard } from 'src/common/guards/user.guard';
import { EditUserDto } from './dto/edit-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AdminUpdatePasswordDto } from './dto/admin-update-password.dto';

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

  @UseGuards(UserGuard)
  @Patch('update-password')
  updatePassword(@Body() data: UpdatePasswordDto, @Req() req: any) {
    return this.userService.updatePassword(req.user.id, data.password);
  }

  @UseGuards(UserAdminGuard)
  @Patch('admin-update-password')
  adminUpdatePassword(@Body() data: AdminUpdatePasswordDto) {
    return this.userService.updatePassword(data.userId, data.password);
  }
}
