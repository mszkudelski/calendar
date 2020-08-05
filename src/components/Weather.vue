<template>
  <div class="weather-wrapper">
    <div class="title">
      Weather for today
    </div>
    <div v-if="weather" class="weather-box">
      <div class="icon">
        <img
          v-bind:src="
            'http://openweathermap.org/img/w/' + weather.icon + '.png'
          "
          alt=""
        />
      </div>
      <div class="column">
        {{ weather.main }}
        <p>Temperature: {{ weather.temperature }} C&deg;</p>
        <p>
          (feels like
          {{ weather.temperatureFeelsLike }} C&deg;)
        </p>
        <p>Wind speed: {{ weather.windSpeed }} km/h</p>
      </div>
    </div>
    <div v-else>
      loading...
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Weather extends Vue {
  weather: {
    main: string;
    temperature: number;
    windSpeed: number;
    temperatureFeelsLike: number;
    icon: string;
  } | null = null;

  mounted() {
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const weatherData = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6f9d5e926cbb9d4cddbcfc0ba2e8a95b&units=metric`,
        { headers: { "Content-Type": "application/json" } }
      ).then(response => response.json());
      console.log(weatherData);

      this.$set(this, "weather", {
        main: weatherData.weather[0].main,
        icon: weatherData.weather[0].icon,
        temperature: weatherData.main.temp,
        temperatureFeelsLike: weatherData.main.feels_like,
        windSpeed: weatherData.wind.speed
      });
    });
  }
}
</script>

<style scoped lang="scss">
.icon {
  padding: 5px;
  background-color: #ddd;
  $size: 70px;
  width: $size;
  height: $size;
  border-radius: calc(#{$size} / 2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.weather-box {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 7px;
  background-color: #2c3e50;
  color: white;
  width: fit-content;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.75);
}
.title {
  margin-bottom: 5px;
}
.weather-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
