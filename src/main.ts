import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

//! We use this approach because there is configuration mismatch between NEST and cookie-session
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? Add validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  //? Add cookie-session
  app.use(
    cookieSession({
      keys: ['cookieSessionString']
    })
  );

  //? Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Car Value 🚗')
    .setDescription('Estimate your car value and submit car sold report.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
