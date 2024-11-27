<template>
  <div class="home-panel-detail">
    <div style="display: flex;align-items: center;margin-bottom: 12px;">
      <div style="width: 300px;"><t-select
      v-model="shop"
      :options="shopOptions"
      placeholder="请选择店铺"
      clearable
    ></t-select></div>
    
    </div>
    <t-table
      row-key="index"
      :data="TABLE_LIST"
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
  name: 'Classify',
};
</script>

<script setup lang="tsx">
import { computed, nextTick, onDeactivated, onMounted, watch,ref } from 'vue';
import { TableProps,SelectProps} from 'tdesign-vue-next';
import dayjs from 'dayjs';
import { useSettingStore } from '@/store';
import { PANE_LIST_DATA ,TABLE_LIST} from './constants';

const defaulTime = dayjs().toDate();
const shop= ref('')
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
    colKey: 'count',
    title: '人流量',
    width: '200',
    align:'center'
  }
]);


const shopOptions: SelectProps['options'] = [
  {
    label: '架构云',
    value: '1',
    title: '架构云选项',
  },
  {
    label: '大数据',
    value: '2',
    title: '',
  },
  {
    label: '区块链',
    value: '3',
  }];

onMounted(() => {
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
</style>
