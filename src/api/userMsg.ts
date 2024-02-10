import { http } from "@/utils/http";

const MOCK = "https://mock.apifox.com/m1/4017690-0-default";
export interface UserMsg {
  userId: string;
  userName: string;
  email: string;
  avatar: string;
  blogNum: number;
  getLikeNum: number;
  fanNum: number;
  attentionNum: number;
  commentNum: number;
}
export function getUserMsgApi(params?: object): Promise<any> {
  return http.request({
    url: `${MOCK}/getUserMsg`,
    method: "POST",
    params
  });
}

export interface BlogMsg {
  id: string;
  tag: string;
  creatTime: string;
  description: string;
  coverImg: string;
  title: string;
  talkNum: number;
  likeNum: number;
  eyeNum: number;
  authorId?: string;
  authorName?: string;
  likeStatus: number;
}
export function getBlogListApi(data: any): Promise<any> {
  return http.request({
    url: `${MOCK}/getBlogList`,
    method: "POST",
    params: data
  });
}
export function getLikeListApi(data: any): Promise<any> {
  return http.request({
    url: `${MOCK}/getLikeList`,
    method: "POST",
    params: data
  });
}
