<template>
  <div ref="chartContainer" :style="{ width: '100%', height: height }"></div>
</template>
 
<script lang="tsx">
import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref, watch } from 'vue';
 
export default {
  name: 'EChart',
  props: {
    xAxis: {
      type: Array,
      required: true
    },
    series:{
      type: Array,
      required: true
    },
    color: {
      type: String,
      default: 'pink'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  setup(props) {
    const chartContainer = ref(null);
    let chartInstance:any = null;
    const options=ref({
      color:'',
      xAxis: {
        type: 'category',
        data:[]
      },
      yAxis: {
        type: 'value'
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
      },
      series: [
        {
          data: [],
          type: 'bar',
          label: {
            show: true, // 显示数值
            position: 'top' // 数值显示的位置
          }
        }
      ]
    })
    const initChart = () => {
      chartInstance = echarts.init(chartContainer.value);
      chartInstance.setOption(options.value);
    };
 
    onMounted(() => {
      options.value.xAxis.data=props.xAxis
      options.value.color=props.color
      options.value.series[0].data=props.series
      initChart();
      window.addEventListener('resize', chartInstance.resize);
    });
 
    onUnmounted(() => {
      window.removeEventListener('resize', chartInstance.resize);
      chartInstance.dispose();
    });
 
    watch(() => options.value, (newOption) => {
      if (chartInstance) {
        chartInstance.setOption(newOption);
      }
    }, { deep: true });
 
    return {
      chartContainer
    };
  }
};
</script>