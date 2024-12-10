<template>
  <div class="device-control-wrap" v-loading="Loading">
    <div style="display: flex;margin-bottom: 32px;"> 
      <div>
          <div class="device-control-title">选择门店</div>
          <div class="device-control-info">
            <searchFiled @search="getSearchData" :showDateRange='false' :showBtn="false" style="margin:0;"/>
          </div>
      </div>
      <div v-if="storeId">
        <div class="device-control-title" >门店门锁</div>
          <div class="device-control-info">
            <t-button variant="outline" theme="default" @click="handleDoor('close')">关</t-button>
            <t-button theme="primary" @click="handleDoor('open')">开</t-button>
          </div>
      </div>
    </div>
    <template v-if="storeId&&data">
      <div class="device-control"> 
        <div class="device-control-title">启动/关闭总系统</div>
        <div class="device-control-info">
          <t-switch v-model="data.sysOn" size="large">
            <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
          </t-switch>
        </div>
      </div>
      <div class="device-control"> 
        <div class="device-control-title">门锁（长期设置）</div>
        <div class="device-control-info">
          <t-switch v-model="data.doorLockHold" size="large">
            <template #label="slotProps">{{ slotProps.value ? '常开' : '关' }}</template>
          </t-switch>
        </div>
      </div>
      <div class="device-control"> 
        <div class="device-control-title">音响开关</div>
        <div>
          <!-- @change="changeSound" -->
          <t-switch v-model="data.soundOn" size="large" >
            <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
          </t-switch>
        </div>
      </div>
      <div class="device-control"> 
        <div class="device-control-title">音响音量调节</div>
        <div style="width: 600px;">
          <!-- @change-end="onChangeSoundEnd" -->
          <t-slider inputNumberProps v-model="data.soundVolume" />
        </div>
      </div>
      <div > 
        <t-button size="large" @click="submitConfig" :disabled="submiting">保存</t-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DeviceControl',
};
</script>

<script setup lang="ts">
import searchFiled from '@/components/searchFiled/index.vue';
import { onMounted, ref, watch } from 'vue';
import { SliderProps ,SwitchProps,MessagePlugin } from 'tdesign-vue-next';
import { updateDoorStatus,getStoreConfig,updateStoreConfig} from '@/api/store'
import type { config } from '@/api/model/storeModel';

const Loading = ref(false);
const submiting = ref(false);
const storeId=ref<number|null>(null)
const data = ref<config|null>(null)

const handleDoor = (cmd:string) => {
  updateDoorStatus({shopId:storeId.value,cmd}).then((res)=>{
    if(res.code===200){
      if(cmd==='open') MessagePlugin.success('门锁已打开')
      else MessagePlugin.warning('门锁已关闭')
    }
  })
};

const getSearchData = (searchObj:any) => {
  storeId.value=searchObj.shop
  getData()
};

const getData = () => {
  if(!storeId.value||Loading.value) return;
  Loading.value=true;
  getStoreConfig(storeId.value).then((res)=>{
    if(res.code===200){
      data.value={...res.data}
      data.value.sysOn=!!res.data.sysOn
      data.value.doorLockHold=!!res.data.doorLockHold
      data.value.soundOn=!!res.data.soundOn
    }
  }).finally(()=>{
    Loading.value=false
  })
};

const submitConfig = () => {
  submiting.value=true;
  const parmas={...data.value}
  parmas.sysOn= +parmas.sysOn
  parmas.doorLockHold=+parmas.doorLockHold
  parmas.soundOn=+parmas.soundOn
  updateStoreConfig(parmas).then((res)=>{
    if(res.code===200){
      MessagePlugin.success('配置保存成功')
    }
  }).finally(()=>{
    submiting.value=false
  })
};


const onChangeSoundEnd: SliderProps['onChangeEnd'] = (value) => {
  data.value.soundOn=!!value
};

const changeSound: SwitchProps['onChange'] = (val) => {
  if(!val)  data.value.soundVolume=0
};

</script>

<style lang="less" scoped>
.device-control-wrap{
  height: 100%;
}
.device-control{
margin-bottom: 32px;
  &-title{
    margin-bottom: 12px;
    font-size: 16px;
  }
  :deep(.t-slider){
    height: 32px;
    .t-slider__rail,.t-slider__track {
      height: 24px;
      border-radius: 3px;
    }
    .t-slider__button{
      height: 24px;
      width: 16px;
      border-radius: 3px;
    }
  }
  :deep(.t-switch){
    height: 28px;
    width: 80px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    .t-switch__handle{
      top: 4px!important;
      height: 20px;
      width:34px;
      border-radius: 3px;
      &::before{
        border-radius: 3px;
      }
    }
  }
}
</style>
