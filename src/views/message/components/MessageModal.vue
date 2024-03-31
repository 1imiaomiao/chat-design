<script setup lang="ts">
import { ref, computed } from "vue";
import { useMessageInfoStore } from "@/store/modules/message";
import { useRouter } from "vue-router";

const router = useRouter();
const open = ref(false);
const type = ref<"like" | "comment">("like");

const likeList = computed(() => useMessageInfoStore().likeMessageList);
const commentList = computed(() => useMessageInfoStore().commentMessageList);
const activeList = computed(() =>
  type.value === "like" ? likeList.value : commentList.value
);

const initModal = (val: "like" | "comment") => {
  type.value = val;
  open.value = true;
  if (val === "like") useMessageInfoStore().checkLikeMessage();
  else useMessageInfoStore().checkCommentMessage();
};
const skipBlogDetail = (id: string) => {
  router.push({
    name: "BlogDetail",
    query: { id }
  });
};
defineExpose({ initModal });
</script>
<template>
  <van-popup v-model:show="open" position="bottom" :style="{ height: '45%' }">
    <div
      class="message"
      v-for="(item, index) in activeList"
      :key="index"
      @click="skipBlogDetail(item.blogId)"
    >
      <div class="message-header">
        <img :src="item.coverImg" /><span>{{ item.username }}</span>
      </div>
      <div class="message-content">
        <span v-if="type === 'like' && item.type === 'blog'"
          >点赞了你的博客 {{ item.blogTitle }}</span
        >
        <span v-else-if="type === 'like'">
          在博客{{ item.blogTitle }}中点赞了你的评论{{ item.content }}
        </span>
        <span v-else> 在博客{{ item.blogTitle }}中评论了你 </span>
        <!-- {{ item.blogTitle && `在博客${item.blogTitle}中` }}
        {{
          type === "like"
            ? `点赞了${item.type === "blog" ? "你的博客" : "你的评论"}`
            : `评论了：${item.content}`
        }} -->
      </div>
      <van-divider v-show="index !== activeList.length - 1" />
      <van-divider v-show="index === activeList.length - 1"
        >注意：仅展示当天的消息</van-divider
      >
    </div>
    <van-empty description="今天暂无消息" v-if="activeList.length === 0" />
  </van-popup>
</template>
<style lang="less" scoped>
.message {
  width: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
  .message-header {
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
    img {
      width: 32px;
      height: 32px;
      border-radius: 100%;
    }
  }
  .message-content {
    color: #999;
  }
}
</style>
