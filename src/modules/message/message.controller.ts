import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ) {}

    @Post()
    create(@Body() data: CreateMessageDto) {
        return this.messageService.create(data);
    }

    @Get()
    findAll() {
        return this.messageService.findAll();
    }

    @Get(':email')
    findByEmail(@Param('email') email: string) {
        return this.messageService.findByEmail(email);
    }
}
