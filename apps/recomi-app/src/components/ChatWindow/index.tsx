import { useChat } from "../../hooks/useChat";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

export default function ChatWindow() {
  const { messages, isLoading, sendMessage, cancelStream } = useChat();

  return (
    <div className="absolute bottom-20 right-0 w-[400px] h-[600px] bg-white rounded-xl shadow-xl flex flex-col">
      <ChatHeader />

      <MessageList messages={messages} />

      <div className="absolute bottom-0 w-full p-4">
        <MessageInput
          isLoading={isLoading}
          onCancel={cancelStream}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
