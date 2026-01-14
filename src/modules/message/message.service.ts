import { Injectable } from '@nestjs/common';
import { Message } from './entity/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>
    ) {}

    create(data: CreateMessageDto) {
        const message = this.messageRepository.create(data);
        return this.messageRepository.save(message);
    }

    findAll() {
        return this.messageRepository.find();
    }

    findByEmail(email: string) {
        return this.messageRepository.find({ where: { email } });
    }
}
