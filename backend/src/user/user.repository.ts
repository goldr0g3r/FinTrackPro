import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class UserRepository {
  constructor() {}

  async findById(userId: UUID) {}
}
