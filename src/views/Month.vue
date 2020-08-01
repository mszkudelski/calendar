<template>
  <Month v-bind:date="new Date()" />
</template>

<script>
// @ is an alias to /src
import Month from "@/components/Month.vue";

export default {
  name: "MonthView",
  components: {
    Month
  }
};
</script>
