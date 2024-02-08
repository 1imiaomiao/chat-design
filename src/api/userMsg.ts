import { http } from "@/utils/http";

const MOCK = "https://mock.apifox.com/m1/4017690-0-default"
export function getUserMsgApi(params?: object): Promise<object> {
  return http.request({
    url:`${MOCK}/getUserMsg`,
    method:"POST"
  });
}