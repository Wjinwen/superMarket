<template>
  <div class="data-qa-wrap">
    <searchFiled />
    <div style="font-size: 18px;font-weight: 600;margin-bottom: 16px">人流总量 {{ '2400' }}</div>
    <div style="background: var(--td-bg-color-container);height: calc(100% - 100px);padding: 16px;">
      <div style="margin-bottom: 12px">对话记录</div>
      <div v-for="i in 5" :key="i">
          <qaCard style="margin-bottom: 16px;"/>
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
import { ref } from 'vue';

</script>

<style lang="less" scoped>
.data-qa-wrap{
  height: 100%;
}
</style>
