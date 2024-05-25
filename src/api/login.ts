import { http } from "@/utils/http";

export function getCodeTextApi(): Promise<any> {
  return http.request({
    url: `/admin/captcha`,
    method: "GET"
  });
}
export function registerApi(data: any) {
  return http.request<any>({
    url: `/admin/user/create`,
    method: "POST",
    data
  });
}

export function loginApi(data?: any): Promise<any> {
  console.log(">>>>logggg>", data);
  return http.request({
    method: "POST",
    data,
    url: `/admin/login`
  });
}
