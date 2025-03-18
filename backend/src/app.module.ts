import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/helpers/logger/Logger.module';
import { UserModule } from './user/user.module';
import GetWinstonConfig from './common/helpers/logger/WinstonConfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Environment, registerConfig } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfig } from './common/constants/environment';
import { DBConnectionNames } from './common/constants/mongoDB';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [registerConfig],
      envFilePath: ['.env', '.env.development'],
    }),
    LoggerModule.forRoot(GetWinstonConfig()),
    MongooseModule.forRootAsync({
      connectionName: DBConnectionNames.USER_DB,
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<Environment>(EnvConfig)?.mongoUri,
        dbName: configService.get<Environment>(EnvConfig)?.userDbName,
        retryWrites: true,
        writeConcern: {
          j: true,
          w: 'majority',
        },
      }),
      inject: [ConfigService],
    }),

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
