import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

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
    
        return this.userRepository.save(newUser);
    } catch (error) {
        throw error;
    }
  }

  async editUser(data: EditUserDto, id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    user.name = data.name;
    user.email = data.email;
    return this.userRepository.save(user);
  }

  async updatePassword(id: number, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    user.password = password;
    return this.userRepository.save(user);
  }
}
