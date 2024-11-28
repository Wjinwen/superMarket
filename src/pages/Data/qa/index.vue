<template>
  <div class="data-qa-wrap">
    <searchFiled @search="getData"/>
    <div style="font-size: 18px;font-weight: 600;margin-bottom: 16px">人流总量 {{ total }}</div>
    <div style="background: var(--td-bg-color-container);height: calc(100% - 100px);padding: 16px;">
      <div style="margin-bottom: 12px">对话记录</div>
      <div v-for="(list,index) in ListData" :key="index">
          <qaCard style="margin-bottom: 16px;" :Q="list.question" :A="list.answer"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DataQA',
};
</script>
<script setup lang="ts">
import searchFiled from '@/components/searchFiled/index.vue';
import qaCard from '@/components/qaCard/index.vue';
import { getStoreQaHistory} from '@/api/store'
import type { QaHistoryItem } from '@/api/model/storeModel';
import { ref } from 'vue';

const ListData=ref<QaHistoryItem[]>([])
const total=ref<number|null>(null)
const getData = (searchObj:any) => {
  total.value=0;
  getStoreQaHistory({storeId:searchObj.shop,startDate:searchObj.timeRange[0],endDate:searchObj.timeRange[1]}).then((res)=>{
    if(res.code===200&&res.rows) {
      ListData.value=res.rows
      total.value=res.total
    }
  })
};


</script>

<style lang="less" scoped>
.data-qa-wrap{
  height: 100%;
}
</style>
