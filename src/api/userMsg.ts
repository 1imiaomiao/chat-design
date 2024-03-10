import { http } from "@/utils/http";
const BASEURL = "http://localhost:9000/v1/admin";

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
  content: string;
  coverImg: string;
  title: string;
  talkCount: number;
  likeCount: number;
  authorId?: string;
  authorName?: string;
  likeStatus: number;
  userAvatar: string;
}
export function getBlogListApi(data: any): Promise<any> {
  return http.request({
    url: `${BASEURL}/article/list`,
    method: "POST",
    data
  });
}
export function getLikeListApi(data: any): Promise<any> {
  return http.request({
    url: `${BASEURL}/article/likeList`,
    method: "POST",
    data
  });
}

export function changeLikeStatusApi(data: any): Promise<any> {
  return http.request({
    url: `${BASEURL}/article/changeLike`,
    method: "post",
    data
  });
}
