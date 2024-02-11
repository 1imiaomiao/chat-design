import { http } from "@/utils/http";
const MOCK = "https://mock.apifox.com/m1/4017690-0-default";

export interface BlogDetail {
  coverImg: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  description: string;
  likeNum: number;
  likeStatus: number;
  tag: string;
  createTime: string;
  id: string;
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
