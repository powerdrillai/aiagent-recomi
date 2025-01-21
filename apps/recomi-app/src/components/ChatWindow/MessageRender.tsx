import type { BubbleProps } from "@ant-design/x";
import markdownit from "markdown-it";

import type { ContentBlock } from "@/types";
import { ContentType, type Message } from "@/types/chat";

interface MessageRenderProps {
  msg: Message;
}

const md = markdownit({ html: true, breaks: true, typographer: true });

const renderMarkdown: BubbleProps["messageRender"] = (content) => {
  console.log(content);
  return (
    // TODO 需要提供唯一ID
    <div
      key={content}
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
    />
  );
};

const MessageRender = ({ msg }: MessageRenderProps) => {
  if (!msg?.content) {
    return "";
  }
  return (msg?.content as ContentBlock[])?.map(({ block, type }) => {
    switch (type) {
      case ContentType.MESSAGE:
        return <p className="leading-7 [&:not(:first-child)]:mt-6">{block}</p>;
      case ContentType.CODE:
        if (block.startsWith("```markdown")) {
          return renderMarkdown?.(
            block?.replace("```markdown", "").replace("```", "") || "",
          );
        }
        return renderMarkdown?.(block || "");

      default:
        return "";
    }
  });
};
export default MessageRender;
