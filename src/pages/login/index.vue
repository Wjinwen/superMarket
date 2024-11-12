<template>
  <div class="login-wrapper">
    <div class="login-container">
      <img src="@/assets/img/logo_colorful.png" alt="" class="login-titleimg" />
      <login />
      <tdesign-setting />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LoginIndex',
};
</script>
<script setup lang="ts">
import { ref } from 'vue';

import TdesignSetting from '@/layouts/setting.vue';
import Login from './components/Login.vue';

</script>

<style lang="less" scoped>
@import './index.less';
</style>
