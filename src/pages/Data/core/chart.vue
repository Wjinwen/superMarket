<template>
    <div ref="chartContainer" :data="data" :style="{ width: '100%', height: height }"></div>
</template>
 
<script lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

export default {
  name: 'Mychart',
  props: {
    data: {
      type: Object,
      required: true,
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
    const setOption = () => {
      options.value.xAxis.data=props.data.xAxis
      options.value.color=props.data.color||'pink'
      options.value.series[0].data=props.data.series
    };
    onMounted(() => {
      setOption()
      initChart();
      window.addEventListener('resize', chartInstance.resize,{ passive: true });
    });
 
    onUnmounted(() => {
      window.removeEventListener('resize', chartInstance.resize);
      chartInstance.dispose();
    });
 
    watch(() => props.data, () => {
      if (chartInstance) {
        setOption()
        chartInstance.setOption(options.value);
      }
    }, { deep: true });
 
    return {
      chartContainer
    };
  }
};
</script>