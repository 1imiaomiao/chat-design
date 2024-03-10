<script setup lang="ts">
import { ref, toRefs, onMounted, computed, watchEffect } from "vue";
import type { BlogMsg } from "@/api/userMsg";
import { useRouter } from "vue-router";
import {
  getBlogListApi,
  getLikeListApi,
  changeLikeStatusApi
} from "@/api/userMsg";
import { useUserInfoStore } from "@/store/modules/userInfo";
// import { vScroll } from "@vueuse/components";
import { useScroll } from "@vueuse/core";
import { showNotify } from "vant";
// import { useInfiniteScroll } from "@vueuse/core";

interface Props {
  userId: string;
}
const props = defineProps<Props>();
const router = useRouter();
const initPageInfo = {
  pageNo: 1,
  pageSize: 5,
  total: 0
};
const activeType = ref<"like" | "content">("like");
const blogList = ref<BlogMsg[]>([]);
const pageInfo = ref({ ...initPageInfo });
const el = ref<HTMLElement>();
const { arrivedState, directions } = useScroll(el);
const { bottom } = toRefs(arrivedState);
const { bottom: toBottom } = toRefs(directions);

watchEffect(async () => {
  if (
    bottom.value &&
    toBottom.value &&
    pageInfo.value.total !== blogList.value.length
  ) {
    if (activeType.value === "content") await getBlogList();
    else getLikeList();
  }
});

const userMsg = computed(() => useUserInfoStore().userInfo);

const getLikeList = async () => {
  try {
    const res = await getLikeListApi({
      userId: props.userId // 查看的博文列表作者的id
    });
    blogList.value.push(...res.list);
    pageInfo.value.total = res.total;
  } catch (error) {
    console.log("error", error);
  }
};
const getBlogList = async () => {
  try {
    const res = await getBlogListApi({
      userId: props.userId, // 查看的博文列表作者的id
      browseId: userMsg.value.id, //浏览者的id
      pageNo: pageInfo.value.pageNo++,
      pageSize: pageInfo.value.pageSize
    });
    blogList.value.push(...res.list);
    pageInfo.value.total = res.total;
  } catch (error) {
    console.log("error", error);
  }
};
const requestBlogList = () => {
  blogList.value = [];
  pageInfo.value = { ...initPageInfo };
  if (activeType.value === "like") getLikeList();
  else getBlogList();
};
const changeLikeState = async (temp: BlogMsg) => {
  console.log(">>>>", temp);
  if (temp.likeStatus === 1) {
    try {
      await changeLikeStatusApi({
        articleId: temp.id,
        userId: userMsg.value.id,
        likeStatus: 0
      });
      temp.likeCount--;
      temp.likeStatus = 0;
    } catch (error: any) {
      showNotify({ message: error.message, type: "warning" });
    }
  } else {
    console.log(">>>>", temp);
    try {
      await changeLikeStatusApi({
        articleId: temp.id,
        userId: userMsg.value.id,
        likeStatus: 1
      });
      temp.likeCount++;
      temp.likeStatus = 1;
    } catch (error: any) {
      showNotify({ message: error.message, type: "warning" });

      // showNotify({ message: error, type: "warning" });
      console.log("error", error);
    }
  }
};
const skipBlogDetail = (id: string) => {
  router.push({
    path: "/blogDetail",
    query: { id }
  });
};
onMounted(() => {
  requestBlogList();
});
</script>
<template>
  <div class="blogList" ref="el">
    <van-tabs
      v-model:active="activeType"
      class="blogList-head"
      @change="requestBlogList"
    >
      <van-tab title="喜欢" name="like"></van-tab>
      <van-tab title="动态" name="content"></van-tab>
    </van-tabs>
    <div class="blogList-imgs">
      <div
        class="blogList-imgs-item"
        v-for="item in blogList"
        :key="item.id"
        @click="skipBlogDetail(item.id)"
      >
        <img :src="item.coverImg" class="cover-img" />
        <div>
          <div class="mb-8px">{{ item.title }}</div>
          <div class="flex" style="justify-content: space-between">
            <div class="flex items-center gap-[8px]">
              <img
                :src="item.userAvatar"
                style="border-radius: 100%"
                class="w-[24px] h-[24px]"
              />
              <span>{{ item.authorName }}</span>
            </div>
            <div
              style="color: #999"
              class="flex gap-[8px] items-center"
              @click.stop="changeLikeState(item)"
            >
              <svg-icon
                name="like"
                :class="{ 'active-like': item.likeStatus === 1 }"
              />
              <span> {{ item.likeCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-if="!blogList.length" description="暂无数据~" />
    <p
      v-else-if="blogList.length >= pageInfo.total"
      style="color: #999; text-align: center"
    >
      到底了~
    </p>
  </div>
</template>
<style lang="less" scoped>
.blogList {
  width: 100%;
  max-height: calc(100% - 180px);
  overflow: auto;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fff;
  &-head {
    :deep(.van-tabs__wrap) {
      height: 24px;
      margin-bottom: 12px;
    }
  }
  &-imgs {
    column-count: 2;
    gap: 8px;
    flex-wrap: nowrap;
    &-item {
      position: relative;
      margin-bottom: 8px;
      break-inside: avoid;
      .cover-img {
        width: 100%;
        min-height: 180px;
        max-height: 240px;
        border-radius: 8px;
      }
      .active-like {
        color: red;
      }
    }
  }
}
</style>
