import { Schema } from 'mongoose';

export const GuestSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    attending: { type: String, required: true, default: 'PENDING' },
  },
  { timestamps: true },
);

export const CalendarEventSchema = new Schema(
  {
    status: { type: String, required: true, default: 'UPCOMING' },
    eventStart: { type: String, required: true, trim: true },
    startTime: { type: String, required: true },
    eventEnd: { type: String, required: true },
    endTime: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    recurring: { type: Boolean, default: false },
    guests: { type: [GuestSchema] },
  },
  { timestamps: true },
);
