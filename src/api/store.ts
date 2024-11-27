import type { getListResult } from '@/api/model/storeModel';
import { request } from '@/utils/request';

const Api = {
  getStoreList: '/store/info/list', //店铺列表
  getStoreTop10:'/store/dailyData/listByIdAndDateRangeTop10', //首页-店铺流量top10列表
  getStoreDailyChart:'/store/dailyData/listByIdAndDateRange', //
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


export function getStoreDailyChart(params:any) {
  return request.get<getListResult>({
    url: Api.getStoreDailyChart,
    params
  });
}