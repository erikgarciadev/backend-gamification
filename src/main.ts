import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8888;

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Backend gamification')
    .setDescription('The backend Gamification API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        let _errors = {};
        for (const error of errors) {
          _errors = {
            ..._errors,
            [error.property]: Object.values(error.constraints)[0]
              .replace(error.property, '')
              .trim(),
          };
        }

        const response = {
          message: 'Bad Request',
          error: 'Bad Request',
          errors: _errors,
          statusCode: 400,
        };
        return new BadRequestException(response);
      },
    }),
  );

  app.enableCors();
  await app.listen(port);
}
bootstrap();
