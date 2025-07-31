import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      //Add your Mongo DB Link to connect mongoose in string,
    ),
    UserModule,
  ],
})
export class AppModule {}
