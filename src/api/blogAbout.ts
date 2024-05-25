import { http } from "@/utils/http";
import axios from "axios";
// import CryptoJS from "crypto-js";

// const AK = "x0I8yUJ8AK4guAR5zlIKVm8k";
// const SK = "E0bL8OsDsnkHQgZZ1B6TlvcvmjpCKXUZ";
// const ACCESS_TOKEN =
//   "24.b8155792a0a3c6ba32461b7674ed3465.2592000.1719237596.282335-72354065";
// // const AIAPI =
//   "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-speed-128k";

// export function generateSignature(ak, sk, method, url, date) {
//   const canonicalRequest = `${method}\n${url}\n\nhost:aip.baidubce.com\nx-bce-date:${date}\n`;
//   const signingKey = CryptoJS.HmacSHA256(date, sk).toString(CryptoJS.enc.Hex);
//   const signature = CryptoJS.HmacSHA256(canonicalRequest, signingKey).toString(
//     CryptoJS.enc.Hex
//   );
//   return `bce-auth-v1/${ak}/${date}/1800/${signature}`;
// } // const BASEURL = "https://0637.top/";

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
    url: `/admin/article/detail`,
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
    url: `/admin/comment/query`,
    data,
    method: "Post"
  });
}
export function queryBlogTalkApi(data?: any): Promise<any> {
  return http.request({
    url: `/admin/comment/create`,
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
    url: `/admin/article/create`,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
export function changeTalkLikeStatus(data?: any): Promise<any> {
  return http.request({
    url: `/admin/comment/changeLike`,
    data,
    method: "Post"
  });
}

// export function aiChatApi(data: string) {
//   // const signal = generateSignature(
//   //   AK,
//   //   SK,
//   //   "POST",
//   //   AIAPI,
//   //   new Date().toISOString().split(".")[0] + "Z"
//   // );
//   // console.log(">signal>>>>", signal);
//   return http.request({
//     url: `/AI`,
//     data: {
//       messages: [{ role: "user", content: data }]
//     },
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
// }
export const aiChatApi = async (data: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/AI",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          messages: [{ role: "user", content: data }]
        }
      });

      // console.log("啦啦啦", res.data);
      resolve(res.data.result);
    } catch (error: any) {
      console.error("Error:", error.message);
      reject(error);
    }
  });
};
