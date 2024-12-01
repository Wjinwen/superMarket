<template>
  <div class="qa-setting-wrap" v-loading='Loading'>
    <div style="font-size: 18px;font-weight: 600;margin-bottom: 16px">话术</div>
    <div style="background: var(--td-bg-color-container);height: calc(100% - 36px);padding: 16px;">
      <t-button @click="()=>{modifyDiaRef.show()}" >新建话术</t-button>
      <template v-for="(qa,index) in tableData" :key="index">
        <div style="display: flex;align-items: center;margin: 16px 0;">
          <qaCard style="flex:1;" :Q="qa.question" :A="qa.answer"/>
          <div class="op-wrap">
            <div style="margin-right: 16px;cursor: pointer;" @click="()=>{opData=qa;modifyDiaRef.show(qa)}" >修改</div>
            <div style="color: var(--td-error-color);cursor: pointer;" @click="()=>{opData=qa;delVisible=true}">删除</div>
          </div>
        </div>
      </template>
      <t-pagination
        :total="total"
        v-model="current" 
        v-model:page-size="pageSize"
        @page-size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
    </div>
    <modifyDia ref="modifyDiaRef" @fresh='getData'/>
    <t-dialog
      header="删除" v-model:visible="delVisible" width="500px" :closeOnOverlayClick="false" @confirm="submitDel"
    >
      <div>确认删除话术【{{opData?.question}}】吗？</div>
    </t-dialog>
  </div>
 
</template>

<script lang="ts">
export default {
  name: 'QASetting',
};
</script>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import qaCard from '@/components/qaCard/index.vue';
import modifyDia from './modifyDia.vue';
import { getQaList,delQa} from '@/api/store'
import type { QaItem } from '@/api/model/storeModel';
import { MessagePlugin,PaginationProps } from 'tdesign-vue-next';

const modifyDiaRef=ref()
const delVisible=ref(false)
const submiting=ref(false)
const Loading=ref<Boolean>(false);
const tableData=ref<QaItem[]>([])
const opData=ref<QaItem|null>(null)

const total=ref<number|null>(null)
const current = ref(1);
const pageSize = ref(10);

const submitDel = () => {
  if(!opData||submiting.value) return;
  submiting.value=true;
  delQa(opData.value.qaId).then((res) => {
    if(res.code===200){
      MessagePlugin.success('删除成功');
      delVisible.value = false;
      getData()
    }else  MessagePlugin.error('删除失败')
  }).finally(()=>{
    submiting.value=false;
  })
};


const getData = () => {
  if(Loading.value)return;
  total.value=0;
  Loading.value=true;
  getQaList({pageSize:pageSize.value,pageNum:current.value}).then((res)=>{
    if(res.code===200&&res.rows) {
      tableData.value=res.rows
      total.value=res.total
    }
  }).finally(()=>{Loading.value=false})
};

onMounted(() => {
  getData()
});

const onPageSizeChange: PaginationProps['onPageSizeChange'] = (size) => {
  current.value=1;
  getData()
};
const onCurrentChange: PaginationProps['onCurrentChange'] = (index, pageInfo) => {
  getData()
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
