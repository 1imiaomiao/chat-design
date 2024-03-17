<script setup lang="ts" name="Setting">
import { ref, reactive, computed, onMounted } from "vue";
import { showNotify, type UploaderFileListItem } from "vant";
import { updateUserMsg } from "@/api/userMsg";
import type { UserMsg } from "@/api/userMsg";
import { queryUserMsg } from "@/api/userMsg";
import { useUserInfoStore } from "@/store/modules/userInfo";
import { useRouter } from "vue-router";

const router = useRouter();
const userMsg = ref<UserMsg & { coverImg: any }>({
  username: "",
  coverImg: "",
  introduce: "",
  email: "",
  id: ""
});
const formRef = ref();

const userInfo = computed(() => useUserInfoStore().userInfo);
const fileProxy = computed<UploaderFileListItem[]>({
  get: () => {
    return !userMsg.value.coverImg
      ? []
      : typeof userMsg.value.coverImg === "string"
      ? [{ url: userMsg.value.coverImg }]
      : ([userMsg.value.coverImg] as UploaderFileListItem[]);
  },
  set: (val: any) => {
    userMsg.value.coverImg = val[0] ? val[0] : null;
  }
});
const skipRouter = () => {
  router.push("/mine");
};
const getUserMsg = async () => {
  try {
    const res = await queryUserMsg({ userId: userInfo.value.id });
    userMsg.value = res;
  } catch (error) {
    // showNotify({ message: error });
  }
};
const handleSubmit = async () => {
  await formRef.value.validate();
  try {
    const formData = new FormData();
    formData.append(
      "coverImg",
      typeof userMsg.value.coverImg === "string"
        ? userMsg.value.coverImg
        : (userMsg.value.coverImg.file as File)
    );
    formData.append("username", userMsg.value.username);
    formData.append("email", userMsg.value.email);
    formData.append("introduce", userMsg.value.introduce);
    formData.append("userId", userMsg.value.id);
    const res = await updateUserMsg(formData);
    // console.log("!!!!", res);
    showNotify({ message: "保存成功", type: "primary" });
    const userInfo = useUserInfoStore().userInfo;
    useUserInfoStore().changeUserInfo({ ...userInfo, ...res });
    skipRouter();
  } catch (error: any) {
    console.log("!!!", error.message);
    showNotify({ message: error.message as string, type: "warning" });
  }
};
onMounted(async () => {
  await getUserMsg();
});
</script>
<template>
  <div class="setting">
    <div class="setting-header">
      <svg-icon
        class="icon"
        name="back"
        style="font-size: 28px"
        @click="skipRouter"
      />
      <span>编辑资料</span>
    </div>
    <div class="setting-coverImg">
      <van-uploader
        v-model="fileProxy"
        :max-count="1"
        reupload
        :deletable="false"
      />
    </div>
    <van-form ref="formRef">
      <van-field
        v-model="userMsg.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写' }]"
      />
      <van-field
        v-model="userMsg.id"
        name="id"
        :disabled="true"
        label="账号ID"
        placeholder="账号ID"
        :rules="[{ required: true, message: '请填写' }]"
      />
      <van-field
        v-model="userMsg.introduce"
        name="introduce"
        label="简介"
        placeholder="简介"
        :maxlength="30"
        :rules="[{ required: true, message: '请填写' }]"
      />
      <van-field
        v-model="userMsg.email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[
          { required: true, message: '请填写' },
          {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: '请输入正确邮箱'
          }
        ]"
      />
    </van-form>
    <div class="setting-bottomBtn">
      <van-button block native-type="submit" @click="handleSubmit">
        保存
      </van-button>
      <van-button block type="danger" native-type="submit">
        退出登录
      </van-button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.setting {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  overflow: auto;
  &-header {
    font-size: 16px;
    width: 100%;
    text-align: center;
    margin-block: 16px;
    .icon {
      float: left;
    }
  }
  &-coverImg {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-block: 12px;
    :deep(.van-image) {
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
  }
  &-bottomBtn {
    padding-inline: 18px;
    margin-top: 32px;
    button {
      margin-block: 12px;
    }
  }
}
</style>
