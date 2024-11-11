<template>
  <div class="data-core-wrap">
    <searchFiled />
    <div style="font-size: 18px;font-weight: 600;margin-bottom: 16px">人流总量 {{ '2400' }}</div>
    <t-row :gutter="[16, 16]">
        <t-col v-for="i in 8" :key="i" :xs="6" :xl="4">
          <t-card :bordered="false">
            <span class="card-chart-title">呼叫人工次数</span>
            <chart :option="options"/>
          </t-card>
        </t-col>
      </t-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DataCore',
};
</script>

<script setup lang="ts">
import searchFiled from '@/components/searchFiled/index.vue';
import chart from '@/components/chart/index.vue';
import { ref } from 'vue';
const options=ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      label: {
            show: true, // 显示数值
            position: 'top' // 数值显示的位置
        }
    }
  ]
})
</script>

<style lang="less" scoped>
.data-core-wrap{
  :deep(.t-card__body){
    padding: 16px 16px 0;
    height: 100%;
  }
  .card-chart-title{
    width: auto;
    padding: 4px 12px;
    background: pink;
    border-radius: 12px;
    color: var(--td-font-white-1);
    margin-top: 12px;
  }
}
</style>
