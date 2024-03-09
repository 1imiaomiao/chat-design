import { defineStore } from "pinia";
import { store } from "@/store";

// const userInfo = "__dark_mode__";
const getUserInfo = () => {
  return (
    JSON.parse(window.localStorage.getItem("userInfo") || "") || {
      id: "",
      username: "",
      lastLoginTime: ""
    }
  );
};

export const useUserInfoStore = defineStore({
  id: "userInfo",
  state: () => ({
    userInfo: getUserInfo()
  }),
  actions: {
    changeUserInfo(userInfo: any) {
      this.userInfo = userInfo;
      window.localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
    }
    // toggleDarkMode() {
    //   this.darkMode = !this.darkMode;
    //   if (this.darkMode) {
    //     document.documentElement.classList.add("dark");
    //     window.localStorage.setItem(darkModeKey, "true");
    //   } else {
    //     document.documentElement.classList.remove("dark");
    //     window.localStorage.setItem(darkModeKey, "false");
    //   }
    // }
  }
});

export function useUserInfoStoreHook() {
  return useUserInfoStore(store);
}
