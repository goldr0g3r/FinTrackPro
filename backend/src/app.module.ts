import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/helpers/logger/Logger.module';
import { UserModule } from './user/user.module';
import GetWinstonConfig from './common/helpers/logger/WinstonConfig';

@Module({
  imports: [LoggerModule.forRoot(GetWinstonConfig()), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
