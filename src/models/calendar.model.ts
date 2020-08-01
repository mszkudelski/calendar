export interface Event {
  date: Date;
  name: string;
}

export interface DayState {
  date: Date;
  events: Event[];
}

export type Calendar = Map<string, DayState>;
