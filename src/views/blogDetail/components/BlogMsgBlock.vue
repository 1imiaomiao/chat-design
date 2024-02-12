<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { BlogDetail } from "@/api/blogAbout";
import { getBlogDetailApi } from "@/api/blogAbout";
import { useRouter } from "vue-router";

interface Props {
  id: string;
}
const router = useRouter();
const props = defineProps<Props>();
const blogDetail = ref<BlogDetail>({
  coverImg: "",
  authorName: "",
  authorAvatar: "",
  title: "",
  description: "",
  likeNum: 0,
  likeStatus: 0,
  tag: "",
  createTime: "",
  id: ""
});
const getBlogDetail = async () => {
  try {
    const res = await getBlogDetailApi({ id: props.id });
    blogDetail.value = res;
  } catch (error) {
    console.log(error, "err...");
  }
};
const handleClikeLike = () => {
  if (blogDetail.value.likeStatus === 1) {
    blogDetail.value.likeStatus = 0;
    blogDetail.value.likeNum--;
  } else {
    blogDetail.value.likeStatus = 1;
    blogDetail.value.likeNum++;
  }
};
const skipRouterBack = () => {
  router.back();
};
const skipPersonHome = () => {
  router.push({
    path: "/home",
    query: { id: blogDetail.value.authorId }
  });
};
onMounted(() => {
  getBlogDetail();
});
</script>
<template>
  <div class="blogDetail">
    <div class="blogDetail-header">
      <svg-icon name="back" @click="skipRouterBack" />
      <img src="@/assets/image/avatar_img.jpg" @click="skipPersonHome" />
      <span>{{ blogDetail.authorName }}</span>
    </div>
    <img class="blogDetail-cover" src="@/assets/image/blog_cover.jpg" />
    <div class="blogDetail-title">{{ blogDetail.title }}</div>
    <div class="blogDetail-text">{{ blogDetail.description }}</div>
    <div class="blogDetail-otherMsg">
      <div
        class="blogDetail-otherMsg-like"
        :class="{ 'active-like': blogDetail.likeStatus === 1 }"
        @click="handleClikeLike"
      >
        <svg-icon name="like" />
        {{ blogDetail.likeNum }}
      </div>
      <div class="blogDetail-otherMsg-time">{{ blogDetail.createTime }}</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.blogDetail {
  display: flex;
  flex-direction: column;
  gap: 8px;
  &-title {
    font-size: 15px;
    font-weight: 700;
  }
  &-text {
    color: #999;
  }
  &-cover {
    width: 100%;
    max-height: 240px;
    border-radius: 8px;
  }
  &-header {
    display: flex;
    gap: 8px;
    align-items: center;
    img {
      width: 32px;
      height: 32px;
      border-radius: 100%;
    }
  }
  &-otherMsg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-like {
      color: #999;
      font-weight: 800;
      display: flex;
      gap: 4px;
      align-items: center;
    }
    .active-like {
      color: #fd6b21;
    }
    &-time {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
