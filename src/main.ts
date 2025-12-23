import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import connection from './config/dbconnection';
import { requestLogger } from './middleware/requestLogger';
import "./models";
import * as cors from 'cors';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware
  app.use(requestLogger);

  //CORS
  app.use(cors({
    origin: '*'
  }));
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('NestJS Swagger API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Database
  await connection.sync();
  console.log('Database synced');

  // Server
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📘 Swagger UI: http://localhost:${PORT}/docs`);
}

bootstrap();
