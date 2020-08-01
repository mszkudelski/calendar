import Vue from "vue";
import Vuex from "vuex";
import { CookiesService } from "@/helpers/cookie.service";
import { Calendar, DayState } from "@/models/calendar.model";
import { add, format } from "date-fns";

Vue.use(Vuex);

const cookieService = new CookiesService();
const cookieName = "calendar-app-state";

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

    // First user's app usage - cookie doesnt' exist yet
    cookieService.set({
      name: cookieName,
      expiration: 365 * 24 * 3600,
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
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    getDay: state => (date: Date) =>
      state.get(format(new Date(date), "yyyy-MM-dd"))
  }
});
