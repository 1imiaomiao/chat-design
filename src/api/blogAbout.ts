import { http } from "@/utils/http";
const MOCK = "https://mock.apifox.com/m1/4017690-0-default";
// const BASEURL = "https://0637.top/";

export interface BlogDetail {
  coverImg: string;
  authorName?: string;
  authorAvatar?: string;
  authorId: string;
  title: string;
  content: string;
  likeCount: number;
  likeStatus?: number;
  tag?: string;
  createdAt: string;
  id?: string;
  userAvatar: string;
  talkCount?: number;
}
export function getBlogDetailApi(data?: any): Promise<BlogDetail> {
  return http.request({
    url: `/article/detail`,
    data,
    method: "post"
  });
}
export interface TalkDetail {
  likeCount: number;
  content: string;
  username: string;
  userId: string;
  coverImg: string;
  createdAt: string | Date;
  likeStatus: number;
  talkCount: number;
  id: string;
  replayUser: { username: string; userId: string };
  sonComment?: TalkDetail[];
}
export function getBlogTalkDetailApi(data?: any): Promise<any> {
  return http.request({
    url: `/comment/query`,
    data,
    method: "Post"
  });
}
export function queryBlogTalkApi(data?: any): Promise<any> {
  return http.request({
    url: `/comment/create`,
    data,
    method: "Post"
  });
}

export interface BlogCreate {
  userId?: string;
  content: string;
  title: string;
  coverImg: { file: File | File[] } | null;
}
export function createBlogApi(data: any) {
  return http.request({
    url: `/article/create`,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
export function changeTalkLikeStatus(data?: any): Promise<any> {
  return http.request({
    url: `/comment/changeLike`,
    data,
    method: "Post"
  });
}
