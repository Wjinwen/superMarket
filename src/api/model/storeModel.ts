import { number } from "echarts";

export interface getListResult {
  code:number
  msg?: string;
  total?:number
  rows?: Array<any>;
  data?:any
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
  dataId?:number,
  storeId?: number,
  date?: string|null,
  customerCount:any
  manualServiceCount:any
  aiChatCount:any
  childrenCount:any
  teenagerCount:any
  youngCount:any
  middleAgeCount:any
  oldCount:any
  storeName?:string
}

export interface QaItem {
  createBy?: string,
  createTime?: string,
  updateBy?: string,
  updateTime?: string,
  remark?: string,
  qaId:number,
  question: string,
  answer:string
}
export interface QaHistoryItem {
  createBy?: string,
  createTime?: string,
  updateBy?: string,
  updateTime?: string,
  remark?: string,
  chatId:number,
  storeId:number
  question: string,
  answer:string
}

