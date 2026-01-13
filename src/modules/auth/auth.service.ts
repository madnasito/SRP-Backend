import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {

        try {
            const existingUser = await this.userService.findByEmail(createUserDto.email);
            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }

            return this.userService.createUser(createUserDto);
        } catch (error) {
            throw error;
        }

    }

    async signIn(signInDto: SignInDto): Promise<any> {

        try {
            const user = await this.userService.findByEmail(signInDto.email);
            if (!user) {
                throw new ConflictException('Invalid credentials');
            }
            
            const isMatch = await compare(signInDto.password, user.password);

            if (!isMatch) throw new BadRequestException('INVALID_CREDENTIALS');

            const payload = { id: user.id };
            const token = await this.jwtService.signAsync(payload);

            return {
                user,
                token,
            };    
        } catch (error) {
            throw error;
        }
        
    }
}
