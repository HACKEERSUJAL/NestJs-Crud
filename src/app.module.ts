import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://sujal:Rathoddiginpe@cluster0.zxqhpyb.mongodb.net/NestJs-Practise',
    ),
    UserModule,
  ],
})
export class AppModule {}
