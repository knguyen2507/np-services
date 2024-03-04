import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { pathPrefixSwagger } from 'libs/utility/const/path.prefix';
import { AppModule } from './app.module';
import { environment } from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle(`Nguyen Phat Store API`)
    .setDescription(`Nguyen Phat Store API | Environment ${environment.NODE_ENV}`)
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(pathPrefixSwagger.setup, app, document);

  await app.listen(environment.PORT);
  Logger.log(`App ${environment.APPNAME} listen on port ${environment.PORT}`);
}
bootstrap();
