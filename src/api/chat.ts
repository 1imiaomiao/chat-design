// const BASEURL = "https://0637.top/";
import { http } from "@/utils/http";

// export interface ChatMsg {
//   createdAt: string | Date;
//   id: string;
//   senderId: string;
//   coverImg: string;
//   content: string;
//   username: string;
// }
export function queryList(data: any) {
  return http.request<any>({
    url: `/admin/chat/queryList`,
    method: "POST",
    data
  });
}
export interface ChatMsg {
  id: string;
  receiverId: string;
  content: string;
  senderId: string;
  createdAt: Date | string;
  roomId: string;
  coverImg?: string;
  username?: string;
}
export function queryChatDetail(data: Object) {
  return http.request<any>({
    url: `/admin/chat/query`,
    method: "POST",
    data
  });
}
export function sendChatMsgApi(data: Object) {
  return http.request({
    url: "/admin/chat/create",
    method: "POST",
    data
  });
}
