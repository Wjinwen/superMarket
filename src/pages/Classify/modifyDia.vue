<template>
  <t-dialog
    :destroyOnClose="true" :header="`${opType === 'update' ? '编辑' : '新增'}货架`" v-model:visible="visible" width="500px"
    :confirm-btn="loading ? { disabled: true, content: '保存' } : {content: '保存'}" :closeOnOverlayClick="false" @confirm="submit"
  >
    <t-form ref="form" :label-width="0" :rules="rules" :data="data" v-if="data">
      <t-form-item name="shelfName">
        <t-input placeholder="请输入货架名称" v-model="data.shelfName"/>
      </t-form-item>
      <t-form-item name="productList">
        <t-textarea placeholder="请输入货架商品" v-model="data.productList"/>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstanceFunctions } from 'tdesign-vue-next/es/form/type';
import { MessagePlugin,FormProps } from 'tdesign-vue-next';
import { updateShelfData,addShelfData} from '@/api/store'
import type { shelfDataItem } from '@/api/model/storeModel';
import store from '@/store';

interface DataType {
  shelfName:string
  productList:string
  storeId?:number
}
const emit = defineEmits(['fresh']);

const emptyInit = () => ({
  shelfName:'',
  productList:'',
});

const form = ref<FormInstanceFunctions | null>(null);
const visible = ref(false);
const loading = ref(false);
const submiting=ref(false)
const data = ref<DataType|null>(null);
const opType = ref('add');

const rules: FormProps['rules'] = {
  shelfName: [{required: true,message: '货架名称必填',type: 'error',trigger: 'blur',}],
  productList: [{required: true,message: '货架商品必填',type: 'error',trigger: 'blur',}],
}

const show = (val?:shelfDataItem,storeId?:number) => { 
  visible.value = true;
  if(val) {
    opType.value = 'update';
    data.value = {...val};
  } else {
    opType.value = 'add';
    data.value = emptyInit();
    data.value.storeId=storeId
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
        addShelfData(params).then(()=>{
          MessagePlugin.success('添加成功')
          emit('fresh')
          visible.value = false;
        }).finally(()=>{submiting.value=false;})
      }
      else{
        updateShelfData(params).then(()=>{
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