import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

  const config = new DocumentBuilder()
    .setTitle('medium example')
    .setDescription('The medium API description')
    .setVersion('1.0')
    // .addTag('medium')
    .addBearerAuth({
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
