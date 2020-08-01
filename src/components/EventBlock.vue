<template>
  <div class="event" v-bind:style="{ height: event.duration + 'px' }">
    <div>{{ formatEventHour(event.date) }} {{ event.name }}</div>
    <div class="duration">(duration: {{ event.duration }} min)</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Event } from "@/models/calendar.model";
import { format } from "date-fns";

@Component
export default class EventBlock extends Vue {
  @Prop() private event!: Event;

  formatEventHour(date: Date) {
    return format(date, "HH:mm");
  }
}
</script>

<style scoped lang="scss">
.event {
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.75);
  background-color: coral;
  width: 300px;
  text-align: left;
  margin-bottom: 16px;
  border-radius: 6px;
  padding: 5px 10px;
  min-height: 40px;
  > .duration {
    font-size: 0.8em;
  }
}
</style>
