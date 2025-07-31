import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  RequestTimeoutException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { catchError, successResponse } from 'src/utils/response.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return successResponse('User Created Succesfully', user, 201);
    } catch (e) {
      return catchError(e);
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.userService.findAll();
      return successResponse('Users Retrieved Succesfully', data);
    } catch (e) {
      return catchError(e);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(id);
      return successResponse('User Fetched by ID', data);
    } catch (e) {
      return catchError(e);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const data = await this.userService.update(id, updateUserDto);
      return successResponse('User Updated Successfully', data);
    } catch (e) {
      return catchError(e);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.userService.remove(id);
      return successResponse('User Deleted Successfully', data);
    } catch (e) {
      return catchError(e);
    }
  }
}
