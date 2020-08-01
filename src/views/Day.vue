<template>
  <Day v-bind:date="new Date()" />
</template>

<script>
// @ is an alias to /src
import Day from "@/components/Day.vue";

export default {
  name: "DayView",
  components: {
    Day
  }
};
</script>
