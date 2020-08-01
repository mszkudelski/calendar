export interface CalendarEvent {
  date: Date;
  name: string;
  // minutes
  duration: number;
}

export interface DayState {
  date: Date;
  events: CalendarEvent[];
}

export type Calendar = Map<string, DayState>;
