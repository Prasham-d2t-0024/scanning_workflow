import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import connection from './config/dbconnection';
import { requestLogger } from './middleware/requestLogger';

async function bootstrap() {
  // Create NestJS app (Express)
  const app = await NestFactory.create(AppModule);

  // Custom request logger middleware
  app.use(requestLogger);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // =========================
  // Swagger Configuration
  // =========================
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('NestJS Swagger API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('swagger', app, swaggerDocument);

  // =========================
  // Database
  // =========================
  await connection.sync();
  console.log('✅ Database synced');

  // =========================
  // Start Server
  // =========================
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger UI available at http://localhost:${PORT}/swagger`);
}

bootstrap();
