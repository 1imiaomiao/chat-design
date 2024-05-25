<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserInfoStore } from "@/store/modules/userInfo";
import { showNotify } from "vant";
import { getBlogDetailApi, aiChatApi } from "@/api/blogAbout";

interface Content {
  type: "question" | "answer";
  val: string;
}
const route = useRoute();
const router = useRouter();

const content = ref("");
const title = ref("");
const questionVal = ref("");
const contentList = ref<Content[]>([]);
const loading = ref(false);

const id = computed(() => route.query.id as string);
const userInfo = computed(() => useUserInfoStore().userInfo);

const queryAi = async () => {
  try {
    const contentVal = `请根据${content.value} ,回答：${questionVal.value}`;
    contentList.value.push({
      type: "question",
      val: questionVal.value
    });
    loading.value = true;
    questionVal.value = "";
    const res = await aiChatApi(contentVal);
    contentList.value.push({
      type: "answer",
      val: (res as string) || "网络错误！"
    });
  } catch (error) {
    showNotify({ type: "danger", message: "网络错误" });
  } finally {
    loading.value = false;
  }
};
const backRouter = () => {
  router.back();
};
const getBlogDetail = async () => {
  try {
    const res = await getBlogDetailApi({
      articleId: id.value,
      browseId: userInfo.value.id
    });
    content.value = res.content;
    title.value = res.title;
  } catch (error: any) {
    showNotify(error.message);
    console.log(error, "err...");
  }
};
onMounted(() => {
  getBlogDetail();
});
</script>

<template>
  <div class="container">
    <div class="header">
      <svg-icon name="back" class="icon" @click="backRouter"></svg-icon>
      <span>AI解读 {{ title }}</span>
    </div>
    <div class="content-body">
      <div class="answer">
        你好，我是政策解读大模型，你可以向我提问关于{{ title }}不懂的问题哦！
      </div>
      <div v-for="(item, index) in contentList" :key="index" :class="item.type">
        {{ item.val }}
      </div>
      <van-loading color="#1989fa" v-if="loading" />
      <!-- <div class="question">
        电动汽车供链的变化对汽车行业的未来趋势有何影响？
      </div> -->
    </div>
    <input
      type="text"
      placeholder="请输入你的问题"
      class="questionInput"
      v-model="questionVal"
      @keydown.enter="queryAi"
    />
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100%;
  font-family: Arial, sans-serif;
  padding: 16px;
}

.header {
  font-size: 13px;
  color: #999;
  font-weight: bold;
  margin-bottom: 16px;
  height: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  .icon {
    width: 24px;
    height: 24px;
  }
}
.content-body {
  height: calc(100% - 140px);
  overflow: auto;
}
.body {
  font-size: 14px;
  margin-bottom: 16px;
}

.body p {
  margin-bottom: 8px;
}

.body ul {
  list-style: none;
  padding: 0;
}

.body li {
  margin-bottom: 8px;
}

.question {
  background-color: #007bff;
  color: white;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.answer {
  font-size: 14px;
  margin-bottom: 16px;
  background: #f7f8fa;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.questionInput {
  width: calc(100% - 16px);
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  position: fixed;
  height: 36px;
  bottom: 60px;
  left: 8px;
}
</style>
