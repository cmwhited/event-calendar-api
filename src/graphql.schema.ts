
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum AttendingStatus {
    GOING = "GOING",
    PENDING = "PENDING",
    NOT_GOING = "NOT_GOING"
}

export enum EventStatus {
    UPCOMING = "UPCOMING",
    STARTED = "STARTED",
    COMPLETED = "COMPLETED"
}

export interface CalendarEventInput {
    _id?: string;
    status: EventStatus;
    eventStart: string;
    startTime: string;
    eventEnd: string;
    endTime: string;
    name: string;
    description?: string;
    location?: string;
    recurring?: boolean;
    guests?: GuestInput[];
}

export interface GuestInput {
    _id?: string;
    name: string;
    email: string;
    attending: AttendingStatus;
}

export interface ApiResponse {
    success: boolean;
    message: string;
}

export interface CalendarEvent {
    _id: string;
    status: EventStatus;
    eventStart: string;
    startTime: string;
    eventEnd: string;
    endTime: string;
    name: string;
    description?: string;
    location?: string;
    recurring?: boolean;
    guests?: Guest[];
}

export interface Guest {
    _id: string;
    name: string;
    email: string;
    attending: AttendingStatus;
}

export interface IMutation {
    createEvent(event: CalendarEventInput): CalendarEvent | Promise<CalendarEvent>;
    updateEvent(id: string, event: CalendarEventInput): CalendarEvent | Promise<CalendarEvent>;
    removeEvent(id: string): ApiResponse | Promise<ApiResponse>;
}

export interface IQuery {
    events(): CalendarEvent[] | Promise<CalendarEvent[]>;
    event(id: string): CalendarEvent | Promise<CalendarEvent>;
    eventsInRange(start: string, end: string): CalendarEvent[] | Promise<CalendarEvent[]>;
}
