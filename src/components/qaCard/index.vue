<template>
  <div style="background-color: var(--td-bg-color-container-hover);padding: 8px;position: relative;">
    <div style="word-break: break-all;max-width: calc(100% - 140px);">Q:{{ qaitem?.question }}</div>
    <div style="word-break: break-all;">A:{{ qaitem?.answer }}</div>
    <div v-if="showTime&&qaitem.createTime" style="position: absolute;right: 10px;top:3px;color: rgba(0, 0, 0, 0.3);">{{ qaitem?.createTime }}</div>
  </div>
</template>
 
<script setup lang="tsx">
import { time } from 'echarts';
import { ref } from 'vue';
import type { QaItem } from '@/api/model/storeModel';
import type { PropType } from 'vue';

const props = defineProps({
  qaitem: {
    type: Object as PropType<QaItem>,
  },
  showTime:{
    type:Boolean,default:false
  }
});
</script>

<style lang="less" scoped>
.qa-setting-wrap{
  height: 100%;
}
.op-wrap{
  display: flex;
  margin:0 16px;
  >div{
    cursor: pointer;
  }
}
</style>
