import { http } from "@/utils/http";

export function getCodeTextApi(): Promise<any> {
  return http.request({
    url: `/captcha`,
    method: "GET"
  });
}
export function registerApi(data: any) {
  return http.request<any>({
    url: `/user/create`,
    method: "POST",
    data
  });
}

export function loginApi(data?: any): Promise<any> {
  console.log(">>>>logggg>", data);
  return http.request({
    method: "POST",
    data,
    url: `/login`
  });
}
