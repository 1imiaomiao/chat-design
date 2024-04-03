// stores/counter.js
import { defineStore } from "pinia";
import { emitLogin } from "@/hooks/useSocketHooks";

export const useUserInfoStore = defineStore("counter", {
  state: () => {
    const temp = window.localStorage.getItem("userInfo");
    return { userInfo: temp ? JSON.parse(temp) : {} };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    changeUserInfo(userInfo: any) {
      this.userInfo = userInfo;
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      emitLogin();
    },
    logout() {
      this.userInfo = {};
      window.localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    }
  }
});
