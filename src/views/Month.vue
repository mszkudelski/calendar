<template>
  <Month v-bind:date="date" />
</template>

<script>
// @ is an alias to /src
import Month from "@/components/Month.vue";

export default {
  name: "MonthView",
  components: {
    Month
  },
  data() {
    return {
      date: new Date()
    };
  }
};
</script>
