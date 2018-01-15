<!-- 
  @user slipkinem
  @date 2017/4/12
 -->
<template>
  <div id="chart" style="width: 600px;height: 400px;"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'

  export default {
    data () {
      return {
        chart: null
      }
    },
    mounted () {
      this.chart = echarts.init(document.getElementById('chart'))
      this.chart.setOption({
        title: {text: 'ECharts 入门示例'},
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
      console.log('this.chart', this.chart)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>