<template>
  <div class="speech-wrap" v-loading="Loading">
    <div style="font-size: 18px;font-weight: 600;padding:0 8px; margin-bottom: 16px;display: flex;justify-content: space-between;">
      <div style="width: 25%;">场景描述</div>
      <div style="flex: 1;margin: 0 16px;">反应语言</div>
      <div style="width: 120px;">动作效果</div>
    </div>
    <div style="background: var(--td-bg-color-container);display: flex;margin-bottom: 16px;padding: 12px 8px 6px;justify-content: space-between;" 
    v-for="(action,index) in tableData" :key="index">
      <div style="width: 25%;margin-right: 16px;">
        <div class="gray-item" style="flex: 1;">
            {{ action.actionName }}
          </div>
      </div>
      <div style="flex: 1;">
        <div v-for="(handle,handleindex) in action.list" :key="handleindex" style="margin-bottom: 6px;display: flex;align-items: center">
          <div class="gray-item" style="flex: 1;">
            {{ handle.speakWord }}
          </div>
          <div class="op-wrap" style="margin-right: 24px;">
            <div style="margin-right: 16px;cursor: pointer;" @click="()=>{modifyDiaRef.show(handle,'update')}" >修改</div>
            <div style="color: var(--td-error-color);cursor: pointer;" @click="()=>{opData=handle;delVisible=true}" >删除</div>
          </div>
          <div style="width: 120px;">
            <div class="gray-item" @click="getHandleAudio(handle.handleId)" style="flex: 1;display: flex;justify-content: space-between;color: var(--td-gray-color-7);cursor: pointer;">
               点击试听
               <playAudio :audioSrc="handle.speakAudio" ref="playAudioRef" autoplay/>
            </div>
          </div>
        </div>
        <div style="width:calc(100% - 200px);display: flex;justify-content: center;">
          <t-button @click="()=>{modifyDiaRef.show(action,'add')}">新增</t-button>
        </div>
      </div>
    </div>
    <modifyDia ref="modifyDiaRef" @fresh='getData'/>
    <t-dialog header="删除" v-model:visible="delVisible" :closeOnOverlayClick="false" @confirm="submitDel">
      <div>确认删除反应语言【{{opData?.speakWord}}】吗？</div>
    </t-dialog>
  </div>
 
</template>

<script lang="ts">
export default {
  name: 'Speech',
};
</script>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import playAudio from '@/components/playAudio/index.vue';
import modifyDia from './modifyDia.vue';
import { useSettingStore } from '@/store';
import { getActionList,delActionData,getAudio} from '@/api/store'
import type { actionList,actionhandlItem } from '@/api/model/storeModel';
import { MessagePlugin } from 'tdesign-vue-next';

const modifyDiaRef=ref()
const delVisible=ref(false);
const submiting=ref(false)
const Loading=ref<Boolean>(false);
const tableData=ref<actionList[]>([]);
const baseData=ref([]);
const playAudioRef=ref(null)
const initactionData=() => ([{actionId: 1,actionName: "进门",list:[]},{actionId: 2,actionName: "出门",list:[]},{actionId: 3,actionName: "付款中",list:[]}]);
const opData=ref<actionhandlItem|null>(null)
const submitDel = () => {
  if(!opData||submiting.value) return;
  submiting.value=true;
  delActionData(opData.value.handleId).then((res) => {
    if(res.code===200){
      MessagePlugin.success('删除成功');
      delVisible.value = false;
      getData()
    }else  MessagePlugin.error('删除失败')
  }).finally(()=>{
    submiting.value=false;
  })
};
const getFormateData = (arr:actionhandlItem[]) => {
  tableData.value=initactionData()
  arr.forEach((item)=>{
    if(item.actionId===1){
      tableData.value[0].list.push(item)
    }else if(item.actionId===2){
      tableData.value[1].list.push(item)
    }else{
      tableData.value[2].list.push(item)
    }
  })
};

const getData = () => {
  Loading.value=true;
  getActionList().then((res)=>{
    if(res.code===200&&res.rows) {
      baseData.value=res.rows
      getFormateData(res.rows)
    }
  }).finally(()=>{Loading.value=false})
};

const getHandleAudio = async (handleId:number) => {
  if(!baseData.value.find((item)=>{return item.handleId===handleId}).speakAudio){
    const res=await getAudio(handleId)
    baseData.value.forEach((item)=>{
      if(item.handleId===handleId) {
        item.speakAudio='data:audio/mp3;base64,'+res.data.speakAudio
        getFormateData(baseData.value)
        return
      }
    })
  }
};
onMounted(() => {
  getData()
});

</script>

<style lang="less" scoped>
.speech-wrap{
  height: 100%;
}
.gray-item{
  padding: 3px 6px;
  width: 100%;
  background-color: var(--td-gray-color-1);
}
.op-wrap{
  display: flex;
  margin:0 16px;
  >div{
    cursor: pointer;
  }
}
</style>
