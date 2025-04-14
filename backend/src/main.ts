import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from './common/helpers/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // logger
  const logger = app.get(Logger);
  app.useLogger(logger);

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('FintrackPro API')
    .setDescription(
      'Provides a comprehensive API for managing personal finances, including income, expenses, budgets, and goals.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'refresh-token',
    )

    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
}
void bootstrap();
