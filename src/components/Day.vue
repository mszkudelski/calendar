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
    <form v-on:submit="createNewEvent($event)">
      <input
        v-model="newEvent.name"
        class="input"
        type="text"
        name="event"
        placeholder="Add new event..."
      />
      <select name="startDate" id="startDate" v-model="newEvent.startDate">
        <option
          v-for="hourSlot in hourSlots"
          v-bind:value="hourSlot"
          v-bind:key="hourSlot"
          >{{ hourSlot }}</option
        >
      </select>
      <select name="endDate" id="endDate" v-model="newEvent.endDate">
        <option
          v-for="hourSlot in hourSlots"
          v-bind:value="hourSlot"
          v-bind:key="hourSlot"
          >{{ hourSlot }}</option
        >
      </select>
    </form>
  </div>
</template>

<script lang="ts">
import EventBlock from "@/components/EventBlock.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { DayState, CalendarEvent } from "@/models/calendar.model";
import { add, format, roundToNearestMinutes } from "date-fns";

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
  private newEvent = {
    name: "",
    startDate: format(
      roundToNearestMinutes(new Date(), { nearestTo: 30 }),
      "HH:mm"
    ),
    endDate: format(
      add(roundToNearestMinutes(new Date(), { nearestTo: 30 }), { hours: 1 }),
      "HH:mm"
    )
  };
  private hourSlots = new Array(24)
    .fill(null)
    .map((_, index) => {
      const hour = index.toString().padStart(2, "0");
      return [`${hour}:00`, `${hour}:30`];
    })
    .flat();
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
  getSortedEvents(events: CalendarEvent[]): CalendarEvent[] {
    return events.sort((a, b) =>
      a.date.getTime() > b.date.getTime() ? 1 : -1
    );
  }
  createNewEvent(submitEvent: Event) {
    submitEvent.preventDefault();

    const [hours, minutes] = this.newEvent.startDate.split(":");

    this.dayState.events.push({
      name: this.newEvent.name,
      date: new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        +hours,
        +minutes
      ),
      duration: this.calculateDuration(
        this.newEvent.startDate,
        this.newEvent.endDate
      )
    });
    this.$store.commit("changeDay", this.dayState);
  }

  private calculateDuration(startDate: string, endDate: string): number {
    const [startHours, startMinutes] = startDate.split(":");
    const [endHours, endMinutes] = endDate.split(":");

    return (
      (new Date(0, 0, 0, +endHours, +endMinutes).getTime() -
        new Date(0, 0, 0, +startHours, +startMinutes).getTime()) /
      1000 /
      60
    );
  }
}
</script>

<style scoped lang="scss">
.day {
  margin: 0 auto;
  width: fit-content;
  > .event {
    width: fit-content;
  }
}
.input {
  margin-top: 10px;
  font-size: 1em;
  width: 100%;
  padding: 5px 10px;
  border: none;
  border-bottom: 1px solid #aaa;
}
</style>
