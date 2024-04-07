import { io } from "socket.io-client";
import {
  useMessageInfoStore,
  type LikeMessage,
  type CommentMessage,
  type ChatMessage
} from "@/store/modules/message";
import { useUserInfoStore } from "@/store/modules/userInfo";
const socket = io("https://www.0637.top");
export type event = "chat" | "comment" | "like" | "follow";
export interface Message {
  receiverId: string;
  senderId: string;
  event: event;
  message: null | string;
}
export const initSocket = async () => {
  return new Promise((resolve, reject) => {
    socket.on("close", () => {
      console.log("socket close !");
      reject("error");
    });
    socket.on("connect", () => {
      console.log("socket connect ....");
      resolve("ok");
    });
  });
};
export const emitLogin = () => {
  console.log("login.....");
  socket.emit("login", useUserInfoStore().userInfo.id);
};
export const useSocketServer = () => {
  const handleSubmitNewMessage = (event: event, message: Message) => {
    const { receiverId, senderId } = message;
    if (!receiverId || !senderId || !event) {
      throw Error("socket 传送信息有误！有必填字段为空，请检查！");
    }
    socket.emit(event, message);
  };
  const listeningAllMessage = () => {
    socket.on("like", (val: LikeMessage) => {
      console.log("点赞....", val);
      useMessageInfoStore().acceptLikeMessage(val);
    });
    socket.on("comment", (val: CommentMessage) => {
      console.log("评论....", val);
      useMessageInfoStore().acceptCommentMessage(val);
    });
    socket.on("chat", (val: ChatMessage) => {
      console.log("私信");
      useMessageInfoStore().acceptChatMessage(val);
    });
  };
  return { handleSubmitNewMessage, listeningAllMessage };
};
