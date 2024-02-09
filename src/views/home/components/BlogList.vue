<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
const activeName = ref("like");
import type { BlogMsg } from "@/api/userMsg";
import { getBlogListApi } from "@/api/userMsg";
interface Props {
  userId: string;
}
const props = defineProps<Props>();
const blogList = ref<BlogMsg[]>([]);

const getBlogList = async () => {
  try {
    const res = await getBlogListApi({ id: props.userId });
    blogList.value = res.list;
  } catch (error) {
    console.log("error", error);
  }
};
onMounted(() => {
  getBlogList();
});
</script>
<template>
  <div class="blogList">
    <div class="blogList-head">
      <span :class="{ 'blogList-head-active': activeName === 'like' }"
        >点赞</span
      >
      <span :class="{ 'blogList-head-active': activeName === 'content' }"
        >最近博客</span
      >
      <span class="blogList-head-right">查看全部</span>
    </div>
    <div class="blogList-list">
      <div class="blogList-list-item" v-for="item in blogList" :key="item.id">
        <div class="flex flex-justify-between w-full" style="color: #949aa9">
          <img
            src="@/assets/image/blog_cover.jpg"
            class="w-[72px] h-[72px] mr-[12px]"
            style="border-radius: 8px"
          />
          <div class="flex flex-col mb-[8px]">
            <div>{{ item.tag }}</div>
            <div style="color: #000; font-weight: 700">{{ item.title }}</div>
            <div>{{ item.creatTime }}</div>
          </div>
        </div>
        <div style="color: #949aa9" class="text-overflow">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.blogList {
  background: #f2f2f2;
  &-head {
    display: flex;
    justify-content: start;
    gap: 8px;
    color: #999;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
    &-active {
      color: #000;
    }
    &-right {
      justify-self: right;
      color: #01b27d;
    }
  }
  &-list {
    height: calc(100% - 36px - 50px);
    box-sizing: border-box;
    padding: 8px 12px;
    display: flex;
    gap: 12px;
    overflow: auto;
    &-item {
      width: 240px;
      height: 90%;
      border-radius: 8px;
      background: #fff;
      flex-shrink: 0;
      padding: 8px 12px;
      box-sizing: border-box;
    }
  }
  //   &-list ::-webkit-scrollbar {
  //     display: none; /* Chrome Safari */
  //   }
  .text-overflow {
    overflow: hidden;

    text-overflow: ellipsis; //文本溢出显示省略号

    display: -webkit-box;

    -webkit-line-clamp: 4;

    -webkit-box-orient: vertical;

    width: 100%;
  }
}
</style>
