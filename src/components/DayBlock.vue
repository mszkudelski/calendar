<template>
  <div class="block" v-if="day">
    {{ day.date.getDate() }} {{ day.events.length }}
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
  width: 100px;
  height: 80px;
}
</style>
