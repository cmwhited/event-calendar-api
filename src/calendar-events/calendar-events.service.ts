import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CalendarEvent, Guest } from './interfaces';
import {
  CalendarEvent as CalendarEventType,
  CalendarEventInput,
  Guest as GuestType,
  GuestInput,
  ApiResponse as ApiResponseType,
} from '../graphql.schema';

@Injectable()
export class CalendarEventService {
  private readonly logger: Logger = new Logger(CalendarEventService.name);

  constructor(@InjectModel('calendar_event') private readonly calendarEventModel: Model<CalendarEvent>) {}

  async get(id: string): Promise<CalendarEventType> {
    this.logger.log(`get() - retrieving a Calendar Event record with id ${id}`);
    const event: CalendarEvent = await this.calendarEventModel.findById(id);
    return await this.convertCalendEventToType(event);
  }

  async getAll(): Promise<CalendarEventType[]> {
    this.logger.log(`getAll() - getting all Calendar Event records`);
    const events: CalendarEvent[] = await this.calendarEventModel
      .find()
      .sort({ eventStart: 'ASC', startTime: 'ASC', eventEnd: 'ASC', endTime: 'ASC' })
      .exec();
    return await events.map((event: CalendarEvent): CalendarEventType => this.convertCalendEventToType(event));
  }

  async getInRange(start: string, end: string): Promise<CalendarEventType[]> {
    this.logger.log(`getInRange() - getting all Calendar Event records with a start date from ${start} to ${end}`);
    const events: CalendarEvent[] = await this.calendarEventModel
      .find({ eventStart: { $gte: start, $lt: end } })
      .sort({ eventStart: 'ASC', startTime: 'ASC', eventEnd: 'ASC', endTime: 'ASC' })
      .exec();
    return await events.map((event: CalendarEvent): CalendarEventType => this.convertCalendEventToType(event));
  }

  async create(event: CalendarEventInput): Promise<CalendarEventType> {
    this.logger.log(`create() - creating a Calendar Event record from the Calendar Event Input`);
    try {
      const create: CalendarEvent = this.convertCalendarEventInputToInterface(event);
      const created: CalendarEvent = await new this.calendarEventModel(create).save({ validateBeforeSave: true });
      return this.convertCalendEventToType(created);
    } catch (err) {
      this.logger.error(`create() - failure creating the Calendar Event record:::${err}`);
      throw new Error(err);
    }
  }

  async update(id: string, event: CalendarEventInput): Promise<CalendarEventType> {
    this.logger.log(`update() - updating a Calendar Event record with id ${id} from Calendar Event input`);
    try {
      const updated: CalendarEvent = await this.calendarEventModel.findByIdAndUpdate(id, {
        $set: {
          status: event.status,
          eventStart: event.eventStart,
          startTime: event.startTime,
          eventEnd: event.eventEnd,
          endTime: event.endTime,
          name: event.name,
          description: event.description,
          location: event.location,
          recurring: event.recurring,
        },
      });
      return this.convertCalendEventToType(updated);
    } catch (err) {
      this.logger.error(`update() - failure update the Calendar Event record with id ${id}:::${err}`);
      throw new Error(err);
    }
  }

  async remove(id: string): Promise<ApiResponseType> {
    this.logger.log(`remove() - deleting Calendar Event record with id ${id}`);
    try {
      await this.calendarEventModel.findByIdAndDelete(id);
      return <ApiResponseType>{
        success: true,
        message: `Successfully deleted Calendar Event record with id ${id}`,
      };
    } catch (err) {
      this.logger.error(`update() - failure deleting the Calendar Event record with id ${id}:::${err}`);
      throw new Error(err);
    }
  }

  private convertCalendEventToType(event: CalendarEvent): CalendarEventType {
    return <CalendarEventType>{
      _id: event._id,
      status: event.status,
      eventStart: event.eventStart,
      startTime: event.startTime,
      eventEnd: event.eventEnd,
      endTime: event.endTime,
      name: event.name,
      description: event.description,
      location: event.location,
      guests:
        event.guests && event.guests.length > 0 ? event.guests.map((guest: Guest): GuestType => this.convertGuestToType(guest)) : null,
    };
  }

  private convertCalendarEventInputToInterface(event: CalendarEventInput): CalendarEvent {
    const isNew = event._id ? true : false;
    return <CalendarEvent>{
      isNew,
      _id: event._id || undefined,
      status: event.status,
      eventStart: event.eventStart,
      startTime: event.startTime,
      eventEnd: event.eventEnd,
      endTime: event.endTime,
      name: event.name,
      description: event.description,
      location: event.location,
      guests:
        event.guests && event.guests.length > 0
          ? event.guests.map((guest: GuestInput): Guest => this.convertGuestInputToInterface(guest))
          : null,
    };
  }

  private convertGuestToType(guest: Guest): GuestType {
    return <GuestType>{
      _id: guest.id,
      name: guest.name,
      email: guest.email,
      attending: guest.attending,
    };
  }

  private convertGuestInputToInterface(guest: GuestInput): Guest {
    const isNew = guest._id ? true : false;
    return <Guest>{
      isNew,
      _id: guest._id || undefined,
      name: guest.name,
      email: guest.email,
      attending: guest.attending,
    };
  }
}
