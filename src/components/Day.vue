<template>
  <div>
    <h1>Day</h1>
    <p>{{ dateFormatted }}</p>
    <p>{{ dayState }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DayState } from "@/models/calendar.model";
import { format } from "date-fns";

@Component
export default class Day extends Vue {
  @Prop() private date!: Date;
  private dateFormatted = "";
  private dayState: DayState = {
    date: this.date,
    events: []
  };
  constructor() {
    super();
    this.$watch("date", this.updateDayState);
  }
  mounted() {
    this.updateDayState();
  }
  updateDayState() {
    this.dayState = this.$store.getters.getDay(this.date) || {
      date: this.date,
      events: []
    };
    this.dateFormatted = format(this.date, "dd.MM.yyyy");
  }
}
</script>

<style scoped></style>
