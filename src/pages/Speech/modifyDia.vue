<template>
  <t-dialog
    :destroyOnClose="true" :header="`${opType === 'update' ? '编辑' : '新增'}反应语言`" v-model:visible="visible" width="500px"
    :confirm-btn="loading ? { disabled: true, content: '保存' } : {content: '保存'}" :closeOnOverlayClick="false" @confirm="submit"
  >
    <t-form ref="form" :label-width="0" :rules="rules" :data="data">
      <t-form-item name="actionId">
        <t-select
          v-model="data.actionId"
          :options="actionOptions"
          placeholder="请选择场景"
          :keys="{ value:'actionId',label:'actionName' }"
        ></t-select>
      </t-form-item>
      <t-form-item name="speakWord">
        <t-textarea placeholder="请输入反应语言"  v-model="data.speakWord"/>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import type { FormInstanceFunctions } from 'tdesign-vue-next/es/form/type';
import { MessagePlugin,FormProps } from 'tdesign-vue-next';
import { updateActionData,addActionData,getActionTypeList} from '@/api/store'
import type { actionType } from '@/api/model/storeModel';

const emit = defineEmits(['fresh']);
const form = ref<FormInstanceFunctions | null>(null);
const visible = ref(false);
const loading = ref(false);
const data = ref<any>({
  speakWord:'',
  actionId:''
});
const opType = ref('add');
const submiting=ref(false)
const actionOptions = ref<actionType[]>([])
const rules: FormProps['rules'] = {
  actionId: [{required: true,message: '请选择场景',type: 'error',trigger: 'change',}],
  speakWord: [{required: true,message: '请输入反应语言',type: 'error',trigger: 'blur',}],
}

const show = (opData:any,type:string) => { 
  visible.value = true;
  opType.value=type
  data.value.speakWord = opData.speakWord||'';
};

const submit = () => {
  if(!form.value||submiting.value) {
    return;
  }
  const params: any = { ...data.value };
  form.value.validate().then(res => {
    if(res === true) {
      submiting.value=true;
      if(opType.value==='add'){
        addActionData(params).then((res)=>{
          if(res.code===200){
            MessagePlugin.success('添加成功')
            emit('fresh')
            visible.value = false;
          }else  MessagePlugin.error('添加失败')
        }).finally(()=>{submiting.value=false;})
      }
      else{
        updateActionData(params).then((res)=>{
          if(res.code===200){
            MessagePlugin.success('修改成功')
            emit('fresh')
            visible.value = false;
          }else  MessagePlugin.error('修改失败')
        }).finally(()=>{submiting.value=false;})
      }
    }
  });
};

onMounted(() => {
  getActionTypeList().then((res)=>{
    if(res.code===200&&res.rows) {
      actionOptions.value = res.rows;
    }
  })
});

defineExpose({ show });
</script>