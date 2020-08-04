<template>
  <main>
    <h1>Month</h1>
    <p>{{ dateFormatted }}</p>
    <div class="grid">
      <div class="row" v-for="week in getWeeksInMonth(date)" v-bind:key="week">
        <div
          v-for="(day, index) in month.slice((week - 1) * 7, week * 7)"
          v-bind:key="index"
        >
          <router-link
            class="link"
            v-bind:to="'/' + (day && day.date.toISOString())"
            v-if="day"
          >
            <DayBlock v-bind:day="day" />
          </router-link>
          <DayBlock v-else />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { format, getDaysInMonth, setDate, getWeeksInMonth } from "date-fns";
import { DayState } from "@/models/calendar.model";
import DayBlock from "@/components/DayBlock.vue";

@Component({
  components: {
    DayBlock
  }
})
export default class Month extends Vue {
  @Prop() private date!: Date;
  month: DayState[] = [];
  dateFormatted = "";
  getWeeksInMonth = getWeeksInMonth;
  constructor() {
    super();
    this.$watch("date", this.updateMonth);
  }
  mounted() {
    this.updateMonth();
  }
  updateMonth() {
    const monthMap: Map<string, DayState> = this.$store.getters.getMonth(
      this.date
    );
    const month =
      new Array(getDaysInMonth(this.date)).fill(null).map((_, index) => {
        const date = setDate(this.date, index + 1);
        const key = format(date, "yyyy-MM-dd");
        const day = monthMap.get(key);
        return day || { date, events: [] };
      }) || [];
    this.month = [
      ...(month[0].date.getDay()
        ? new Array(month[0].date.getDay() - 1).fill(null)
        : []),
      ...month,
      ...(month[month.length - 1].date.getDay()
        ? new Array(8 - month[month.length - 1].date.getDay()).fill(null)
        : [])
    ];
    this.dateFormatted = format(this.date, "MM.yyyy");
  }
}
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid {
  margin-top: 20px;
}
.row {
  display: flex;
  width: 100%;
  border-top: #2c3e50 solid 1px;
  border-left: #2c3e50 solid 1px;
  &:last-of-type {
    border-bottom: #2c3e50 solid 1px;
  }
}
.link {
  text-decoration: none;
  color: initial;
}
</style>
