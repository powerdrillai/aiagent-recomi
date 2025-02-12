import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useContext, useRef, useState } from "react";

import {
  type CreateJobData,
  createSession,
  JobMode,
  LanguageType,
} from "@/apis/chat";
import RecomiContext from "@/components/Context/RecomiContext";
import type { ContentBlock } from "@/types";
import { ChatConfig, ContentType, Message, MessageAuthor } from "@/types/chat";
import { deduplicateArray } from "@/utils/array";

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  cancelStream: () => void;
}

export const useChat = (): UseChatReturn => {
  const RecomiConfig = useContext(RecomiContext);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: [
        {
          type: ContentType.MESSAGE,
          block: "👋 Hi! I am Chat AI, ask me anything about Chat!",
        },
      ],
      author: MessageAuthor.AI,
    },
  ]);
  const [sessionId, setSessionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateLastMessage = (updater: (message: Message) => Message) => {
    setMessages((prev: any) => {
      const lastMessage = prev[prev.length - 1];
      return deduplicateArray([...prev, updater(lastMessage)], null, false);
    });
  };

  const addContentToLastMessage = (
    contents: ContentBlock[],
    newContent: { type: ContentType; block: string },
  ) => {
    const lastContent = contents[contents.length - 1];
    if (lastContent && lastContent.type === newContent.type) {
      const curContent = contents.pop();
      const block =
        (curContent?.block?.replace(/\?(\n)+$/, "?") || "") + newContent.block;

      contents.push({
        ...(curContent || {}),
        block,
        type: curContent?.type || newContent.type,
      });
    } else {
      contents.push(newContent);
    }
  };

  const cancelStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.loading) {
        lastMessage.loading = false;
      }
    }
  };

  const handleStreamMessage = (event: any, contents: any[]) => {
    try {
      if (event.event === "END_MARK" && event.data === "[DONE]") {
        setIsLoading(false);
        updateLastMessage((msg) => ({ ...msg, loading: false }));
        return;
      }

      if (event.event === ContentType.MESSAGE) {
        const { choices } = JSON.parse(event.data);
        const { content } = choices?.[0]?.delta || {};

        addContentToLastMessage(contents, {
          type: ContentType.MESSAGE,
          block: content,
        });

        updateLastMessage((msg) => ({
          ...msg,
          loading: false,
          content: contents,
        }));
      } else if (event.event === ContentType.CODE && event.data !== "[DONE]") {
        // TODO: 暂时隐藏CODE 类型的信息处理
        // const { choices } = JSON.parse(event.data);
        // const { content } = choices?.[0]?.delta || {};
        // addContentToLastMessage(contents, {
        //   type: ContentType.CODE,
        //   block: content,
        // });
        // updateLastMessage((msg) => ({
        //   ...msg,
        //   loading: false,
        //   content: contents,
        // }));
      }
    } catch (error) {
      console.error("Error processing stream message:", error);
    }
  };

  const sendMessage = async (text: string) => {
    if (!RecomiConfig) {
      console.error("unexpected lack of RecomiConfig");
      return;
    }
    const contents: ContentBlock[] = [];
    if (!text.trim() || isLoading) return;

    try {
      setIsLoading(true);

      // Add user message
      addMessage({
        id: `user-${Date.now()}`,
        content: [{ type: ContentType.MESSAGE, block: text }],
        author: MessageAuthor.USER,
      });

      // Create session if needed
      let curSessionID = null;
      if (!sessionId) {
        const session = await createSession({
          title: "New Chat",
          languageType: LanguageType.En,
          jobMode: JobMode.Auto,
        });

        curSessionID = session.id;
        setSessionId(session.id);
      }

      // Add initial AI message
      addMessage({
        id: `ai-${Date.now()}`,
        content: [{ type: ContentType.MESSAGE, block: "" }],
        author: MessageAuthor.AI,
        loading: true,
      });

      // Setup stream
      abortControllerRef.current = new AbortController();
      const config: ChatConfig = {
        modelGroup: "default",
      };

      await fetchEventSource(`${import.meta.env.VITE_BASEURL}/jobs`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Keep-Alive": "timeout=300",
          Authorization: `Bearer ${RecomiConfig.SECRET_KEY}`,
        },
        body: JSON.stringify({
          question: text,
          sessionId: sessionId || curSessionID,
          answerConfig: config,
          stream: true,
        } as CreateJobData),
        signal: abortControllerRef.current.signal,
        openWhenHidden: true,
        credentials: "omit",
        onmessage: (e) => handleStreamMessage(e, contents),
        onerror(error) {
          console.error("Stream error:", error);
          updateLastMessage((msg) => ({
            ...msg,
            content: [
              {
                type: ContentType.ERROR,
                block: "An error occurred while processing your request.",
              },
            ],
            loading: false,
          }));
          setIsLoading(false);
          throw Error(error);
        },
      });
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    cancelStream,
  };
};
