<template>
  <div class="day">
    <h1>Day</h1>
    <p>{{ dateFormatted }}</p>
    <div
      v-for="event in getSortedEvents(dayState.events)"
      v-bind:key="event.name"
      class="event"
    >
      <EventBlock v-bind:event="event" />
    </div>
    <div v-if="!dayState.events.length">
      No events yet!
    </div>
  </div>
</template>

<script lang="ts">
import EventBlock from "@/components/EventBlock.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { DayState, Event } from "@/models/calendar.model";
import { format } from "date-fns";

@Component({
  components: {
    EventBlock
  }
})
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
  getSortedEvents(events: Event[]): Event[] {
    return events.sort((a, b) =>
      a.date.getTime() > b.date.getTime() ? 1 : -1
    );
  }
}
</script>

<style scoped lang="scss">
.day {
  display: flex;
  flex-direction: column;
  align-items: center;
  > .event {
    width: fit-content;
  }
}
</style>
