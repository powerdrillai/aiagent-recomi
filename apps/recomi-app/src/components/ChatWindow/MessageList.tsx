// 新增 MessageList 组件
import { Bubble } from "@ant-design/x";
import type { RolesType } from "@ant-design/x/es/bubble/BubbleList";
import React, { useEffect } from "react";

import { type Message, MessageAuthor } from "@/types/chat";

import MessageRender from "./MessageRender";

interface MessageListProps {
  messages: Message[];
}

const roles: RolesType = {
  [MessageAuthor.AI]: {
    placement: "start",
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: 600,
    },
  },
  [MessageAuthor.USER]: {
    placement: "end",
  },
};

const MessageList = ({ messages }: MessageListProps) => {
  const listRef = React.useRef<any>(null);

  const scrollToBottom = () => {
    listRef.current?.scrollTo({
      offset: listRef.current.nativeElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Bubble.List
      ref={listRef}
      className="p-4 space-y-4 pt-[77px] pb-[88px] max-h-screen "
      roles={roles}
      items={messages?.map((msg) => ({
        key: msg.id,
        role: msg.author,
        loading: !!msg?.loading,
        typing: true,
        messageRender: () => MessageRender({ msg }),
      }))}
    />
  );
};

export default MessageList;
