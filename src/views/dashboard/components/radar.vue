<template>
  <div ref="main" class="radar" />
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, LegendComponent } from 'echarts/components'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer])

export default {
  name: 'Radar',
  mounted() {
    const myChart = echarts.init(this.$refs.main)
    const option = {
      title: {
        text: 'Basic Radar Chart'
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '工作效率', max: 6500 },
          { name: '考勤', max: 16000 },
          { name: '积极性', max: 30000 },
          { name: '帮助同事', max: 38000 },
          { name: '自主学习', max: 52000 },
          { name: '正确率', max: 25000 }
        ]
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            }
          ]
        }
      ]
    }
    myChart.setOption(option)
  }
}
</script>

<style scoped>
.radar {
  width: 500px;
  height: 500px;
}
</style>
