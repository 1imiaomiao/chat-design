<script setup lang="ts">
import { ref, reactive } from "vue";
import type { UserMsg } from "@/api/userMsg";
interface Props {
  userMsg: UserMsg;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="author">
    <div class="author-title">{{ props.userMsg.userName }}</div>
    <div class="flex justify-center">
      <img
        class="author-avatar"
        src="@/assets/image/avatar_img.jpg"
        alt="Grapefruit slice atop a pile of other slices"
      />
    </div>
    <div class="flex justify-center">
      <van-button plain type="success" class="w-[120px]">关注</van-button>
    </div>
    <div class="author-dataBoard">
      <div>
        <div class="author-dataBoard-number">{{ props.userMsg.blogNum }}</div>
        <div class="author-dataBoard-text">文章</div>
      </div>
      <div>
        <div class="author-dataBoard-number">
          {{ props.userMsg.attentionNum }}
        </div>
        <div class="author-dataBoard-text">点赞</div>
      </div>
      <div>
        <div class="author-dataBoard-number">
          {{ props.userMsg.commentNum }}
        </div>
        <div class="author-dataBoard-text">评论</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.author {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-block: 12px;
  gap: 24px;
  &-title {
    font-size: 24px;
    width: 100%;
    text-align: center;
  }
  &-avatar {
    width: 120px;
    height: 120px;
    border-radius: 100%;
  }
  &-dataBoard {
    display: flex;
    justify-content: center;
    gap: 36px;
    text-align: center;
    &-number {
      font-weight: 900;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
}
</style>
