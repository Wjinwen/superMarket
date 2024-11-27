
export interface getStoreListResult {
  code:number
  msg: string;
  total?:number
  rows?: Array<StoreItem>;
}

export interface StoreItem {
  createBy?: string,
  createTime?: string,
  updateBy?: string,
  updateTime?: string,
  remark?: string,
  storeId: number,
  storeName: string,
  storePos: string,
  storeDescription?: string
}
