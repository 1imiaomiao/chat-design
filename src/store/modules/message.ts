// stores/counter.js
import { defineStore } from "pinia";

// 私信
export interface ChatMessage {
  id: string; //发言id
  receiverId: string;
  content: string;
  senderId: string;
  createdAt: Date | string;
  roomId: string;
  coverImg?: string;
  username?: string;
}
export interface LikeMessage {
  username: string;
  userId: string;
  type: "blog" | "comment"; // 博客|评论
  coverImg: string;
  blogId: string; //被点赞的博客id
  blogTitle: string;
  content: string; // 点赞的内容
}
export interface CommentMessage {
  username: string;
  userId: string;
  coverImg: string;
  blogId: string;
  content: string;
  blogTitle: string;
}
export const useMessageInfoStore = defineStore("message", {
  state: () => {
    return {
      chatMessage: null as ChatMessage | null,
      likeMessageList: sessionStorage.getItem("LIKEMESSAGE")
        ? JSON.parse(sessionStorage.getItem("LIKEMESSAGE") as string)
        : ([] as LikeMessage[]),
      commentMessageList: sessionStorage.getItem("COMMENTMESSAGE")
        ? JSON.parse(sessionStorage.getItem("COMMENTMESSAGE") as string)
        : ([] as CommentMessage[]),
      chatStatusMap: new Map() as Map<string | number, 1>,
      likeMessageCount: sessionStorage.getItem("LIKECOUNT")
        ? JSON.parse(sessionStorage.getItem("LIKECOUNT") as string)
        : 0,
      commentMessageCount: sessionStorage.getItem("COMMENTCOUNT")
        ? JSON.parse(sessionStorage.getItem("COMMENTCOUNT") as string)
        : 0
    };
  },
  actions: {
    acceptLikeMessage(data: LikeMessage | LikeMessage[]) {
      if (Array.isArray(data)) {
        this.likeMessageCount = data.length;
        this.likeMessageList = data;
      } else {
        this.likeMessageList.push(data);
        this.likeMessageCount++;
      }
      sessionStorage.setItem(
        "LIKEMESSAGE",
        JSON.stringify(this.likeMessageList)
      );
      sessionStorage.setItem(
        "LIKECOUNT",
        JSON.stringify(this.likeMessageCount)
      );
    },
    acceptCommentMessage(data: CommentMessage | CommentMessage[]) {
      if (Array.isArray(data)) {
        this.commentMessageCount = data.length;
        this.commentMessageList = data;
      } else {
        this.commentMessageList.push(data);
        this.commentMessageCount++;
      }
      sessionStorage.setItem(
        "COMMENTMESSAGE",
        JSON.stringify(this.commentMessageList)
      );
      sessionStorage.setItem(
        "COMMENTCOUNT",
        JSON.stringify(this.commentMessageCount)
      );
    },
    acceptChatMessage(data: ChatMessage) {
      this.chatMessage = data;
      this.chatStatusMap.set(data.senderId, 1);
    },
    checkChatMessage(senderId: string) {
      this.chatStatusMap.delete(senderId);
      if (senderId === this.chatMessage?.senderId) this.chatMessage = null;
    },
    checkLikeMessage() {
      this.likeMessageCount = 0;
      sessionStorage.setItem(
        "LIKECOUNT",
        JSON.stringify(this.likeMessageCount)
      );
    },
    checkCommentMessage() {
      this.commentMessageCount = 0;
      sessionStorage.setItem(
        "COMMENTCOUNT",
        JSON.stringify(this.commentMessageCount)
      );
    }
  }
});
