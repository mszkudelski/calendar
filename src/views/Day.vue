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
import { extractParamDate } from "@/helpers/extract-param-date";

export default {
  name: "DayView",
  components: {
    Day
  },
  methods: {
    showPrevDay() {
      this.$set(this, "date", subDays(this.date, 1));
      this.$store.commit("changeCurrentDate", this.date);
    },

    showNextDay() {
      this.$set(this, "date", addDays(this.date, 1));
      this.$store.commit("changeCurrentDate", this.date);
    }
  },
  watch: {
    $route(to) {
      const date = extractParamDate(to);
      this.$store.commit("changeCurrentDate", date);
      this.$set(this, "date", date);
    }
  },
  data() {
    const date = extractParamDate(this.$route);
    this.$store.commit("changeCurrentDate", date);
    return {
      date
    };
  }
};
</script>
