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
  chatId?:number,
  storeId?:number
  question: string,
  answer:string
}

export interface shelfDataItem {
  createBy?: string,
  createTime?: string,
  updateBy?: string,
  updateTime?: string,
  remark?: string,
  dataId:number,
  storeId:number
  shelfName: string,
  productList:string
}

export interface actionhandlItem {
  createBy?: string,
  createTime?: string,
  updateBy?: string,
  updateTime?: string,
  remark?: string,
  handleId?:number
  speakWord:string
  speakAudio?:string|null|audioinfo
  actionId?:number,
  actionName: string,
}
export interface audioinfo {
  src:string,
  time:number
}
export interface actionList {
  actionId:number,
  actionName: string,
  list?:any
}

export interface callItem {
  createBy?: string,
  createTime?: string,
  updateBy?: string,
  updateTime?: string,
  remark?: string,
  callId: number,
  storeId: number,
  solveStatus: number,
  storeName: string
}

export interface config {
  configId: number,
  doorLockHold: number|boolean,
  soundOn: number|boolean,
  soundVolume: number,
  storeId: number,
  sysOn:number|boolean,
}

export interface actionType {
  createBy?: string,
  createTime?: string,
  updateBy?: string,
  updateTime?: string,
  remark?: string,
  actionId: number,
  actionName: string,
  actionDescription?: string,
  storeId: number,
  sysOn:number|boolean,
}