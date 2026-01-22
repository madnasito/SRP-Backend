import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('create-message')
  createMessage(@Body() data: CreateMessageDto) {
    return this.contactService.create(data);
  }

  @Get('messages')
  findAllMessages(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.contactService.findAll(page, limit);
  }

  @Get('messages/:email')
  findMessagesByEmail(@Param('email') email: string) {
    return this.contactService.findByEmail(email);
  }
}
