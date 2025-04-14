import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/helpers/logger/logger.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { environmentConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [environmentConfig],
      cache: true,
    }),
    LoggerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
