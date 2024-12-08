<template>
  <t-popup expand-animation placement="bottom-right" trigger="click" v-model:visible='popVisible'>
    <template #content>
      <div class="header-msg" v-loading='loading'>
        <div class="header-msg-top">
          <p>{{ t('layout.notice.title') }}</p>
        </div>
        <t-list v-if="total > 0" class="narrow-scrollbar" :split="false">
          <t-list-item v-for="(item, index) in unreadMsg" :key="index" @click="()=>{popVisible=false;DialogPluginConfirm(item)}">
            <div>
              <p class="msg-content">{{ item.storeName }}在呼叫人工</p>
            </div>
            <p class="msg-time">{{ item.createTime }}</p>
          </t-list-item>
        </t-list>
        <div v-else class="empty-list">
          <img src="https://tdesign.gtimg.com/pro-template/personal/nothing.png" alt="空" />
          <p>{{ t('layout.notice.empty') }}</p>
        </div>
      </div>
    </template>
    <t-badge :count="total" :offset="[4, 4]">
      <div style="height:32px;width:32px;line-height:32px;text-align: center;cursor: pointer;">
        <t-icon name="notification" style="color:white"/>
      </div>
      <!-- <t-button theme="default" shape="square" variant="text" ghost>
        <t-icon name="notification" style="color:white"/>
      </t-button> -->
    </t-badge>
  </t-popup>
</template>

<script setup lang="ts">
import { onMounted,onUnmounted,ref,watch } from 'vue';
import { t } from '@/locales';
import Socket from '@/utils/ws';
import { DialogPlugin,MessagePlugin } from 'tdesign-vue-next';
import { getCallList,updateCall} from '@/api/store'
import type { callItem } from '@/api/model/storeModel';

const popVisible=ref(false);
const loading=ref(false);
const total=ref(0);
const unreadMsg=ref<callItem[]>([])

watch(() => popVisible.value, (val) => {
  if(val) getData()
});

const getData = () => {
  loading.value=true;
  getCallList().then((res)=>{
    if(res.code===200) {
      unreadMsg.value=res.rows
      total.value=res.rows.length
    }
  }).finally(()=>{loading.value=false;})
}

const exitWs = new Socket(`ws://120.25.125.33:8080/api/websocket/erp/${Math.random()}`, message => {
  const msg=JSON.parse(message)
  console.log('message==websocket',msg)
  if(msg&&msg.topic&&msg.topic==='/callManualService'){
    DialogPluginConfirm(msg.data)
  }
});

const DialogPluginConfirm = (msg:any) => {
  const confirmDia = DialogPlugin({
    body: `${msg?.storeName}在呼叫人工`,
    confirmBtn: '已解决',
    cancelBtn: '隐藏右上角',
    closeOnOverlayClick:false,
    closeBtn:false,
    onConfirm: async ({ e }) => {
      const res=await updateCall({"callId": msg.callId})
      if(res.code===200) {
        total.value=total.value-1;
          // 请求成功后，销毁弹框
        confirmDia.destroy();
      }
    },
    onClose: ({ e, trigger }) => {
      confirmDia.destroy();
    },
  })
}

// 当组件销毁时关闭WebSocket连接
onUnmounted(() => {
  exitWs.close();
});

onMounted(() => {
  getData();
});
</script>

<style lang="less" scoped>
.header-msg {
  width: 400px;
  margin: calc(0px - var(--td-comp-paddingTB-xs)) calc(0px - var(--td-comp-paddingLR-s));

  .empty-list {
    // height: calc(100% - 120px);
    text-align: center;
    padding: var(--td-comp-paddingTB-xxl) 0;
    font: var(--td-font-body-medium);
    color: var(--td-text-color-secondary);

    img {
      width: var(--td-comp-size-xxxxl);
    }

    p {
      margin-top: var(--td-comp-margin-xs);
    }
  }

  &-top {
    position: relative;
    font: var(--td-font-title-medium);
    color: var(--td-text-color-primary);
    text-align: left;
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-xl) 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .t-list {
    height: calc(100% - 104px);
    padding: var(--td-comp-margin-s) var(--td-comp-margin-s);
  }

  .t-list-item {
    overflow: hidden;
    width: 100%;
    padding:12px;
    border-radius: var(--td-radius-default);
    font: var(--td-font-body-medium);
    color: var(--td-text-color-primary);
    cursor: pointer;
    transition: background-color 0.2s linear;

    &:hover {
      background-color: var(--td-bg-color-container-hover);

      .msg-content {
        color: var(--td-brand-color);
      }

      .msg-time {
        bottom: -6px;
        opacity: 0;
      }
    }

    .msg-content {
      margin-bottom: var(--td-comp-margin-s);
    }
    .msg-time {
      transition: all 0.2s ease;
      opacity: 1;
      position: absolute;
      right: var(--td-comp-margin-xxl);
      bottom: 0;
      color: var(--td-text-color-secondary);
    }
  }
}
</style>
