<template>
  <t-dialog
    :destroyOnClose="true" :header="`${opType === 'add' ? '编辑' : '新增'}话术`" v-model:visible="visible" width="500px"
    :confirm-btn="loading ? { disabled: true, content: '保存' } : {content: '保存'}" :closeOnOverlayClick="false" @confirm="submit"
  >
    <t-form ref="form" :label-width="0" :rules="rules" :data="data">
      <t-form-item name="ques">
        <t-textarea placeholder="请输入问题" />
      </t-form-item>
      <t-form-item name="answer">
        <t-textarea placeholder="请输入回答" />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstanceFunctions } from 'tdesign-vue-next/es/form/type';
import type { qatype } from './type';
import _ from 'lodash';
import { MessagePlugin,FormProps } from 'tdesign-vue-next';
const emits = defineEmits(['fresh']);

const emptyInit = () => ({
  ques:'',
  answer:''
});

const form = ref<FormInstanceFunctions | null>(null);
const visible = ref(false);
const loading = ref(false);
const data = ref<qatype>(emptyInit());
const opType = ref('add');

const rules: FormProps['rules'] = {
  ques: [{required: true,message: '问题必填',type: 'error',trigger: 'blur',}],
  answer: [{required: true,message: '回答必填',type: 'error',trigger: 'blur',}],
}

const show = (val:qatype) => { 
  visible.value = true;
  if(val) {
    opType.value = 'update';
    data.value = {
      ques: val.ques,
      answer: val.answer,
    };
  } else {
    opType.value = 'add';
    data.value = emptyInit();
  }
};
const submit = () => {
  if(!form.value) {
    return;
  }
  const params: any = { ...data.value };
  form.value.validate().then(res => {
    if(res === true) {
      // loading.value = true;
      console.log('提交弹窗内容：',params)
    }
  });
};

defineExpose({ show });
</script>