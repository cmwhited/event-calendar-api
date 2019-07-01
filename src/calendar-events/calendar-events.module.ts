import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CalendarEventService } from './calendar-events.service';
import { CalendarEventResolver } from './calendar-events.resolver';
import { CalendarEventSchema } from './schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'calendar_event', schema: CalendarEventSchema }])],
  providers: [CalendarEventService, CalendarEventResolver],
})
export class CalendarEventModule {}
