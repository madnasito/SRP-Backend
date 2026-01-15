import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { ContactMessage } from './entity/contact-message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessage])],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
