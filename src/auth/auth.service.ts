import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from '../users/users.entity';
import { DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Users)
    readonly usersRepository: UsersRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    throw new UnauthorizedException('Incorrect username or password!');
  }

  async signUp(entity: DeepPartial<Users>) {
    const hashPassword = await bcrypt.hash(entity.password, 10);
    const saveUser = await this.usersRepository.save({
      ...entity,
      password: hashPassword,
    });

    try {
      const savedUser = await this.usersRepository.findOne(saveUser.id);
      return await this.signIn(savedUser);
    } catch {
      throw new BadRequestException('User is not created!');
    }
  }

  async signIn(userData: Users) {
    const payload = { username: userData.email, sub: userData.id };
    const user = await this.usersRepository.findOne(userData.id);
    const accessToken = await this.jwtService.sign(payload);
    return { user, accessToken };
  }
}
