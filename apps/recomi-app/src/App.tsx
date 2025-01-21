import ChatHeader from "./components/ChatWindow/ChatHeader";
import MessageInput from "./components/ChatWindow/MessageInput";
import MessageList from "./components/ChatWindow/MessageList";
import { useChat } from "./hooks/useChat";

function App() {
  const { messages, isLoading, sendMessage, cancelStream } = useChat();

  return (
    <div className="min-h-screen max-h-screen relative overflow-y-auto">
      <header className="absolute top-0 w-full z-10">
        <ChatHeader />
      </header>

      <MessageList messages={messages} />

      <footer className="absolute bottom-0 w-full p-4 z-10">
        <MessageInput
          isLoading={isLoading}
          onCancel={cancelStream}
          onSendMessage={sendMessage}
        />
      </footer>
    </div>
  );
}

export default App;
