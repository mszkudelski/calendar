<template>
  <main>
    <div class="button">
      <!--      <button v-on:click="showPrevDay()">Prev</button>-->
      <!--      <button v-on:click="showNextDay()">Next</button>-->
      <router-link v-bind:to="'/month/' + prevDate">
        <button>Prev</button>
      </router-link>
      <router-link v-bind:to="'/month/' + nextDate">
        <button>Next</button>
      </router-link>
    </div>
    <Month v-bind:date="date" />
  </main>
</template>

<script lang="ts">
// @ is an alias to /src
import Month from "@/components/Month.vue";
import { add, sub } from "date-fns";
import { extractParamDate } from "@/helpers/extract-param-date";

export default {
  name: "MonthView",
  components: {
    Month
  },
  methods: {
    setNewDate(date: Date) {
      this.$set(this, "date", date);
      this.$set(this, "prevDate", sub(date, { months: 1 }).toISOString());
      this.$set(this, "nextDate", add(date, { months: 1 }).toISOString());
    }
  },
  watch: {
    $route(to) {
      const date = extractParamDate(to);
      this.setNewDate(date);
      this.$store.commit("changeCurrentDate", date);
    }
  },
  data() {
    const date = extractParamDate(this.$route);
    this.$store.commit("changeCurrentDate", date);
    return {
      date,
      prevDate: sub(date, { months: 1 }).toISOString(),
      nextDate: add(date, { months: 1 }).toISOString()
    };
  }
};
</script>
