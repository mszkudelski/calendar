import Vue from "vue";
import Vuex from "vuex";
import { CookiesService } from "@/helpers/cookie.service";
import { Calendar, DayState } from "@/models/calendar.model";
import { add, format } from "date-fns";

Vue.use(Vuex);

const cookieService = new CookiesService();
const cookieName = "calendar-app-state";
const cookieExpirationTime = 365 * 24 * 3600;

function saveCalendarInCookie(calendar: Calendar) {
  cookieService.set({
    name: cookieName,
    expiration: cookieExpirationTime,
    value: JSON.stringify(Array.from(calendar.values()))
  });
}

export default new Vuex.Store({
  state: (): Calendar => {
    const data: DayState[] = JSON.parse(cookieService.get(cookieName));
    if (data) {
      return data.reduce((result, day) => {
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
    }

    // First user's app usage - cookie doesn't exist yet
    cookieService.set({
      name: cookieName,
      expiration: cookieExpirationTime,
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
    return new Map();
  },
  mutations: {
    changeDay(state, day: DayState) {
      state.set(format(day.date, "yyyy-MM-dd"), day);

      saveCalendarInCookie(state);
    }
  },
  actions: {},
  modules: {},
  getters: {
    getDay: state => (date: Date) =>
      state.get(format(new Date(date), "yyyy-MM-dd")),
    getMonth: state => (date: Date) => {
      const dayKey = format(new Date(date), "yyyy-MM-");
      return new Map(
        Array.from(state.entries())
          .map(([key, day]: [string, DayState]) =>
            key.includes(dayKey) ? [key, day] : null
          )
          .filter(item => item !== null) as [string, DayState][]
      );
    }
  }
});
