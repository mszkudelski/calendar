import { Route } from "vue-router";

export function extractParamDate(route: Route): Date {
  const dateParam = route.params.date;
  return (dateParam && new Date(dateParam)) || new Date();
}
