<template>
  <div class="search-filed">
   <div style="width: 150px;margin-right: 32px">
    <t-select
      v-model="searchFiled.shop"
      :options="shopOptions"
      placeholder="请选择店铺"
      :keys="{ label: 'storeName', value: 'storeId' }"
    ></t-select>
   </div>
   <div class="search-timerange">
      <t-date-range-picker v-if="showDateRange" v-model="searchFiled.timeRange" clearable :presets="timePresets" />
    </div>
    <div style='margin-left:32px;' v-if='showBtn'>
      <t-button @click='subEmit'>查询</t-button>
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
import { getStoreList} from '@/api/store'
import type { StoreItem } from '@/api/model/storeModel';

const emit = defineEmits(['search']);
const props = defineProps({
  value: {
    type: String,
  },
  showDateRange:{type:Boolean,default:true},
  showBtn:{type:Boolean,default:true}
});

const searchFiled= ref({
  timeRange :[],
  shop:null
})

watch(() => searchFiled, (val) => {
  if (props.showBtn) return;
  emit('search',val);
}, { deep:true });

const subEmit=() => {
  emit('search',searchFiled.value);
};

const timePresets = ref<DateRangePickerProps['presets']>({
  最近14天: [dayjs().subtract(13, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
  最近7天: [dayjs().subtract(6, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
  最近3天: [dayjs().subtract(2, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
});

const shopOptions=ref<StoreItem[]>([])
onMounted(() => {
  getStoreList().then((res)=>{
    if(res.code===200&&res.rows) {
      shopOptions.value=res.rows
      searchFiled.value.shop=res.rows[0].storeId
    }
  }).finally(()=>{
    subEmit()
  })
  if(props.showDateRange) searchFiled.value.timeRange=[dayjs().subtract(6, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]
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
