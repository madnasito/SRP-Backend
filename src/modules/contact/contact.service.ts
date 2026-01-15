import { Injectable } from '@nestjs/common';
import { ContactMessage } from './entity/contact-message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(ContactMessage)
        private messageRepository: Repository<ContactMessage>
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
