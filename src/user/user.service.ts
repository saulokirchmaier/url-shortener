import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const user: User = new User();

      user.email = createUserDto.email;
      user.name = createUserDto.name;
      user.password = this.authService.hashPassword(createUserDto.password);

      const createdUser = await this.userRepository.save(user);

      delete createUserDto.password;

      const token = this.authService.generateToken({
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
      });

      return token;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Email already in use. Please provide a new one',
        );
      }

      throw new BadRequestException('Something went wrong.');
    }
  }

  async singIn({ email, password }: UserLoginDto): Promise<string> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new NotFoundException('Email not found');
      }

      const passwordMatch = await this.authService.comparePassword(
        password,
        user.password,
      );

      if (!passwordMatch) {
        throw new BadRequestException('Email or password do not match');
      }

      delete user.password;

      const token = this.authService.generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      return token;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, { name, password }: UpdateUserDto, payload: any) {
    try {
      if (id !== payload.id) {
        throw new UnauthorizedException('Not authorized');
      }

      const user: User = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      user.name = name;
      user.password = this.authService.hashPassword(password);

      await this.userRepository.save(user);

      delete user.password;

      return user;
    } catch (error) {
      throw error;
    }
  }
}
