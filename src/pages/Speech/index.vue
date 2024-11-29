<template>
  <div class="speech-wrap">
    <div style="font-size: 18px;font-weight: 600;padding:0 8px; margin-bottom: 16px;display: flex;justify-content: space-between;">
      <div style="width: 30%;">场景描述</div>
      <div style="flex: 1;margin: 0 16px;">反应语言</div>
      <div style="width: 25%;">动作效果</div>
    </div>
    <div style="background: var(--td-bg-color-container);display: flex;margin-bottom: 16px;padding: 12px 8px 6px;justify-content: space-between;" v-for="i in 5" :key="i">
      <div style="width: 30%;">
        <div class="gray-item" style="flex: 1;">
            {{ i }}场景
          </div>
      </div>
      <div style="flex: 1;margin: 0 16px;">
        <div v-for="i in 3" :key="i" style="margin-bottom: 6px;display: flex;align-items: center">
          <div class="gray-item" style="flex: 1;">
            {{ i }}条动作提示
          </div>
          <div class="op-wrap">
            <div style="margin-right: 16px;cursor: pointer;" @click="()=>{modifyDiaRef.show()}" >修改</div>
            <div style="color: var(--td-error-color);cursor: pointer;" @click="delVisible=true" >删除</div>
          </div>
        </div>
        <div style="width:calc(100% - 72px);display: flex;justify-content: center;">
          <t-button @click="()=>{modifyDiaRef.show()}">新增</t-button>
        </div>
      </div>
      <div style="width: 25%;">
        <div class="gray-item" style="flex: 1;display: flex;justify-content: space-between;">
            {{ i }}audio name
            <playAudio />
          </div>
        </div>
    </div>
    <modifyDia ref="modifyDiaRef"/>
    <t-dialog header="删除" v-model:visible="delVisible" theme="danger" :closeOnOverlayClick="false" @confirm="submitDel">
      <div>确认删除反应语言【】吗？</div>
    </t-dialog>
  </div>
 
</template>

<script lang="ts">
export default {
  name: 'Speech',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import playAudio from '@/components/playAudio/index.vue';
import modifyDia from './modifyDia.vue';

const modifyDiaRef=ref()
const delVisible=ref(false)


const submitDel = () => {
  // request({
  //   url: api.DeleteStaffInfo,
  //   method: 'post',
  //   params: {
  //     staff_guid: data.value[0].staff_guid
  //   }
  // }).then(() => {
  //   if(userRole.isSystemAdmin) {
  //     MessagePlugin.success('删除成功');
  //     setUserName();
  //     visible.value = false;
  //     emits('fresh');
  //   } else {
  //     location.reload();
  //   }
  // }).finally(() => {loading.value = false;});
};
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
