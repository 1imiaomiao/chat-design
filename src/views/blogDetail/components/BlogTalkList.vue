<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { TalkDetail } from "@/api/blogAbout";
import {
  getBlogTalkDetailApi,
  queryBlogTalkApi,
  changeTalkLikeStatus
} from "@/api/blogAbout";
import { useUserInfoStore } from "@/store/modules/userInfo";
import dayjs from "dayjs";

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
const activeTalkId = ref<string | number>("-1");
const replayUserId = ref<string>();

const userInfo = computed(() => useUserInfoStore().userInfo);

const getTalkList = async (parentId: string = "-1") => {
  try {
    const res = await getBlogTalkDetailApi({
      articleId: props.id,
      parentId,
      userId: userInfo.value.id
    });
    return res;
  } catch (error) {
    console.log(error, "err...");
  }
};
const handleShowComment = async (talkMsg: TalkDetail) => {
  console.log(talkMsg.id);
  talkMsg.sonComment = await getTalkList(talkMsg.id);
};
const addTalk = async () => {
  try {
    const id = await queryBlogTalkApi({
      articleId: props.id,
      userId: userInfo.value.id,
      content: talkEditVal.value,
      parentId: activeTalkId.value,
      replayUserId: replayUserId.value || -1
    });
    const temp = {
      likeCount: 0,
      userId: userInfo.value.id,
      content: talkEditVal.value,
      username: userInfo.value.username,
      createdAt: new Date(),
      likeStatus: 0,
      id,
      coverImg: userInfo.value.coverImg,
      talkCount: 0
    };
    // 顶级评论回复
    if (activeTalkId.value == "-1") {
      talkList.value.unshift(temp as TalkDetail);
      return;
    }
    // 盖楼的评论...
    const commentObj = talkList.value.find(
      item => item.id == activeTalkId.value
    );
    await handleShowComment(commentObj as unknown as TalkDetail);
  } catch (error: any) {
    console.log(">>>>", error);
  } finally {
    talkEditVal.value = "";
    editRef.value.blur();
  }
};
// const changeLikeComment = async (params: Object) => {
//   try {
//     await changeTalkLikeStatus(params);
//   } catch (error) {
//     console.log("error", error);
//     showNotify(error);
//     return Promise.reject(error);
//   }
// };
// 添加评论，唤醒键盘
const handleWeakUpTalk = (id: string, userId?: string) => {
  activeTalkId.value = id;
  replayUserId.value = userId;
  editRef.value.focus();
};
const handleClickTalkLike = async (item: any) => {
  if (item.likeStatus === 1) {
    try {
      await changeTalkLikeStatus({
        userId: userInfo.value.id,
        talkId: item.id,
        status: 0,
        commenterId: item.userId
      });
      item.likeStatus = 0;
      item.likeCount--;
    } catch (error) {
      console.log("error", error);
    }
    return;
  }
  try {
    await changeTalkLikeStatus({
      userId: userInfo.value.id,
      id: item.id,
      status: 1
    });
    item.likeStatus = 1;
    item.likeCount++;
  } catch (error) {
    console.log("error", error);
  }
};
onMounted(async () => {
  talkList.value = await getTalkList();
});
</script>
<template>
  <div class="talk">
    <div class="talk-header">评论({{ pageInfo.total }})</div>
    <div class="talk-list" v-for="item in talkList" :key="item.id">
      <div class="talk-list-header">
        <div class="talk-list-header-left">
          <img :src="item.coverImg" />
          {{ item.username }}
        </div>
        <div
          class="talk-list-header-right"
          @click="handleClickTalkLike(item)"
          :class="{ 'active-zan': item.likeStatus === 1 }"
        >
          <svg-icon name="zan" />
          <span>{{ item.likeCount }}</span>
        </div>
      </div>
      <div class="talk-list-content">
        <div @click.stop="handleWeakUpTalk(item.id)">{{ item.content }}</div>
        <div class="talk-list-content-time">
          {{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </div>
        <van-divider
          v-if="item.talkCount && !item.sonComment"
          @click.stop="handleShowComment(item)"
          >点击展开{{ item.talkCount }}条评论</van-divider
        >
        <!-- 子评论 -->
        <div
          class="talk-list mt-[12px]"
          v-for="sonCommentItem in item?.sonComment || []"
          :key="sonCommentItem.id"
        >
          <div class="talk-list-header">
            <div class="talk-list-header-left">
              <img :src="sonCommentItem.coverImg" />
              {{ sonCommentItem.username }}
              <span
                style="color: #999; margin-inline: 8px"
                v-if="sonCommentItem.replayUser.username"
              >
                回复：用户{{ sonCommentItem.replayUser.username }}
              </span>
            </div>
            <div
              class="talk-list-header-right"
              :class="{ 'active-zan': sonCommentItem.likeStatus === 1 }"
              @click="handleClickTalkLike(sonCommentItem)"
            >
              <svg-icon name="zan" />
              <span>{{ sonCommentItem.likeCount }}</span>
            </div>
          </div>
          <div class="talk-list-content">
            <div @click.stop="handleWeakUpTalk(item.id, sonCommentItem.userId)">
              {{ sonCommentItem.content }}
            </div>
            <div class="talk-list-content-time">
              {{ sonCommentItem.createdAt }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-if="!talkList.length" description="暂无评论" />
    <div class="talk-edit">
      <van-field
        v-model="talkEditVal"
        ref="editRef"
        border
        placeholder="输入评论"
        class="talk-edit-input"
        @click="activeTalkId = -1"
        @keydown.enter="addTalk()"
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
        align-items: end;
        display: flex;
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
