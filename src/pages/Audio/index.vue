<template>
  <div class="audio-wrap">
    <div style="font-size: 18px;margin-bottom: 16px;">小佳声音</div>
    <play-audio ref="audioEle" @audioLoaded="audioLoaded">
      <template #btn>
        <div style="background-color: var(--td-brand-color);width: 150px;padding: 6px 12px;display: flex;
        align-items: center;justify-content: space-between;border-radius: 5px;color: var(--td-text-color-anti)">
          <span v-if="audioPlayer">{{ Math.floor(audioPlayer.duration) }}s</span>
          <t-icon name="play-circle-filled" size="18"/>
        </div>
      </template>
    </play-audio>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Audio',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import playAudio from '@/components/playAudio/index.vue';

const audioPlayer = ref(null);
const audioEle=ref(null);
const data = ref({
  sysChecked:true,
  soundChecked:true,
  sound:30
})

const audioLoaded = (val:any) => {
  audioPlayer.value=val
};

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
