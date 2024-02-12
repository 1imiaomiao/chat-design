<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import dayjs from "dayjs";
import type { BlogDetail } from "@/api/blogAbout";
const fileList = ref();
const blogMsg = ref<BlogDetail>({
  coverImg: "",
  authorId: "",
  title: "",
  description: "",
  tag: "",
  createTime: dayjs().format("YYYY-MM-DD")
});
const formRef = ref();
const fileProxy = computed({
  get: () => {
    return blogMsg.value.coverImg === "" ? [] : [blogMsg.value.coverImg];
  },
  set: val => {
    blogMsg.value.coverImg = val[0];
  }
});
defineExpose({
  formRef,
  blogMsg
});
</script>
<template>
  <van-form ref="formRef">
    <van-field
      name="coverImg"
      class="edit-upload"
      :rules="[{ required: true, message: '请上传封面' }]"
    >
      <template #input>
        <van-uploader v-model="fileProxy" :max-count="1" />
      </template>
    </van-field>

    <!-- <div class="edit-upload">
      <van-uploader v-model="fileProxy" maxlength="20" reupload max-count="1" />
    </div> -->
    <div class="edit-title">
      <van-field
        v-model="blogMsg.title"
        placeholder="请输入标题（20）"
        style="font-size: 20px"
        :rules="[{ required: true, message: '请填写标题' }]"
      />
    </div>
    <van-divider />
    <div class="edit-text">
      <van-field
        v-model="blogMsg.description"
        placeholder="添加正文"
        type="textarea"
        rows="4"
        autosize
        :rules="[{ required: true, message: '请填写正文' }]"
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
