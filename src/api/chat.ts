const BASEURL = "http://localhost:9000/v1/admin";
import { http } from "@/utils/http";

export interface ChatMsg {
  createdAt: string | Date;
  id: string;
  senderId: string;
  coverImg: string;
  content: string;
  username: string;
}
export function queryList(data: any) {
  return http.request<any>({
    url: `${BASEURL}/chat/queryList`,
    method: "POST",
    data
  });
}
