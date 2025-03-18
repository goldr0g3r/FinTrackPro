import { IUserRegisterRequest } from './../common/interfaces/user/request/IUserRegister';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './models/schema/User.schema';
import { DBConnectionNames } from 'src/common/constants/mongoDB';
import { PassportLocalModel } from 'mongoose';
import { randomUUID } from 'crypto';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './models/dto/response/UserResponse';
import { InjectLogger } from 'src/common/helpers/logger/Logger.decorator';
import { LoggerService } from 'src/common/helpers/logger/Logger.service';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserSchema.name, DBConnectionNames.USER_DB)
    private userModel: PassportLocalModel<UserSchema>,
    @InjectLogger(UserRepository.name) private logger: LoggerService,
  ) {}
  async register(request: IUserRegisterRequest) {
    const user = await this.userModel.register(
      {
        name: request.name,
        username: request.email,
        id: randomUUID(),
      },
      request.password,
    );
    return this.toUserResponse(user);
  }

  private toUserResponse(user: UserSchema) {
    try {
      const response = plainToClass(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
      return response;
    } catch (error) {
      this.logger.error('Error while converting user to response', error);
    }
  }
}
