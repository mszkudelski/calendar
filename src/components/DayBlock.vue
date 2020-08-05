<template>
  <div class="block" v-if="day">
    <div class="dayNumber">
      {{ day.date.getDate() }}
    </div>
    <div class="events" v-bind:class="day.events.length || 'events--no-color'">
      {{ day.events.length || "brak" }} wydarzeń
    </div>
  </div>
  <div class="block" v-else></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DayState } from "@/models/calendar.model";

@Component
export default class DayBlock extends Vue {
  @Prop() private day?: DayState;
}
</script>

<style scoped lang="scss">
.block {
  width: 150px;
  height: 100px;
  @media (max-width: 1050px) {
    width: 105px;
  }
  border-right: #2c3e50 solid 1px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .dayNumber {
    position: absolute;
    top: 2px;
    left: 2px;
    $size: 26px;
    width: $size;
    height: $size;
    background-color: #ddd;
    border-radius: calc(#{$size}/ 2);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    font-size: 0.9em;
  }
  .events {
    background-color: coral;
    $size: 30px;
    height: $size;
    border-radius: calc(#{$size}/ 2);
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &--no-color {
      background-color: transparent;
    }
  }
}
</style>
