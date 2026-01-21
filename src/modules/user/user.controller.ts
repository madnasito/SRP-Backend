import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(UserAdminGuard)
  @Delete('deactivate')
  deactivateUser(@Query('id') id: string) {
    return this.userService.deactivateUser(parseInt(id));
  }

  @UseGuards(UserAdminGuard)
  @Delete('activate')
  activateUser(@Query('id') id: string) {
    return this.userService.activateUser(parseInt(id));
  }
}
