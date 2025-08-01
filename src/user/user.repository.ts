import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { catchError } from '../utils/response.util';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    try {
      return await new this.userModel(data).save();
    } catch (e) {
      throw catchError(e);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (e) {
      throw catchError(e);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) throw new Error('User not found');
      return user;
    } catch (e) {
      throw catchError(e);
    }
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    try {
      const updated = await this.userModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updated) throw new Error('User not found');
      return updated;
    } catch (e) {
      throw catchError(e);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const data = await this.userModel.findByIdAndDelete(id);
      if (!data) throw new Error('User not found');
      return data;
    } catch (e) {
      throw catchError(e);
    }
  }
}
