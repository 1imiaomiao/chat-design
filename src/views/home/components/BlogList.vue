<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { BlogMsg } from "@/api/userMsg";
import { useRouter } from "vue-router";
import { getBlogListApi, getLikeListApi } from "@/api/userMsg";

interface Props {
  userId: string;
}
const props = defineProps<Props>();
const router = useRouter();
const initPageInfo = {
  pageNo: 1,
  pageSize: 10,
  total: 0
};
const activeType = ref("like");
const blogList = ref<BlogMsg[]>([]);
const pageInfo = ref({ ...initPageInfo });
const getLikeList = async () => {
  try {
    const res = await getLikeListApi({
      id: props.userId,
      pageNo: pageInfo.value.pageNo++,
      pageSize: pageInfo.value.pageSize
    });
    blogList.value.push(...res.list);
  } catch (error) {
    console.log("error", error);
  }
};
const getBlogList = async () => {
  try {
    const res = await getBlogListApi({
      id: props.userId,
      pageNo: pageInfo.value.pageNo++,
      pageSize: pageInfo.value.pageSize
    });
    blogList.value.push(...res.list);
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
const changeLikeState = (val: BlogMsg) => {
  const temp = blogList.value.find(ele => ele.id === val.id);
  if (temp) temp.likeStatus = temp.likeStatus === 0 ? 1 : 0;
  console.log(">>>>>改变喜欢状态...", temp?.likeStatus);
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
  <div class="blogList">
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
        <img src="@/assets/image/blog_cover.jpg" class="cover-img" />
        <div>
          <div class="mb-8px">{{ item.title }}</div>
          <div class="flex" style="justify-content: space-between">
            <div class="flex items-center gap-[8px]">
              <img
                src="@/assets/image/avatar_img.jpg"
                class="w-[24px] h-[24px]"
              />
              <span>{{ item.authorName }}</span>
            </div>
            <div style="color: #999" class="flex gap-[8px] items-center">
              <svg-icon
                name="like"
                :class="{ 'active-like': item.likeStatus === 1 }"
                @click.stop="changeLikeState(item)"
              />
              <span> {{ item.likeNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.blogList {
  width: 100%;
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
