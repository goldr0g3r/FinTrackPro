import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaObject } from './models/schema/User.schema';
import { DBConnectionNames } from 'src/common/constants/mongoDB';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: UserSchema.name, schema: UserSchemaObject }],
      DBConnectionNames.USER_DB,
    ),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
