const BASEURL = "http://localhost:9000/v1/admin";
import { http } from "@/utils/http";

export function getCodeTextApi(): Promise<any> {
  return http.request({
    url: `${BASEURL}/captcha`,
    method: "GET"
  });
}
export function registerApi(data: any) {
  return http.request<any>({
    url: `${BASEURL}/createUsers`,
    method: "POST",
    data
  });
}

export function loginApi(data?: any): Promise<any> {
  return http.request({
    method: "POST",
    data,
    url: `${BASEURL}/login`
  });
}
