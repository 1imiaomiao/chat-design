<script setup lang="ts" name="Login">
import { ref } from "vue";
import md5 from "md5";
import { registerApi, getCodeTextApi, loginApi } from "@/api/login";
import { useGlobalToken } from "@/utils/useModalToken";
import { useRouter } from "vue-router";
import { showNotify } from "vant";
import { useUserInfoStore } from "@/store/modules/userInfo";

interface LoginMsg {
  username: string;
  password: string;
  email?: string;
  codeText?: string;
  captcha?: string;
}
const router = useRouter();
const activeTab = ref("login");
// const userInforStore = useUserInfoStore();

const loginMsg = ref<LoginMsg>({
  username: "",
  password: "",
  email: "",
  codeText: "",
  captcha: ""
});
const codeSvg = ref("");
const token = useGlobalToken();

const getCodeText = async () => {
  try {
    const { data, text } = await getCodeTextApi();
    codeSvg.value = data;
    loginMsg.value.codeText = text;
  } catch (error) {
    console.log("errror", error);
  }
};
const confirmLogin = async () => {
  try {
    const res = await loginApi({
      ...loginMsg.value,
      password: md5(loginMsg.value.password),
      type: "admin"
    });
    const { id, username, fanNum, followNum, likeNum, email, coverImg, type } =
      res;
    useUserInfoStore().changeUserInfo({
      id,
      username,
      email,
      coverImg,
      fanNum,
      followNum,
      likeNum,
      lastLoginTime: Date.now(),
      type
    });
    token.value = res.token;
  } catch (error: any) {
    showNotify({ type: "warning", message: error.message || "接口报错~" });
    return Promise.reject();
  }
};
const handleClickLogin = async () => {
  await confirmLogin();
  router.push("/");
};
const onSubmitRegister = async () => {
  try {
    const res = await registerApi({
      ...loginMsg.value,
      password: md5(loginMsg.value.password),
      type: "admin"
    });
    showNotify({ message: "注册成功，请重新登录~", type: "success" });
    activeTab.value = "login";
  } catch (error: any) {
    // showNotify({ message: "注册成功，请重新登录~", type: "success" });
    showNotify({ message: error?.message || "网络错误", type: "warning" });
    console.log("errrsssor", error);
  }
};
</script>

<template>
  <div class="login">
    <div class="login-mask"></div>
    <div class="login-msg">
      <van-tabs v-model:active="activeTab">
        <van-tab title="登录" name="login"></van-tab>
        <van-tab title="注册" name="register"></van-tab>
      </van-tabs>
      <van-form @submit="onSubmitRegister" v-show="activeTab === 'register'">
        <van-cell-group inset>
          <van-field
            v-model="loginMsg.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginMsg.email"
            type="text"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
          />
          <van-field
            v-model="loginMsg.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
      <van-form v-show="activeTab === 'login'" @submit="handleClickLogin">
        <van-cell-group inset>
          <van-field
            v-model="loginMsg.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginMsg.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="loginMsg.captcha"
            type="text"
            label="验证码"
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '验证码' }]"
          />
          <div class="flex justify-center pt-[4px] pb-[4px] login-msg">
            <div
              class="text-[#999] flex align-center"
              v-html="codeSvg || '点击获取验证码'"
              @click="getCodeText"
            ></div>
          </div>
          <van-divider />
          <span class="tips" @click="router.push('/login')"
            >居民账号点此处跳转</span
          >
        </van-cell-group>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #2776ff;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  color: #fff;
  :deep(.van-tab--active) {
    color: #fff;
  }
  .login-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    opacity: 0.32;
  }
  .login-msg {
    width: 80%;
    height: 40%;
    border-radius: 8px;
    z-index: 1;
    margin-bottom: 6px;
    border-radius: 6px;
    :deep(.van-field) {
      padding-block: 16px;
    }
    :deep(.van-tabs__nav) {
      background: transparent;
    }
    :deep(.van-tabs__nav) {
      background: transparent;
    }
    :deep(.van-tabs__wrap) {
      margin-bottom: 12px;
    }
  }
  .tips {
    text-align: center;
    color: #1989fa;
    font-size: 12px;
    display: flex;
    justify-content: center;
  }
}
</style>
