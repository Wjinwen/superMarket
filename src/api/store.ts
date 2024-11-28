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

export function getQaList() {
  return request.get<getListResult>({
    url: Api.getQaList
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