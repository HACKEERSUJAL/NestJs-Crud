import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
     //put here your mongoDB Atlas Link,
    ),
    UserModule,
  ],
})
export class AppModule {}
