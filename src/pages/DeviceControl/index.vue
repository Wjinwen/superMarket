<template>
  <div class="device-control-wrap">
    <div class="device-control"> 
      <div class="device-control-title">选择门店</div>
      <div class="device-control-info">
        <searchFiled @search="getSearchData" :showDateRange='false' :showBtn="false" style="margin:0;"/>
      </div>
    </div>
    
    <div class="device-control"> 
      <div class="device-control-title">启动/关闭总系统</div>
      <div class="device-control-">
        <t-switch v-model="data.sysOn" size="large">
          <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
        </t-switch>
      </div>
    </div>
    <div class="device-control"> 
      <div class="device-control-title">门锁</div>
      <div class="device-control-info">
        <t-button variant="outline" theme="default">关</t-button>
        <t-button theme="primary">开</t-button>
      </div>
    </div>
    <div class="device-control"> 
      <div class="device-control-title">门锁（长期设置）</div>
      <div class="device-control-info">
        <t-switch v-model="data.doorLockHold" size="large">
          <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
        </t-switch>
      </div>
    </div>
    <div class="device-control"> 
      <div class="device-control-title">音响开关</div>
      <div>
        <t-switch v-model="data.soundOn" size="large" @change="changeSound">
          <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
        </t-switch>
      </div>
    </div>
    <div class="device-control"> 
      <div class="device-control-title">音响音量调节</div>
      <div style="width: 600px;">
        <t-slider inputNumberProps v-model="data.soundVolume" @change-end="onChangeSoundEnd"/>
      </div>
    </div>
    <div > 
      <t-button>保存</t-button>
    </div>
   
  </div>
</template>

<script lang="ts">
export default {
  name: 'DeviceControl',
};
</script>

<script setup lang="ts">
import searchFiled from '@/components/searchFiled/index.vue';
import { computed, nextTick, onDeactivated, onMounted, ref, watch } from 'vue';
import { SliderProps ,SwitchProps } from 'tdesign-vue-next';
import { useSettingStore } from '@/store';
import { LAST_7_DAYS } from '@/utils/date';



const store = useSettingStore();
const storeId=ref<number|null>(null)
const data = ref({
  sysOn:true,
  doorLock:true,
  doorLockHold:true,
  soundOn:true,
  soundVolume:30
})

const getSearchData = (searchObj:any) => {
  storeId.value=searchObj.shop
  // getData()
};

const onChangeSoundEnd: SliderProps['onChangeEnd'] = (value) => {
  data.value.soundOn=!!value
};

const changeSound: SwitchProps['onChange'] = (val) => {
  if(!val)  data.value.soundVolume=0
};

</script>

<style lang="less" scoped>
.device-control{
margin-bottom: 32px;
  &-title{
    margin-bottom: 12px;
    font-size: 16px;
  }
}
</style>
