<template>
  <div class="qa-setting-wrap">
    <div style="font-size: 18px;font-weight: 600;margin-bottom: 16px">话术</div>
    <div style="background: var(--td-bg-color-container);height: calc(100% - 36px);padding: 16px;">
      <t-button >新建话术</t-button>
      <div v-for="i in 5" :key="i">
          <div style="display: flex;align-items: center;margin: 16px 0;">
            <qaCard />
            <div class="op-wrap">
              <t-button theme="default" variant="text">修改</t-button>
              <t-button theme="danger" variant="text">删除</t-button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'QASetting',
};
</script>

<script setup lang="ts">
import searchFiled from '@/components/searchFiled/index.vue';
import qaCard from '@/components/qaCard/index.vue';
import { ref } from 'vue';

</script>

<style lang="less" scoped>
.qa-setting-wrap{
  height: 100%;
}
</style>
