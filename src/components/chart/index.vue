<template>
  <div ref="chartContainer" :style="{ width: '100%', height: height }"></div>
</template>
 
<script lang="tsx">
import * as echarts from 'echarts';
import { onMounted, onUnmounted, ref, watch } from 'vue';
 
export default {
  name: 'EChart',
  props: {
    option: {
      type: Object,
      required: true
    },
    // width: {
    //   type: String,
    //   default: '600px'
    // },
    height: {
      type: String,
      default: '300px'
    }
  },
  setup(props) {
    const chartContainer = ref(null);
    let chartInstance:any = null;
 
    const initChart = () => {
      chartInstance = echarts.init(chartContainer.value);
      chartInstance.setOption(props.option);
    };
 
    onMounted(() => {
      initChart();
      window.addEventListener('resize', chartInstance.resize);
    });
 
    onUnmounted(() => {
      window.removeEventListener('resize', chartInstance.resize);
      chartInstance.dispose();
    });
 
    watch(() => props.option, (newOption) => {
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