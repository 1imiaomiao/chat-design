import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Mine from "@/views/mine/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Mine" },
    children: [
      {
        path: "mine",
        name: "Mine",
        component: Mine,
        meta: {
          title: "主页"
        }
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "工具"
        }
      },
      {
        path: "message",
        name: "Message",
        component: () => import("@/views/message/index.vue"),
        meta: {
          title: "私信",
          noCache: true
        }
      },
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "我的",
          noCache: true
        }
      },
      {
        path: "blog",
        name: "Blog",
        component: () => import("@/views/blogList/index.vue"),
        meta: {
          title: "博客",
          noCache: true
        }
      }
    ]
  }
];

export default routes;
