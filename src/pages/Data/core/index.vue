<template>
  <div class="data-core-wrap" v-loading="Loading">
    <searchFiled @search="getData"/>
    <div style="font-size: 18px;font-weight: 600;margin-bottom: 16px">人流量总数：{{ total }}次</div>
    <t-row :gutter="[16, 16]" v-if="ListData.length&&!Loading">
      <t-col v-for="(chart,index) in CHART_LIST_DATA" :key="index" :xs="6" :xl="4">
        <t-card :bordered="false">
          <span class="card-chart-title" :style="{background:chart.titleColor}">{{chart.title}}</span>
          <chart :xAxis="xAxisData" :series="ListData.map((list)=>{return list[chart.code]})" :color="chart.color"/>
        </t-card>
      </t-col>
    </t-row>
    <div v-else>未查询到数据</div>
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
import { getStoreDailyChart} from '@/api/store'
import { ref,computed } from 'vue';
import { CHART_LIST_DATA } from './constants';


const ListData=ref<any[]>([])
const total=ref<number|null>(null)
const Loading=ref(false)

const xAxisData = computed(() => {
  return ListData.value.map((item)=>{return item.date});
});
const getData = (searchObj:any) => {
  ListData.value=[];
  Loading.value=true;
  total.value=0;
  getStoreDailyChart({storeId:searchObj.shop,startDate:searchObj.timeRange[0],endDate:searchObj.timeRange[1]}).then((res)=>{
    if(res.code===200&&res.rows) {
      ListData.value=res.rows
      total.value=res.total
    }
  }).finally(()=>{Loading.value=false;})
};


</script>

<style lang="less" scoped>
.data-core-wrap{
  height: 100%;
  :deep(.t-card__body){
    padding: 16px 16px 0;
    height: 100%;
  }
  .card-chart-title{
    width: auto;
    padding: 4px 12px;
    border-radius: 12px;
    color: var(--td-font-white-1);
    margin-top: 12px;
  }
}
</style>
