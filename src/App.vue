<template>
  <div id="app">
    <div id="nav">
      <router-link v-bind:to="'/' + date.toISOString()">Day</router-link> |
      <router-link v-bind:to="'/month/' + date.toISOString()"
        >Month</router-link
      >
    </div>
    <div class="weather">
      <Weather />
    </div>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import { extractParamDate } from "@/helpers/extract-param-date";
import Weather from "@/components/Weather.vue";

export default {
  name: "App",
  components: {
    Weather
  },
  watch: {
    $route(to) {
      const date = extractParamDate(to);
      this.$store.commit("changeCurrentDate", date);
      this.$set(this, "date", date);
    }
  },
  data() {
    const date = extractParamDate(this.$route);
    this.$store.commit("changeCurrentDate", date);
    return {
      date
    };
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.weather {
  width: 100%;
  margin: 20px 0;
}
</style>
