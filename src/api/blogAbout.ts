import { http } from "@/utils/http";
const MOCK = "https://mock.apifox.com/m1/4017690-0-default";
const BASEURL = "http://localhost:9000/v1/admin";

export interface BlogDetail {
  coverImg: string | File;
  authorName?: string;
  authorAvatar?: string;
  authorId: string;
  title: string;
  description: string;
  likeNum?: number;
  likeStatus?: number;
  tag: string;
  createTime: string;
  id?: string;
}
export function getBlogDetailApi(data?: any): Promise<BlogDetail> {
  return http.request({
    url: `${MOCK}/getBlogDetail`,
    params: data,
    method: "Post"
  });
}
export interface TalkDetail {
  likeNum: number;
  content: string;
  authorName: string;
  createTime: string;
  likeStatus: number;
  id: string;
  authorAvatar: string;
}
export function getBlogTalkDetailApi(data?: any): Promise<any> {
  return http.request({
    url: `${MOCK}/getTalkList`,
    params: data,
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
    url: `${BASEURL}/article/create`,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
