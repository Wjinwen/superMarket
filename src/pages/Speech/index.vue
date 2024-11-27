<template>
  <div class="qa-setting-wrap">
    <div style="font-size: 18px;font-weight: 600;margin-bottom: 16px">话术</div>
    <div style="background: var(--td-bg-color-container);height: calc(100% - 36px);padding: 16px;">
      <t-button @click="()=>{modifyDiaRef.show()}" >新建话术</t-button>
      <template v-for="i in 5" :key="i">
        <div style="display: flex;align-items: center;margin: 16px 0;">
          <qaCard style="flex:1;"/>
          <div class="op-wrap">
            <div style="margin-right: 16px;" @click="()=>{modifyDiaRef.show()}" >修改</div>
            <div style="color: var(--td-error-color);" @click="delVisible=true" >删除</div>
          </div>
        </div>
      </template>
    </div>
    <t-dialog
      header="删除" v-model:visible="delVisible" width="500px" theme="danger" :closeOnOverlayClick="false" @confirm="submitDel"
    >
      <div>确认删除话术【】吗？</div>
    </t-dialog>
  </div>
 
</template>

<script lang="ts">
export default {
  name: 'Speech',
};
</script>

<script setup lang="ts">
import qaCard from '@/components/qaCard/index.vue';
import { ref } from 'vue';

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
.qa-setting-wrap{
  height: 100%;
}
.op-wrap{
  display: flex;
  margin:0 16px;
  >div{
    cursor: pointer;
  }
}
</style>
