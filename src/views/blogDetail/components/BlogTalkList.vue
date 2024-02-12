<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { TalkDetail } from "@/api/blogAbout";
import { getBlogTalkDetailApi } from "@/api/blogAbout";
const initPageInfo = {
  pageNo: 0,
  pageSize: 10,
  total: 0
};
interface Props {
  id: string;
}
const props = defineProps<Props>();

const talkList = ref<TalkDetail[]>([]);
const editRef = ref();
const talkEditVal = ref("");
const pageInfo = ref({ ...initPageInfo });

const getTalkList = async () => {
  try {
    const res = await getBlogTalkDetailApi({ id: props.id });
    talkList.value = res.list;
    pageInfo.value.total = res.total;
  } catch (error) {
    console.log(error, "err...");
  }
};
const addTalk = () => {
  console.log("klklklkl.。。。", talkEditVal.value);
  const temp = {
    likeNum: 0,
    content: talkEditVal.value,
    authorName: "temp..",
    createTime: "2024-10-09",
    likeStatus: 0,
    id: "",
    authorAvatar: ""
  };
  talkList.value.unshift(temp);
  talkEditVal.value = "";
  editRef.value.blur();
};
const handleClickTalkLike = (item: any) => {
  if (item.likeStatus === 1) {
    item.likeStatus = 0;
    item.likeNum--;
    return;
  }
  item.likeStatus = 1;
  item.likeNum++;
  console.log("点赞....");
};
onMounted(() => {
  getTalkList();
});
</script>
<template>
  <div class="talk">
    <div class="talk-header">评论({{ pageInfo.total }})</div>
    <div class="talk-list" v-for="item in talkList" :key="item.id">
      <div class="talk-list-header">
        <div class="talk-list-header-left">
          <img src="@/assets/image/avatar_img.jpg" />
          {{ item.authorName }}
        </div>
        <div class="talk-list-header-right" @click="handleClickTalkLike(item)">
          <svg-icon
            :class="{ 'active-zan': item.likeStatus === 1 }"
            name="zan"
          />
          <span>{{ item.likeNum }}</span>
        </div>
      </div>
      <div class="talk-list-content">
        <div>{{ item.content }}</div>
        <div class="talk-list-content-time">{{ item.createTime }}</div>
      </div>
    </div>
    <div class="talk-edit">
      <van-field
        v-model="talkEditVal"
        ref="editRef"
        border
        placeholder="输入评论"
        class="talk-edit-input"
        @keydown.enter="addTalk"
      >
        <template #right-icon>
          <svg-icon style="color: #999" name="edit" />
        </template>
      </van-field>
    </div>
  </div>
</template>
<style lang="less" scoped>
.talk {
  overflow: visible;
  &-header {
    color: #999;
    margin-bottom: 12px;
  }
  &-list {
    &-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
      &-left {
        img {
          width: 32px;
          height: 32px;
          border-radius: 100%;
          margin-right: 10px;
        }
        display: flex;
        align-items: center;
      }
      &-right {
        color: #999;
        font-weight: 800;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .active-zan {
        color: #fd6b21;
      }
    }
    &-content {
      margin-left: 42px;
      margin-bottom: 12px;
      &-time {
        color: #999;
        font-size: 14px;
      }
    }
  }
  &-edit {
    position: sticky;
    bottom: 50px;
    background: #fff;
    opacity: 1;
    box-sizing: border-box;
    padding-inline: 16px;
    padding-bottom: 8px;
    left: 0px;
    width: 100%;
    z-index: 1;
    &-input {
      width: 100%;
      border: 1px solid #999;
      border-radius: 8px;
    }
  }
}
</style>
