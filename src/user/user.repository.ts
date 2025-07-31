import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { catchError } from '../utils/response.util';
import { UserType } from './types/user.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserType> {
    try {
      return await new this.userModel(dto).save();
    } catch (e) {
      throw catchError(e);
    }   
  }

  async findAll(): Promise<UserType[]> {
    try {
      return await this.userModel.find().exec();
    } catch (e) {
      throw catchError(e);
    }
  }

  async findOne(id: string): Promise<UserType> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) throw new Error('User not found');
      return user;
    } catch (e) {
      throw catchError(e);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserType> {
    try {
      const updated = await this.userModel.findByIdAndUpdate(id, dto, {
        new: true,
      });
      if (!updated) throw new Error('User not found');
      return updated;
    } catch (e) {
      throw catchError(e);
    }
  }

  async remove(id: string): Promise<UserType> {
    try {
      const data = await this.userModel.findByIdAndDelete(id);
      if (!data) throw new Error('User not found');
      return data;
    } catch (e) {
      throw catchError(e);
    }
  }
}
