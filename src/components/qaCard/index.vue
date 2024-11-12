<template>
  <div style="background-color: var(--td-bg-color-container-hover);padding: 8px;">
    <div style="word-break: break-all;">Q:{{ '111111' }}</div>
    <div style="word-break: break-all;">A:{{ 'answer0111answer011111answeanswer0111answer011111answer011111answer01111111answer0111answer011111answer011111answer01111111answer0111answer011111answer011111answer01111111r011111answer01111111' }}</div>
  </div>
</template>
 
<script setup>
import { ref } from 'vue';
 
const props = defineProps({
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
