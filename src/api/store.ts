import type { getStoreListResult } from '@/api/model/storeModel';
import { request } from '@/utils/request';

const Api = {
  getStoreList: '/store/info/list',
};

export function getStoreList() {
  return request.get<getStoreListResult>({
    url: Api.getStoreList,
  });
}