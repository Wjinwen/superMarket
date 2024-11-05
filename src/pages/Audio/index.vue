<template>
  <div class="audio-wrap">
    <div style="font-size: 16px;">小佳声音</div>
    <div class="audio" v-if="audioSrc">
      <audio ref="audioPlayer" :src="audioSrc" @ended="onEnded"></audio>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Audio',
};
</script>

<script setup lang="ts">
import { computed, nextTick, onDeactivated, onMounted, ref, watch } from 'vue';
import { useSettingStore } from '@/store';
import { LAST_7_DAYS } from '@/utils/date';


const audioPlayer=ref();
const audioSrc=ref('');
const data = ref({
  sysChecked:true,
  soundChecked:true,
  sound:30
})

</script>

<style lang="less" scoped>
.audio-wrap{
  width: 100%;
  height: 100%;
  background: var(--td-font-white-1);
  border-radius: 5px;
  padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-l);
}

</style>
