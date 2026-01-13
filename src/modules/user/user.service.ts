import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(data: CreateUserDto): Promise<User> {

    try {
        const newUser = this.userRepository.create(data);
    
        const saltOrRounds = 10;
        const password = data.password;
        const hash = hashSync(password, saltOrRounds);
    
        newUser.password = hash as string;
    
        return this.userRepository.save(newUser);
    } catch (error) {
        throw error;
    }
  }
}
