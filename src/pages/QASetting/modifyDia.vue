<template>
  <t-dialog
    :destroyOnClose="true" :header="`${opType === 'update' ? '编辑' : '新增'}话术`" v-model:visible="visible" width="500px"
    :confirm-btn="loading ? { disabled: true, content: '保存' } : {content: '保存'}" :closeOnOverlayClick="false" @confirm="submit"
  >
    <t-form ref="form" :label-width="0" :rules="rules" :data="data" v-if="data">
      <t-form-item name="question">
        <t-textarea placeholder="请输入问题" v-model="data.question"/>
      </t-form-item>
      <t-form-item name="answer">
        <t-textarea placeholder="请输入回答" v-model="data.answer"/>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstanceFunctions } from 'tdesign-vue-next/es/form/type';
import { MessagePlugin,FormProps } from 'tdesign-vue-next';
import { updateQa,addQa} from '@/api/store'
import type { StoreVist } from '@/api/model/storeModel';

interface qatype {
  question:string
  answer:string
}
const emit = defineEmits(['fresh']);

const emptyInit = () => ({
  question:'',
  answer:''
});

const form = ref<FormInstanceFunctions | null>(null);
const visible = ref(false);
const loading = ref(false);
const submiting=ref(false)
const data = ref<qatype|null>(null);
const opType = ref('add');

const rules: FormProps['rules'] = {
  question: [{required: true,message: '问题必填',type: 'error',trigger: 'blur',}],
  answer: [{required: true,message: '回答必填',type: 'error',trigger: 'blur',}],
}

const show = (val?:qatype) => { 
  visible.value = true;
  if(val) {
    opType.value = 'update';
    data.value = {...val};
  } else {
    opType.value = 'add';
    data.value = emptyInit();
  }
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
        addQa(params).then(()=>{
          MessagePlugin.success('添加成功')
          emit('fresh')
          visible.value = false;
        }).finally(()=>{submiting.value=false;})
      }
      else{
        updateQa(params).then(()=>{
          MessagePlugin.success('修改成功')
          emit('fresh')
          visible.value = false;
        }).finally(()=>{submiting.value=false;})
      }
    }
  });
};

defineExpose({ show });
</script>