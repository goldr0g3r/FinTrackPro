import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './common/helpers/logger/Logger.service';
import { ConfigService } from '@nestjs/config';
import { Environment } from './config';
import { EnvConfig } from './common/constants/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environment = app.get(ConfigService).get<Environment>(EnvConfig);

  const logger = await app.resolve(LoggerService);
  const config = new DocumentBuilder()
    .setTitle('FinTrackPro API')
    .setDescription('API documentation for FinTrackPro')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refresh-token',
    )
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          tokenUrl: 'https://example.com/oauth/token',
          scopes: {
            'read:expenses': 'Read your expenses',
            'write:expenses': 'Modify your expenses',
          },
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  logger.log(`Server Listening on HTTP Port: ${environment?.port ?? 3000}`);

  await app.listen(environment?.port ?? 3000);
}
bootstrap();
