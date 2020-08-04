import Vue from "vue";
import Vuex from "vuex";
import { CookiesService } from "@/helpers/cookie.service";
import { Calendar, DayState } from "@/models/calendar.model";
import { add, format } from "date-fns";

Vue.use(Vuex);

const cookieService = new CookiesService();
const cookieName = "calendar-app-state";

function saveCalendarInCookie(calendar: Calendar) {
  cookieService.set({
    name: cookieName,
    value: JSON.stringify(Array.from(calendar.values()))
  });
}

interface AppState {
  calendar: Calendar;
  currentDate: Date;
}

export default new Vuex.Store({
  state: function(): AppState {
    const data: DayState[] = JSON.parse(cookieService.get(cookieName));
    let calendar: Calendar;
    if (data) {
      calendar = data.reduce((result, day) => {
        const date = new Date(day.date);
        result.set(format(date, "yyyy-MM-dd"), {
          date,
          events: day.events.map(event => ({
            ...event,
            date: new Date(event.date)
          }))
        });
        return result;
      }, new Map<string, DayState>());
    } else {
      // First user's app usage - cookie doesn't exist yet
      cookieService.set({
        name: cookieName,
        value: JSON.stringify([
          {
            date: new Date(),
            events: [
              {
                date: add(new Date(), { hours: 2 }),
                name: "Dinner with Kate",
                duration: 45
              },
              { date: new Date(), name: "Meeting with Thomas", duration: 90 }
            ]
          }
        ])
      });
      calendar = new Map();
    }

    return { calendar, currentDate: new Date() };
  },
  mutations: {
    changeDay(state: AppState, day: DayState) {
      state.calendar.set(format(day.date, "yyyy-MM-dd"), day);

      saveCalendarInCookie(state.calendar);
    },
    changeCurrentDate(state: AppState, date: Date) {
      if (state.currentDate.toISOString() !== date.toISOString()) {
        state.currentDate = date;
      }
    }
  },
  actions: {},
  modules: {},
  getters: {
    getDay: (state: AppState) => (date: Date) =>
      state.calendar.get(format(new Date(date), "yyyy-MM-dd")),
    getMonth: (state: AppState) => (date: Date) => {
      const dayKey = format(new Date(date), "yyyy-MM-");
      return new Map(
        Array.from(state.calendar.entries())
          .map(([key, day]: [string, DayState]) =>
            key.includes(dayKey) ? [key, day] : null
          )
          .filter(item => item !== null) as [string, DayState][]
      );
    }
  }
});
