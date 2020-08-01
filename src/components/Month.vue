<template>
  <main>
    <h1>Month</h1>
    <p>{{ date }}</p>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Month extends Vue {
  @Prop() private date!: Date;
}
</script>

<style scoped></style>
