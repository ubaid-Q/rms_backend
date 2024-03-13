import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'shared/exception.filter';
import { urlencoded } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(compression());
  app.setGlobalPrefix('api');
  app.useStaticAssets('public');
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  swaggerInit(app);
  await app.listen(3001);
}
bootstrap();

function swaggerInit(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Restaurant Managment System')
    .setDescription('The RMS Backend APIs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
}
