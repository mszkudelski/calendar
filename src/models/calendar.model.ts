export interface Event {
  date: Date;
  name: string;
  // minutes
  duration: number;
}

export interface DayState {
  date: Date;
  events: Event[];
}

export type Calendar = Map<string, DayState>;
