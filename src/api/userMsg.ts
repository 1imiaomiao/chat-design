import { http } from "@/utils/http";
// const BASEURL = "https://0637.top/";

const MOCK = "https://mock.apifox.com/m1/4017690-0-default";
// export interface UserMsg {
//   userId: string;
//   userName: string;
//   email: string;
//   avatar: string;
//   blogNum: number;
//   getLikeNum: number;
//   fanNum: number;
//   attentionNum: number;
//   commentNum: number;
// }
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
    url: `/admin/article/list`,
    method: "POST",
    data
  });
}
export function getLikeListApi(data: any): Promise<any> {
  return http.request({
    url: `/admin/article/likeList`,
    method: "POST",
    data
  });
}

export function changeLikeStatusApi(data: any): Promise<any> {
  return http.request({
    url: `/admin/article/changeLike`,
    method: "post",
    data
  });
}
export interface UserMsg {
  id: string;
  createdAt?: Date;
  email: string;
  introduce: string;
  username: string;
  password?: string;
  coverImg: string | File;
  type: "admin" | "user";
}
export function queryUserMsg(data: any): Promise<any> {
  return http.request({
    url: `/admin/user/query`,
    method: "post",
    data
  });
}
export function updateUserMsg(data: any): Promise<any> {
  return http.request({
    url: `/admin/user/update`,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export function userListApi(data: object) {
  return http.request({
    url: `/admin/user/list`,
    method: "post",
    data
  });
}
