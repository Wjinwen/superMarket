
export interface getListResult {
  code:number
  msg: string;
  total?:number
  rows?: Array<any>;
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
export interface StoreVist {
  createBy?: string,
  createTime?: string,
  updateBy?: string,
  updateTime?: string,
  remark?: string,
  dataId:number,
  storeId: number,
  date: string,
  customerCount:number
  manualServiceCount:number
  aiChatCount:number
  childrenCount:number
  teenagerCount:number
  youngCount:number
  middleAgeCount:number
  oldCount:number
  storeName:string
}
