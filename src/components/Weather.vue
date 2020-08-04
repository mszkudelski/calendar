<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EventBlock from "@/components/EventBlock.vue";

@Component
export default class Weather extends Vue {
  @Prop() private date!: Date;
  constructor() {
    super();
    this.$watch("date", this.updateWeather);
  }
  mounted() {
    this.updateWeather();
  }
  updateWeather() {
    console.log(this.date);
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const weatherData = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6f9d5e926cbb9d4cddbcfc0ba2e8a95b`,
        { headers: { "Content-Type": "application/json" } }
      ).then(response => {
        console.log(response);
        return response.json();
      });
      console.log(weatherData);
    }, console.error);
  }
}
</script>

<style scoped lang="scss"></style>
