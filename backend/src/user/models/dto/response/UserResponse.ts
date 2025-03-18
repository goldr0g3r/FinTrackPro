import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { randomUUID, UUID } from 'crypto';
import { IUser } from 'src/common/interfaces/user/IUser';

export class UserResponseDto implements IUser {
  @ApiProperty({
    title: 'ID',
    description: 'ID of the user',
    example: randomUUID(),
    required: true,
    uniqueItems: true,
  })
  @Expose()
  id: UUID;

  @ApiProperty({
    title: 'Name',
    description: 'Name of the user',
    example: 'John Doe',
    required: true,
  })
  @Expose()
  name: string;

  @ApiProperty({
    title: 'Email',
    description: 'Email of the user',
    example: 'johndoe@gmail.com',
    required: true,
    uniqueItems: true,
  })
  @Expose()
  username: string;
}
