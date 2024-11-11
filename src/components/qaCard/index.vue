<template>
  <div style="background-color: var(--td-bg-color-container-hover);padding: 8px;">
    <div>Q:{{ '111111' }}</div>
    <div>A:{{ 'answer0111answer011111answer011111answer01111111' }}</div>
  </div>
</template>
 
<script setup>
import { ref } from 'vue';
 
const emit = defineEmits(['audioLoaded']);
const props = defineProps({
  audioSrc: {
    type: String,
    default: '/src/assets/audio.mp3',
  },
  iconColor:{
    type: String,
    default: 'var(--td-brand-color)',
  }
});
const duration = ref(0);
const audioPlayer = ref(null);
const isPlaying = ref(false);

const loaded = () => {
  if (audioPlayer.value) {
    console.log('===audioPlayer.value',audioPlayer.value )
    duration.value = Math.floor(audioPlayer.value.duration);
    emit('audioLoaded',audioPlayer.value)
  }
};

const playHandler = () => {
  isPlaying.value=!isPlaying.value;
  if(isPlaying.value) playAudio();
  else pauseAudio();
};
const playAudio = () => {
  audioPlayer.value.play();
};
 
const pauseAudio = () => {
  audioPlayer.value.pause();
};

</script>