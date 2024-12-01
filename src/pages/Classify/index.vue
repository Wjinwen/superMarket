<template>
  <div class="home-panel-detail" v-loading='Loading'>
    <div style="display: flex;align-items: center;margin-bottom: 12px;justify-content: space-between;">
      <searchFiled @search="getSearchData" :showDateRange='false' :showBtn="false" style="margin:0;"/>
      <t-button @click="()=>{modifyDiaRef.show('',storeId)}" >新增</t-button>
    </div>
    <t-table
      row-key="index"
      :data="ListData"
      :columns="columns"
      stripe  
      cell-empty-content="-"
      lazy-load
    >
    <template #op="{ row }">
      <div style="display: flex;">
        <div style="margin-right: 16px;cursor: pointer;" @click="()=>{modifyDiaRef.show(row)}" >修改</div>
        <div style="color: var(--td-error-color);cursor: pointer;" @click="()=>{opData=row;delVisible=true}" >删除</div>
      </div>
      </template>
    </t-table>
    <modifyDia ref="modifyDiaRef"  @fresh='getData'/>
    <t-dialog header="删除" v-model:visible="delVisible" :closeOnOverlayClick="false" @confirm="submitDel">
      <div>确认删除货架【{{opData?.shelfName}}】吗？</div>
    </t-dialog>
  </div>
</template>

<script lang="tsx">
export default {
  name: 'Classify',
};
</script>

<script setup lang="tsx">
import searchFiled from '@/components/searchFiled/index.vue';
import { ref } from 'vue';
import { TableProps,MessagePlugin} from 'tdesign-vue-next';
import { getShelfData,delShelfData} from '@/api/store'
import type { shelfDataItem } from '@/api/model/storeModel';
import dayjs from 'dayjs';
import modifyDia from './modifyDia.vue';

const modifyDiaRef=ref()
const delVisible=ref(false)
const opData=ref<shelfDataItem|null>(null)
const defaulTime = dayjs().toDate();
const columns = ref<TableProps['columns']>([
  {
    colKey: 'shelfName',
    title: '货架',
    width: '150',
  },
  {
    colKey: 'productList',
    title: '存放物品',
  },
  {
    colKey: 'op',
    title: '操作',
    width: '200',
  }
]);

const ListData=ref<shelfDataItem[]>([])
const storeId=ref<number|null>(null)
const submiting=ref(false)
const Loading=ref<Boolean>(false);

const getSearchData = (searchObj:any) => {
  storeId.value=searchObj.shop
  getData()
};

const getData = () => {
  if(!storeId.value) return;
  Loading.value=true;
  getShelfData({storeId:storeId.value}).then((res)=>{
    if(res.code===200&&res.rows) {
      ListData.value=res.rows
    }
  }).finally(()=>{ Loading.value=false;})
};
const submitDel = () => {
  if(!opData||submiting.value) return;
  submiting.value=true;
  delShelfData(opData.value.dataId).then((res) => {
    if(res.code===200){
      MessagePlugin.success('删除成功');
      delVisible.value = false;
      getData()
    }else  MessagePlugin.error('删除失败')
  }).finally(()=>{
    submiting.value=false;
  })
};
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
</style>
