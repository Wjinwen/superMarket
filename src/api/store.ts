import type { getListResult } from '@/api/model/storeModel';
import { request } from '@/utils/request';

const Api = {
  getStoreList: '/store/info/list', //店铺列表
  getStoreTop10:'/store/dailyData/listByIdAndDateRangeTop10', //首页 店铺流量top10列表
  getAllStoreVistor:'/store/dailyData/selectTotalDailyDataByDate', //首页 全国店铺人流量
  getStoreDailyChart:'/store/dailyData/listByIdAndDateRange', //门店数据-核心 chart图标数据
  getStoreQaHistory:'/store/storeChat/list', //门店数据-问答数据
  getQaList:'/store/qa/list', //用户问题设置 话术列表
  operateQa:'/store/qa',
  getShelfData:'/store/shelfData/list', //商品货架分类
  opShelfData:'/store/shelfData', 
  getActionList:'/store/handle/list', //场景动作列表
  opActionData:'/store/handle', 
  getAudio:'/store/handle', //获取动作音频
  getCallList:'/store/sotreManualServiceLog/listUnsolved', //获取未处理的消息列表
  updateCall:'/store/sotreManualServiceLog/solveCallManualService', //处理消息
};

export function getStoreList() {
  return request.get<getListResult>({
    url: Api.getStoreList,
  });
}

export function getStoreTop10(params:any) {
  return request.get<getListResult>({
    url: Api.getStoreTop10,
    params
  });
}

export function getAllStoreVistor(params:any) {
  return request.get<getListResult>({
    url: Api.getAllStoreVistor,
    params
  });
}

export function getStoreDailyChart(params:any) {
  return request.get<getListResult>({
    url: Api.getStoreDailyChart,
    params
  });
}

export function getStoreQaHistory(params:any) {
  return request.get<getListResult>({
    url: Api.getStoreQaHistory,
    params
  });
}

export function getQaList(params:any) {
  return request.get<getListResult>({
    url: Api.getQaList,
    params
  });
}

export function delQa(qaIds:number) {
  return request.delete<getListResult>({
    url: `${Api.operateQa}/${qaIds}`,
  });
}

export function updateQa(data:any) {
  return request.put<getListResult>({
    url: Api.operateQa,
    data
  });
}

export function addQa(data:any) {
  return request.post<getListResult>({
    url: Api.operateQa,
    data
  });
}

export function getShelfData(params:any) {
  return request.get<getListResult>({
    url: Api.getShelfData,
    params
  });
}

export function delShelfData(dataIds:number) {
  return request.delete<getListResult>({
    url: `${Api.opShelfData}/${dataIds}`,
  });
}

export function updateShelfData(data:any) {
  return request.put<getListResult>({
    url: Api.opShelfData,
    data
  });
}

export function addShelfData(data:any) {
  return request.post<getListResult>({
    url: Api.opShelfData,
    data
  });
}

export function getActionList() {
  return request.get<getListResult>({
    url: Api.getActionList,
  });
}
export function delActionData(handleIds:number) {
  return request.delete<getListResult>({
    url: `${Api.opActionData}/${handleIds}`,
  });
}

export function updateActionData(data:any) {
  return request.put<getListResult>({
    url: Api.opActionData,
    data
  });
}

export function addActionData(data:any) {
  return request.post<getListResult>({
    url: Api.opActionData,
    data
  });
}

export function getAudio(handleId:number) {
  return request.get<getListResult>({
    url: `${Api.getAudio}/${handleId}`,
    params:{handleId}
  });
}

export function getCallList() {
  return request.get<getListResult>({
    url: Api.getCallList,
  });
}

export function updateCall(data:any) {
  return request.put<getListResult>({
    url: Api.updateCall,
    data
  });
}