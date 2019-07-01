import { Document } from 'mongoose';

export type EventStatus = 'UPCOMING' | 'STARTED' | 'COMPLETED';
export type AttendingStatus = 'GOING' | 'PENDING' | 'NOT_GOING';

export interface Guest extends Document {
  readonly name: string;
  readonly email: string;
  readonly attending: AttendingStatus;
}

export interface CalendarEvent extends Document {
  readonly status: EventStatus;
  readonly eventStart: string;
  readonly startTime: string;
  readonly eventEnd: string;
  readonly endTime: string;
  readonly name: string;
  readonly description?: string;
  readonly location?: string;
  readonly recurring?: boolean;
  readonly guests?: Array<Guest>;
}
