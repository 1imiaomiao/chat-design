<script setup lang="ts" name="Home">
import { ref, toRefs, onMounted, computed, watchEffect } from "vue";
import type { BlogMsg } from "@/api/userMsg";
import { useRouter } from "vue-router";
import {
  getBlogListApi,
  getLikeListApi,
  changeLikeStatusApi
} from "@/api/userMsg";
import { useUserInfoStore } from "@/store/modules/userInfo";
import { useScroll } from "@vueuse/core";
import { showNotify } from "vant";

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
const activeType = ref<"like" | "content">("content");
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
      type: "policy",
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
  getBlogList();
  // if (activeType.value === "like") getLikeList();
  // else getBlogList();
};
const changeLikeState = async (temp: BlogMsg) => {
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
      console.log("error", error);
    }
  }
};
const skipBlogDetail = (id: string) => {
  router.push({
    name: "BlogDetail",
    query: { id }
  });
};
onMounted(() => {
  requestBlogList();
});
</script>
<template>
  <div class="blogList">
    <div
      class="blogList-item"
      v-for="item in blogList"
      :key="item.id"
      @click="skipBlogDetail(item.id)"
    >
      <p>{{ item.title }}</p>
      <p class="desc">{{ item.content }}</p>
      <div class="otherMsg">
        <img
          :src="item.userAvatar"
          style="border-radius: 100%"
          class="w-[24px] h-[24px]"
        />
        <div>{{ item.authorName }}</div>
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
      <van-divider />
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
  max-height: calc(100vh - 60px);
  overflow: auto;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fff;
  .blogList-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
    .title {
      font-weight: 600;
    }
    .desc {
      overflow: hidden;
      color: #999;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      /* 设置宽度和高度 */
      width: 100%;
      height: 40px;
    }
    .otherMsg {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      align-content: center;
    }
    // border-bottom: 1px solid #999;
  }
  .active-like {
    color: red;
  }
}
</style>
