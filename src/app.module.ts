import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CalendarEventModule } from './calendar-events/calendar-events.module';
import { DateScalar } from './common/scalars/date.scalar';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
        return {
          uri: configService.dbConfig.uri,
          useNewUrlParser: true,
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      typePaths: ['./src/**/*.gql'],
      debug: true,
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
    }),
    ConfigModule,
    CalendarEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
