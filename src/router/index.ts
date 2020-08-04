import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import DayView from "../views/Day.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "DayView",
    component: DayView
  },
  {
    path: "/month",
    name: "MonthView",
    component: () =>
      import(/* webpackChunkName: "month" */ "../views/Month.vue")
  },
  {
    path: "/month/:date",
    name: "MonthView",
    component: () =>
      import(/* webpackChunkName: "month" */ "../views/Month.vue")
  },
  {
    path: "/:date",
    name: "DayView",
    component: DayView
  }
];

const router = new VueRouter({
  routes
});

export default router;
