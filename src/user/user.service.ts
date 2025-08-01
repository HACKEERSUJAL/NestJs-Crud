import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { catchError } from 'src/utils/response.util';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.repo.create(createUserDto);
    } catch (e) {
      catchError(e);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.repo.findAll();
    } catch (e) {
      catchError(e);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.repo.findOne(id);
    } catch (e) {
      catchError(e);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.repo.update(id, updateUserDto);
    } catch (e) {
      catchError(e);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.repo.remove(id);
    } catch (e) {
      catchError(e);
    }
  }
}
