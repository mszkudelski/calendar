<template>
  <main>
    <div class="button">
      <button v-on:click="showPrevDay()">Prev</button>
      <button v-on:click="showNextDay()">Next</button>
    </div>
    <Day v-bind:date="date" />
  </main>
</template>

<script>
// @ is an alias to /src
import Day from "@/components/Day.vue";
import { subDays, addDays } from "date-fns";

export default {
  name: "DayView",
  components: {
    Day
  },
  methods: {
    showPrevDay() {
      this.date = subDays(this.date, 1);
    },

    showNextDay() {
      this.date = addDays(this.date, 1);
    }
  },
  data() {
    return {
      date: new Date()
    };
  }
};
</script>
