<template>
  <div class="data-qa-wrap" v-loading='Loading'>
    <searchFiled @search="getSearchData"/>
    <div style="font-size: 18px;font-weight: 600;margin-bottom: 16px">对话总数：{{ total }}次</div>
    <div style="background: var(--td-bg-color-container);height: calc(100% - 100px);padding: 16px;">
      <div style="margin-bottom: 12px">对话记录</div>
      <div v-for="(list,index) in ListData" :key="index">
          <qaCard style="margin-bottom: 16px;" :Q="list.question" :A="list.answer" />
      </div>
      <t-pagination
        :total="total"
        v-model="current" 
        v-model:page-size="pageSize"
        @page-size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
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
import { PaginationProps } from 'tdesign-vue-next';
import { ref } from 'vue';

const ListData=ref<QaHistoryItem[]>([])
const total=ref<number|null>(null)
const current = ref(1);
const pageSize = ref(10);
const Loading=ref(false);
const search=ref<any>(null)
const getSearchData = (searchObj:any) => {
  search.value={
    storeId:searchObj.shop,
    startDate:searchObj.timeRange[0],
    endDate:searchObj.timeRange[1]
  }
  getData()
};

const getData = () => {
  if(Loading.value)return;
  total.value=0;
  Loading.value=true;
  getStoreQaHistory({...search.value,pageSize:pageSize.value,pageNum:current.value}).then((res)=>{
    if(res.code===200&&res.rows) {
      ListData.value=res.rows
      total.value=res.total
    }
  }).finally(()=>{Loading.value=false;})
};

const onPageSizeChange: PaginationProps['onPageSizeChange'] = (size) => {
  current.value=1;
  getData()
};
const onCurrentChange: PaginationProps['onCurrentChange'] = (index, pageInfo) => {
  getData()
};

</script>

<style lang="less" scoped>
.data-qa-wrap{
  height: 100%;
}
</style>
