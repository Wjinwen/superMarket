<template>
  <div class="home-panel-detail" v-loading='Loading'>
    <div style="display: flex;align-items: center;margin-bottom: 12px;justify-content: space-between;">
      <div style="font-size: 18px;font-weight:600;">场景话术</div>
      <t-button @click="()=>{modifyDiaRef.show('','add')}" >新增</t-button>
    </div>
    <!-- :rowspan-and-colspan="rowspanAndColspan" -->
    <t-table
      row-key="handleId"
      :data="ListData"
      :columns="columns"
      :rowspan-and-colspan="rowspanAndColspan"
    >
    <template #op="{ row }">
      <div style="display: flex;">
        <!-- <div style="margin-right: 16px;cursor: pointer;" @click="()=>{modifyDiaRef.show(row)}" >修改</div> -->
        <div style="color: var(--td-error-color);cursor: pointer;" @click="()=>{opData=row;delVisible=true}" >删除</div>
      </div>
    </template>
    <template #audio="{ row }">
      <div class="gray-item" @click="getHandleAudio(row)" style="flex: 1;display: flex;justify-content: space-between;color: var(--td-gray-color-7);cursor: pointer;">
        点击试听
        <playAudio :audioSrc="row.speakAudio"  ref="playAudioRef"/>
      </div>
      </template>
    </t-table>
    <t-pagination
    style="margin-top: 16px;"
      :total="total"
      v-model="current" 
      v-model:page-size="pageSize"
      @page-size-change="onPageSizeChange"
      @current-change="onCurrentChange"
    />
    <modifyDia ref="modifyDiaRef"  @fresh='getData'/>
    <t-dialog header="删除" v-model:visible="delVisible" :closeOnOverlayClick="false" @confirm="submitDel">
      <div>确认删除反应语言【{{opData?.speakWord}}】吗？</div>
    </t-dialog>
  </div>
</template>

<script lang="tsx">
export default {
  name: 'Classify',
};
</script>

<script setup lang="tsx">
import playAudio from '@/components/playAudio/index.vue';
import { ref ,onMounted} from 'vue';
import { TableProps,MessagePlugin,PaginationProps} from 'tdesign-vue-next';
import { getShelfData,delShelfData} from '@/api/store'
import { getActionList,delActionData,getAudio} from '@/api/store'
import type { actionhandlItem } from '@/api/model/storeModel';
import dayjs from 'dayjs';
import modifyDia from './modifyDia.vue';

const modifyDiaRef=ref()
const delVisible=ref(false)
const opData=ref<actionhandlItem|null>(null)
const defaulTime = dayjs().toDate();
const columns = ref<TableProps['columns']>([
  {
    colKey: 'actionName',
    title: '场景描述',
    width: '150',
  },
  {
    colKey: 'speakWord',
    title: '反应语言',
  },
  {
    colKey: 'audio',
    title: '动作效果',
    width: '120',
  },
  {
    colKey: 'op',
    title: '操作',
    width: '100',
  }
]);
const playAudioRef=ref()
const ListData=ref<actionhandlItem[]>([])
const storeId=ref<number|null>(null)
const submiting=ref(false)
const Loading=ref<Boolean>(false);

const total=ref<number|null>(null)
const current = ref(1);
const pageSize = ref(10);

const getData = () => {
  if(Loading.value) return;
  total.value=0;
  Loading.value=true;
  getActionList({pageSize:pageSize.value,pageNum:current.value}).then((res)=>{
    if(res.code===200&&res.rows) {
      ListData.value = setrowspans(res.rows);
      total.value=res.total
    }
  }).finally(()=>{ Loading.value=false;})
};

const setrowspans = (arr:any) => {
    const columns = ['actionName']; // 需要合并的列名
    const data=JSON.parse(JSON.stringify(arr))
    // 为每个需要合并的列设置默认 rowspan 
    data.forEach((row:any) => {
      row['actionNameRowspan'] = 1
    });

    columns.forEach((col, index) => {
      for (let i = 0; i < data.length; i++) {
        // 这里进行判断
        // 如果当前行的列数据和下一行的列数据相等
        // 就把当前rowspan + 1，下一行的rowspan - 1
        for (let j = i + 1; j < data.length; j++) {
            if (data[i][col] === data[j][col]) {
              data[i][col + 'Rowspan']++;
              data[j][col + 'Rowspan']--;
            } else {
                break; // 如果不相等，跳出循环，因为已经没有相同的了
            }
        }
        // 这里跳过已经重复的数据
        i = i + data[i][col + 'Rowspan'] - 1;
      }
    })
    return data
}

const rowspanAndColspan: TableProps['rowspanAndColspan'] = ({ row,col, rowIndex, colIndex }) => {
  if (colIndex === 0) { 
    return {
      rowspan: row.actionNameRowspan,
    };
  }
};

const getHandleAudio = async (row:actionhandlItem) => {
  row.speakAudio=null
  const res=await getAudio(row.handleId)
  row.speakAudio='data:audio/mp3;base64,'+res.data.speakAudio
  setTimeout(()=>{
    playAudioRef.value.playAudio()
  })
};

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

const onPageSizeChange: PaginationProps['onPageSizeChange'] = (size) => {
  current.value=1;
  getData()
};
const onCurrentChange: PaginationProps['onCurrentChange'] = (index, pageInfo) => {
  getData()
};

onMounted(() => {
  getData()
});

</script>

<style lang="less" scoped>
.home-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  :deep(.t-card__body) {
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-l);
    display: flex;
  }
  &:hover{
    box-shadow:var(--td-shadow-2);
  }
  &__img{
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__info {
    color: var(--td-text-color-primary);
    display: flex;
    flex-direction: column;
    width: 150px;
    align-items: center;
    &__number{
      font-weight: 600;
      margin-bottom: 6px;
      font-size: var(--td-size-7);
    }
  }
}
.home-panel-detail{
  height: 100%;
  :deep(.t-table--striped:not(.t-table--header-fixed) > .t-table__content > table > tbody > tr:nth-of-type(odd):not(.t-table__expanded-row)) {
    background: #f2f3ff;
  }
  :deep(.t-table__header){
    tr{background: var(--td-brand-color);}
    th{font-weight: 600;color: var(--td-gray-color-14);}
  }
}
</style>
