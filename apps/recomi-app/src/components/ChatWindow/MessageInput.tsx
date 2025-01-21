import { Sender } from "@ant-design/x";
import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export default function MessageInput({
  isLoading,
  onSendMessage,
  onCancel,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Sender
      loading={isLoading}
      value={message}
      onChange={(v) => setMessage(v)}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      className="bg-white"
    />
  );
}
