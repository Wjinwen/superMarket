<template>
  <div class="search-filed">
   <div style="width: 150px;margin-right: 32px">
    <t-select
      v-model="searchFiled.shop"
      :options="shopOptions"
      placeholder="请选择店铺"
      clearable
    ></t-select>
   </div>
   <div class="search-timerange">
    <t-date-range-picker v-if="showDateRange" v-model="searchFiled.timeRange" :presets="timePresets" />
  </div>
  </div>
</template>
 
<script lang="ts">
export default {
  name: 'searchFiled',
};
</script>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { SelectProps,DateRangePickerProps } from 'tdesign-vue-next';
import dayjs from 'dayjs';

const emit = defineEmits(['search']);
const props = defineProps({
  value: {
    type: String,
  },
  showDateRange:{type:Boolean,default:true}
});

const searchFiled= ref({
  timeRange :[],
  shop:''
})

watch(() => searchFiled, (val) => {
  console.log('searchFiled 变了=== emit',searchFiled)
  emit('search',val);
}, { deep:true });

const timePresets = ref<DateRangePickerProps['presets']>({
  最近14天: [dayjs().subtract(13, 'day').toDate(), dayjs().toDate()],
  最近7天: [dayjs().subtract(6, 'day').toDate(), dayjs().toDate()],
  最近3天: [dayjs().subtract(2, 'day').toDate(), dayjs().toDate()],
});

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
  if(props.showDateRange) searchFiled.value.timeRange=[dayjs().subtract(6, 'day').toDate(), dayjs().toDate()]
});


</script>

<style lang="less" scoped>
.search-filed{
  display: flex;
  margin-bottom: 32px;
.search-timerange{
  :deep(.t-range-input__inner){
    width: 250px;
  }
}
}
</style>
