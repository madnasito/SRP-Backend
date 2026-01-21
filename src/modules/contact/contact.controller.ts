import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  findAllMessages() {
    return this.contactService.findAll();
  }

  @Get('messages/:email')
  findMessagesByEmail(@Param('email') email: string) {
    return this.contactService.findByEmail(email);
  }
}
