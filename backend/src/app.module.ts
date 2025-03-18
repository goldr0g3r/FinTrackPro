import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/helpers/logger/Logger.module';
import { UserModule } from './user/user.module';
import GetWinstonConfig from './common/helpers/logger/WinstonConfig';
import { ConfigModule } from '@nestjs/config';
import { registerConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [registerConfig],
      envFilePath: ['.env', '.env.development'],
    }),
    LoggerModule.forRoot(GetWinstonConfig()),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
