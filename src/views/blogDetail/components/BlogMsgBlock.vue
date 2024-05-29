<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { BlogDetail } from "@/api/blogAbout";
import { getBlogDetailApi } from "@/api/blogAbout";
import { changeLikeStatusApi } from "@/api/userMsg";
import { useRouter } from "vue-router";
import { showNotify } from "vant";
import dayjs from "dayjs";
import { useUserInfoStore } from "@/store/modules/userInfo";

// import VueMarkdown from "vue-markdown";

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
const skipAi = () => {
  router.push({
    name: "AiChat",
    query: { id: props.id }
  });
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
    <!-- <vue-markdown :source="blogDetail.content"></vue-markdown> -->
    <div class="blogDetail-otherMsg">
      <div
        class="blogDetail-otherMsg-like"
        :class="{ 'active-like': blogDetail.likeStatus === 1 }"
        @click="handleClikeLike"
      >
        <svg-icon name="like" />
        {{ blogDetail.likeCount }}
      </div>
      <div class="blogDetail-otherMsg-time">
        {{ dayjs(blogDetail.createdAt).format("YYYY-MM-DD HH:mm") }}
      </div>
    </div>
  </div>
  <van-floating-bubble
    axis="xy"
    icon="chat"
    magnetic="x"
    @click="skipAi"
    v-if="!blogDetail.coverImg"
  />
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
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
      0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
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
