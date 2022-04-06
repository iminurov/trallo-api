import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(entity: DeepPartial<Users>) {
    const hashPassword = await bcrypt.hash(entity.password, 10);
    const saveUser = await this.usersRepository.save({
      ...entity,
      password: hashPassword,
    });

    try {
      return this.usersRepository.findOne(saveUser.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: any, options?: FindOneOptions<Users>) {
    return await this.usersRepository.findOne(id, options);
  }

  async update(user: Users, entity: DeepPartial<Users>) {
    await this.usersRepository.update({ id: user.id }, entity);

    return await this.usersRepository.findOne({ id: user.id });
  }

  async remove(id: string) {
    await this.usersRepository.delete({ id });

    return { id };
  }
}
