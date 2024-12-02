<template>
  <div class="home-panel-detail" v-loading='Loading'>
    <div style="display: flex;align-items: center;margin-bottom: 12px;">
      <span style="margin-right: 32px;">全国店铺</span>
      <t-date-picker v-model="defaulTime" clearable :disableDate="{after: dayjs().format()}" :format="'YYYY-MM-DD'" @change="getData"/>
    </div>
    <t-row :gutter="[16, 16]">
      <t-col v-for="(item, index) in PANE_LIST_DATA" :key="index" :xs="6" :xl="4" :xxl="2">
        <t-card class="home-card" :bordered="false" :style="`border-bottom: 3px solid ${item.color};`">
          <div class="home-card__img">
            <img style="width: 45px;height: 45px;" src="@/assets/icon_all.png" v-if="item.code==='customerCount'"/>
            <img style="width: 45px;height: 45px;" src="@/assets/icon_service.png" v-if="item.code==='manualServiceCount'"/>
            <img style="width: 45px;height: 45px;" src="@/assets/icon_robot.png" v-if="item.code==='aiChatCount'"/>
            <img style="width: 45px;height: 45px;" src="@/assets/icon_child.png" v-if="item.code==='childrenCount'"/>
            <img style="width: 45px;height: 45px;" src="@/assets/icon_teenager.png" v-if="item.code==='teenagerCount'"/>
            <img style="width: 45px;height: 45px;" src="@/assets/icon_younger.png" v-if="item.code==='youngCount'"/>
            <img style="width: 45px;height: 45px;" src="@/assets/icon_mild.png" v-if="item.code==='middleAgeCount'"/>
            <img style="width: 45px;height: 45px;" src="@/assets/icon_older.png" v-if="item.code==='oldCount'"/>
          </div>
          <div class="home-card__info">
            <span class="home-card__info__number">{{ (vistorList&&vistorList[item.code])||'-' }}</span>
            <div class="home-card__info__title">{{ item.title }}</div>
          </div>
        </t-card>
      </t-col>
    </t-row>
    <div style="margin: 32px 0 16px;font-weight: 600;font-size: var(--td-size-6);">店铺流量TOP 10</div>
    <t-table
      row-key="index"
      :data="tableData"
      :columns="columns"
      stripe  
      cell-empty-content="-"
      lazy-load
    >
    </t-table>
  </div>
</template>

<script lang="tsx">
export default {
  name: 'Home',
};
</script>

<script setup lang="tsx">
import { computed, nextTick, onDeactivated, onMounted, watch,ref } from 'vue';
import { TableProps,DateValue} from 'tdesign-vue-next';
import dayjs from 'dayjs';
import { useSettingStore } from '@/store';
import { getStoreTop10,getAllStoreVistor} from '@/api/store'
import type { StoreVist } from '@/api/model/storeModel';
import { constant } from 'lodash';
import { PANE_LIST_DATA } from './constants';


const defaulTime = ref<string>(dayjs().format('YYYY-MM-DD'));
const Loading=ref<Boolean>(false);
const tableData=ref<StoreVist[]>([]);
const vistorList=ref<any>(null);
const columns = ref<TableProps['columns']>([
  {
    colKey: 'serial-number',
    title: '排序',
    width: '100',
    align:'center'
  },
  {
    colKey: 'storeName',
    title: '店铺名称',
  },
  {
    colKey: 'customerCount',
    title: '人流量',
    width: '200',
    align:'center'
  }
]);
// function handleChange(value: DateValue,) {
//   vistorList.value=null;
//   getData()
// }

const getData = () => {
  Loading.value=true;
  Promise.all([getStoreTop10({queryDate:defaulTime.value}), getAllStoreVistor({queryDate:defaulTime.value})]).then(axiosResponses => {
    tableData.value = axiosResponses[0].rows||[];
    vistorList.value = axiosResponses[1].data||null;
  }).finally(() => {
    Loading.value=false
  });
 
};

onMounted(() => {
  getData()
});


</script>

<style lang="less" scoped>
.home-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  :deep(.t-card__body) {
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-l);
    display: flex;
  }
  &:hover{
    box-shadow:var(--td-shadow-2);
  }
  &__img{
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__info {
    color: var(--td-text-color-primary);
    display: flex;
    flex-direction: column;
    width: 150px;
    align-items: center;
    &__number{
      font-weight: 600;
      margin-bottom: 6px;
      font-size: var(--td-size-7);
    }
  }
}
.home-panel-detail{
  :deep(.t-table--striped:not(.t-table--header-fixed) > .t-table__content > table > tbody > tr:nth-of-type(odd):not(.t-table__expanded-row)) {
    background: #f2f3ff;
  }
  :deep(.t-table__header){
    tr{background: var(--td-brand-color);}
    th{font-weight: 600;color: var(--td-gray-color-14);}
    
  }
}
.home-card__info{flex: 1;}
</style>
