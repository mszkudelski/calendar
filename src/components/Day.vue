<template>
  <main>
    <h1>Day</h1>
    <p>{{ date }}</p>
    <p>{{ dayState }}</p>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DayState } from "@/models/calendar.model";

@Component
export default class Day extends Vue {
  @Prop() private date!: Date;
  private dayState: DayState = this.$store.getters.getDay(this.date) || {
    date: this.date,
    events: []
  };
}
</script>

<style scoped></style>
