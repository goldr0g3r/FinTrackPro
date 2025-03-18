import { ApiProperty } from '@nestjs/swagger';
import { IUserRegisterRequest } from 'src/common/interfaces/user/request/IUserRegister';

export class UserRegisterRequestDto implements IUserRegisterRequest {
  @ApiProperty({
    title: 'Name',
    description: 'Name of the user',
    example: 'John Doe',
    required: true,
  })
  name: string;

  @ApiProperty({
    title: 'Email',
    description: 'Email of the user',
    example: 'johndoe@gmail.com',
    required: true,
    uniqueItems: true,
  })
  email: string;

  @ApiProperty({
    title: 'Password',
    description: 'Password of the user',
    example: 'password',
    required: true,
  })
  password: string;
}
