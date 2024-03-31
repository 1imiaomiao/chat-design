<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { BlogDetail } from "@/api/blogAbout";
import { getBlogDetailApi } from "@/api/blogAbout";
import { changeLikeStatusApi } from "@/api/userMsg";
import { useRouter } from "vue-router";
import { showNotify } from "vant";
import { useUserInfoStore } from "@/store/modules/userInfo";

interface Props {
  id: string;
}
const router = useRouter();
const props = defineProps<Props>();
const blogDetail = ref<BlogDetail>({
  coverImg: "",
  authorName: "",
  userAvatar: "",
  title: "",
  content: "",
  likeCount: 0,
  talkCount: 0,
  likeStatus: 0,
  createdAt: "",
  id: "",
  authorId: ""
});
const userInfo = computed(() => useUserInfoStore().userInfo);

const getBlogDetail = async () => {
  try {
    const res = await getBlogDetailApi({
      articleId: props.id,
      browseId: userInfo.value.id
    });
    blogDetail.value = res;
  } catch (error: any) {
    showNotify(error.message);
    console.log(error, "err...");
  }
};
const handleClikeLike = async () => {
  if (blogDetail.value.likeStatus === 1) {
    await changeLikeStatusApi({
      articleId: props.id,
      userId: userInfo.value.id,
      likeStatus: 0
    });
    blogDetail.value.likeStatus = 0;
    blogDetail.value.likeCount--;
  } else {
    await changeLikeStatusApi({
      articleId: props.id,
      userId: userInfo.value.id,
      likeStatus: 1
    });
    blogDetail.value.likeStatus = 1;
    blogDetail.value.likeCount++;
  }
};
const skipRouterBack = () => {
  router.back();
};

const skipPersonHome = () => {
  router.push({
    path: "/mine",
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
      <img :src="blogDetail.userAvatar" @click="skipPersonHome" />
      <span>{{ blogDetail.authorName }}</span>
    </div>
    <img class="blogDetail-cover" :src="blogDetail.coverImg" />
    <div class="blogDetail-title">{{ blogDetail.title }}</div>
    <div class="blogDetail-text">{{ blogDetail.content }}</div>
    <div class="blogDetail-otherMsg">
      <div
        class="blogDetail-otherMsg-like"
        :class="{ 'active-like': blogDetail.likeStatus === 1 }"
        @click="handleClikeLike"
      >
        <svg-icon name="like" />
        {{ blogDetail.likeCount }}
      </div>
      <div class="blogDetail-otherMsg-time">{{ blogDetail.createdAt }}</div>
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
    max-height: 320px;
    object-fit: cover;
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
