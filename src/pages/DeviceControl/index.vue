<template>
  <div class="device-control-wrap">
    <div class="device-control"> 
      <div class="device-control-title">选择门店</div>
      <div class="device-control-">
        <searchFiled @search="getSearchData" :showDateRange='false' :showBtn="false" style="margin:0;"/>
      </div>
    </div>
    
    <div class="device-control"> 
      <div class="device-control-title">启动/关闭总系统</div>
      <div class="device-control-">
        <t-switch v-model="data.sysChecked" size="large">
          <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
        </t-switch>
      </div>
    </div>
    <div class="device-control"> 
      <div class="device-control-title">门锁</div>
      <div class="device-control-">
        <t-switch v-model="data.locker" size="large">
          <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
        </t-switch>
      </div>
    </div>
    <div class="device-control"> 
      <div class="device-control-title">门锁（长期设置）</div>
      <div class="device-control-">
        <t-switch v-model="data.lockerSetting" size="large">
          <template #label="slotProps">{{ slotProps.value ? '常开' : '常关' }}</template>
        </t-switch>
      </div>
    </div>
    <div class="device-control"> 
      <div class="device-control-title">音响开关</div>
      <div>
        <t-switch v-model="data.soundChecked" size="large" @change="changeSound">
          <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
        </t-switch>
      </div>
    </div>
    <div class="device-control"> 
      <div class="device-control-title">音响音量调节</div>
      <div style="width: 600px;">
        <t-slider inputNumberProps v-model="data.sound" @change-end="onChangeSoundEnd"/>
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
  sysChecked:true,
  locker:true,
  lockerSetting:true,
  soundChecked:true,
  sound:30
})

const getSearchData = (searchObj:any) => {
  storeId.value=searchObj.shop
  // getData()
};

const onChangeSoundEnd: SliderProps['onChangeEnd'] = (value) => {
  data.value.soundChecked=!!value
};

const changeSound: SwitchProps['onChange'] = (val) => {
  if(!val)  data.value.sound=0
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
