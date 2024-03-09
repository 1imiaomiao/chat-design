<script setup lang="ts">
import { ref, computed } from "vue";
import type { UploaderFileListItem } from "vant";
import type { BlogCreate } from "@/api/blogAbout";
import { createBlogApi } from "@/api/blogAbout";
import { useUserInfoStoreHook } from "@/store/modules/userInfo";
import { showNotify } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
const blogMsg = ref<BlogCreate>({
  coverImg: null,
  title: "",
  content: ""
});

const formRef = ref();

const userInfo = computed(() => useUserInfoStoreHook().userInfo);
const fileProxy = computed<UploaderFileListItem[]>({
  get: () => {
    return !blogMsg.value.coverImg
      ? []
      : ([blogMsg.value.coverImg] as UploaderFileListItem[]);
  },
  set: (val: any) => {
    blogMsg.value.coverImg = val[0] ? val[0] : null;
  }
});
const handleCreateArticle = async () => {
  await formRef.value.validate();
  try {
    const formData = new FormData();
    if (blogMsg.value.coverImg)
      formData.append("coverImg", blogMsg.value.coverImg.file as File);
    formData.append("title", blogMsg.value.title);
    formData.append("content", blogMsg.value.content);
    formData.append("userId", userInfo.value.id);
    await createBlogApi(formData);
    showNotify({ message: "发布成功！" });
    router.back();
  } catch (error) {
    console.log("error", error);
  }
};
defineExpose({
  formRef,
  blogMsg,
  handleCreateArticle
});
</script>
<template>
  <van-form ref="formRef">
    <van-field name="coverImg" class="edit-upload">
      <template #input>
        <van-uploader :max-count="1" v-model="fileProxy" result-type="file" />
      </template>
    </van-field>

    <div class="edit-title">
      <van-field
        v-model="blogMsg.title"
        placeholder="请输入标题（20）"
        style="font-size: 20px"
        name="title"
        :rules="[{ required: true, message: '请填写标题' }]"
      />
    </div>
    <van-divider />
    <div class="edit-text">
      <van-field
        v-model="blogMsg.content"
        placeholder="添加正文"
        type="textarea"
        rows="4"
        autosize
        name="content"
        :rules="[{ required: true, message: '请填写' }]"
      />
    </div>
  </van-form>
</template>
<style lang="less" scoped>
.edit-upload {
  :deep(.van-uploader__upload) {
    width: 180px;
    height: 180px;
    border-radius: 10px;
  }
  :deep(.van-uploader__preview-image) {
    width: 180px;
    height: 180px;
    border-radius: 10px;
  }
}
</style>
