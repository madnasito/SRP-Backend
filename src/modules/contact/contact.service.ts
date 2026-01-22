import { Injectable } from '@nestjs/common';
import { ContactMessage } from './entity/contact-message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private messageRepository: Repository<ContactMessage>,
  ) {}

  create(data: CreateMessageDto) {
    const message = this.messageRepository.create(data);
    return this.messageRepository.save(message);
  }

  async findAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.messageRepository.findAndCount({
      skip,
      take: limit,
      order: { id: 'DESC' } as any,
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  findByEmail(email: string) {
    return this.messageRepository.find({ where: { email } });
  }
}
