<template>
  <div class="calendar-wrap">
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="mini" style="width: 120px; margin-right: 10px" placeholder="年份" @change="dateChange">
        <el-option
          v-for="(item) in yearArr"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select v-model="currentMonth" size="mini" style="width: 120px" placeholder="月份" @change="dateChange">
        <el-option
          v-for="month in 12"
          :key="month"
          :label="month"
          :value="month"
        />
      </el-select>
    </el-row>
    <el-calendar v-model="calendar">
      <template
        slot="dateCell"
        slot-scope="{data}"
      >
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.slice(8) }} {{ data.isSelected ? '✔️' : ''}}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      calendar: new Date(),
      currentMonth: null,
      currentYear: null,
      yearArr: []
    }
  },
  created() {
    this.currentYear = new Date().getFullYear()
    this.currentMonth = new Date().getMonth() + 1
    this.yearArr = Array.from(Array(11), (item, index) => this.currentYear + index - 5)
  },
  methods: {
    dateChange() {
      this.calendar = new Date(`${this.currentYear}-${this.currentMonth}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
