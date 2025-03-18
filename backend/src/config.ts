import { IsNotEmpty, IsNumber, Max, Min, validateSync } from 'class-validator';
import { IEnvironment } from './common/interfaces/environment/IEnvironment';
import { registerAs } from '@nestjs/config';
import { EnvConfig } from './common/constants/environment';
import { Expose, plainToClass } from 'class-transformer';

export class Environment implements IEnvironment {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(65535)
  @Expose({ name: 'PORT' })
  port: number;

  @IsNotEmpty()
  @Expose({ name: 'MONGO_URI' })
  mongoUri: string;

  @IsNotEmpty()
  @Expose({ name: 'NODE_ENV' })
  nodeEnv: string;

  @IsNotEmpty()
  @Expose({ name: 'EXPENSE_DB_NAME' })
  expenseDbName: string;

  @IsNotEmpty()
  @Expose({ name: 'USER_DB_NAME' })
  userDbName: string;

  @IsNotEmpty()
  @Expose({ name: 'TRANSACTION_DB_NAME' })
  transactionDbName: string;

  @IsNotEmpty()
  @Expose({ name: 'ACCESS_TOKEN_SECRET' })
  accessTokenSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'REFRESH_TOKEN_SECRET ' })
  refreshTokenSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'ACCESS_TOKEN_EXPIRES_IN' })
  accessTokenExpiresIn: string;

  @IsNotEmpty()
  @Expose({ name: 'REFRESH_TOKEN_EXPIRES_IN' })
  refreshTokenExpiresIn: string;

  @IsNotEmpty()
  @Expose({ name: 'COOKIE_SECRET' })
  cookieSecret: string;

  @IsNotEmpty()
  @Expose({ name: 'COOKIE_EXPIRES_IN' })
  cookieExpiresIn: string;
}

export const registerConfig = registerAs(EnvConfig, (): Environment => {
  const envClass = plainToClass(Environment, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
    exposeUnsetFields: true,
  });

  const errors = validateSync(envClass, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return envClass;
});
