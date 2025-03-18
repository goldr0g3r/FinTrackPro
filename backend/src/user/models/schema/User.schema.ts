import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID, UUID } from 'crypto';
import * as passportLocalMongoose from 'passport-local-mongoose';
import { IUser } from 'src/common/interfaces/user/IUser';

@Schema()
export class UserSchema implements IUser {
  @Prop({ required: true, unique: true })
  id: UUID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;
}

export const UserSchemaObject = SchemaFactory.createForClass(UserSchema).plugin(
  passportLocalMongoose,
);
