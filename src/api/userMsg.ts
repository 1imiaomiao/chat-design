import { http } from "@/utils/http";

const MOCK = "https://mock.apifox.com/m1/4017690-0-default"
export interface UserMsg {
  userId:string
  userName:string
  email:string
  avatar:string
  blogNum:number
  attentionNum:number
  commentNum:number
}
export function getUserMsgApi(params?: object): Promise<any> {
  return http.request({
    url:`${MOCK}/getUserMsg`,
    method:"POST",
    params
  });
}