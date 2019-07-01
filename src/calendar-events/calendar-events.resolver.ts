import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CalendarEvent, CalendarEventInput, ApiResponse } from '../graphql.schema';
import { CalendarEventService } from './calendar-events.service';

@Resolver('CalendarEvent')
export class CalendarEventResolver {
  constructor(private readonly calendarEventService: CalendarEventService) {}

  @Query('events')
  async events(): Promise<CalendarEvent[]> {
    return this.calendarEventService.getAll();
  }

  @Query('event')
  async event(@Args('id') id: string): Promise<CalendarEvent> {
    return this.calendarEventService.get(id);
  }

  @Query('eventsInRange')
  async eventsInRange(@Args('start') start: string, @Args('end') end: string): Promise<CalendarEvent[]> {
    return this.calendarEventService.getInRange(start, end);
  }

  @Mutation('createEvent')
  async create(@Args('event') event: CalendarEventInput): Promise<CalendarEvent> {
    return this.calendarEventService.create(event);
  }

  @Mutation('updateEvent')
  async update(@Args('id') id: string, @Args('event') event: CalendarEventInput): Promise<CalendarEvent> {
    return this.calendarEventService.update(id, event);
  }

  @Mutation('removeEvent')
  async remove(@Args('id') id: string): Promise<ApiResponse> {
    return this.calendarEventService.remove(id);
  }
}
