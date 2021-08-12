import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1');
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'static'), { prefix: '/static/' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true, limit: '2mb' }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => console.log(`Started at port: ${PORT}`));
}
bootstrap();
