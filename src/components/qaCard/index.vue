<template>
  <div style="background-color: var(--td-bg-color-container-hover);padding: 8px;">
    <div style="word-break: break-all;">Q:{{ Q }}</div>
    <div style="word-break: break-all;">A:{{ A }}</div>
  </div>
</template>
 
<script setup lang="tsx">
import { ref } from 'vue';
 
const props = defineProps({
  Q: {
    type: String,
  },
  A:{
    type: String,
  },
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
