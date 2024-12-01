<template>
    <div class="gray-item" @click="getHandleAudio(handle.handleId)" style="flex: 1;display: flex;justify-content: space-between;color: var(--td-gray-color-7);cursor: pointer;">
        点击试听
        <t-icon name="play-circle-filled" size="18" style="color: var(--td-brand-color)"/>
        <audio ref="audioPlayer" controls style="display: none;"></audio>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getActionList,delActionData,getAudio} from '@/api/store'
import type { actionList,actionhandlItem } from '@/api/model/storeModel';
import { number } from 'echarts';

export default defineComponent({
  props: {
    handleId: {
      type: number,
      required: true
    },
  },
  setup(props) {
    const audioPlayer = ref<HTMLAudioElement | null>(null);
    const audioUrl = ref<string>(''); // 音频URL
 
    const getHandleAudio = (handleId:number) => {
      getAudio(handleId).then((res)=>{
        baseData.value.forEach((item)=>{
          if(item.handleId===handleId) item.speakAudio=convertBase64ToBlob(res.data.speakAudio)
          console.log(item.speakAudio)
          getFormateData(baseData.value)
        })
      }).finally(()=>{Loading.value=false})
    };
    const getAudioBase64 = async () => {
      const response = await getAudio(props.handleId);
      const arrayBuffer = await response.arrayBuffer();
      const base64 = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, ''));
      audioUrl.value = `data:audio/mpeg;base64,${base64}`;
    };
 
    const playAudio = () => {
      if (audioPlayer.value) {
        audioPlayer.value.src = audioUrl.value;
        audioPlayer.value.play();
      }
    };
 
    return {
      getAudioBase64,
      playAudio,
      audioPlayer,
    };
  },
});
</script>