import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const logger = new Logger(bootstrap.name);
  // build application instance
  const app: INestApplication = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  // apply middleware
  app.enableCors();
  // start app
  await app.listen(3000, () => {
    logger.log(`bootstrap() - application has been bootstrapped, started and is running on port ${3000}`);
  });
};
bootstrap();
