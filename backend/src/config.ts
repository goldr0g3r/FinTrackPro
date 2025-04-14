import { Expose, plainToClass } from 'class-transformer';
import { IEnvironment } from './common/interface/environment';
import { IsNotEmpty, validateSync } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { EnvToken } from './common/constants/environment';

export class Environment implements IEnvironment {
  @IsNotEmpty()
  @Expose({ name: 'NODE_ENV' })
  nodeEnv: string;

  @IsNotEmpty()
  @Expose({ name: 'PORT' })
  port: number;

  @IsNotEmpty()
  @Expose({ name: 'MONGO_URI' })
  mongoUri: string;

  @IsNotEmpty()
  @Expose({ name: 'USER_DB_NAME' })
  userDbName: string;

  @IsNotEmpty()
  @Expose({ name: 'CATEGORY_DB_NAME' })
  categoryDbName: string;

  @IsNotEmpty()
  @Expose({ name: 'TRANSACTION_DB_NAME' })
  transactionDbName: string;
}

export const environmentConfig = registerAs(EnvToken, (): Environment => {
  const envClass = plainToClass(Environment, process.env, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
    exposeDefaultValues: true,
    exposeUnsetFields: true,
  });

  const errors = validateSync(envClass, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(
      `Environment variables validation failed: ${errors
        .map((error) => error.toString())
        .join(', ')}`,
    );
  }

  return envClass;
});
