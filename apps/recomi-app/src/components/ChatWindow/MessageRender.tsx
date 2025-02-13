import type { BubbleProps } from "@ant-design/x";
import markdownit from "markdown-it";

import type { ContentBlock } from "@/types";
import { ContentType, type Message } from "@/types/chat";

interface MessageRenderProps {
  msg: Message;
}

const md = markdownit({ html: true, breaks: true, typographer: true });

// 自定义渲染规则
md.renderer.rules = {
  ...md.renderer.rules,
  paragraph_open: () => '<p class="mt-1 mb-2.5">',

  heading_open: (tokens, idx) => {
    const level = tokens[idx].tag;
    const classes = {
      h1: "mt-2.5 mb-4 text-[1.875rem] font-semibold leading-9",
      h2: "mt-4 mb-2 text-2xl font-semibold leading-8",
      h3: "mt-2 mb-1 text-xl font-semibold leading-7",
      h4: "mt-2 mb-1 text-lg font-semibold leading-7",
      h5: "mb-1 text-lg font-semibold leading-7",
      h6: "mb-1 text-lg font-semibold leading-7",
    };
    return `<${level} class="${classes[level as keyof typeof classes]}">`;
  },

  link_open: (tokens, idx) => {
    const href = tokens[idx].attrs?.[0]?.[1] || "";
    return `<a href="${href}" class="break-all underline" target="_blank" rel="noopener">`;
  },

  bullet_list_open: () => '<ul class="my-0.75 pl-0 list-disc">',

  ordered_list_open: () => '<ol class="my-0.75 pl-0 list-decimal">',

  list_item_open: () =>
    '<li class="ml-[26px] p-0.75 pr-0 max-w-[calc(100%-33px)]">',

  hr: () => '<hr class="my-2.5">',

  table_open: () =>
    '<div class="max-w-full overflow-x-auto border border-[#E8E8E8] rounded-lg mb-5"><table class="w-full px-3 py-1">',

  tr_open: () =>
    '<tr class="even:bg-[#F9F9FA] border-t border-[#E8E8E8] first:border-none">',

  th_open: () => '<th class="text-left px-2 py-1.5 bg-[#eee]">',

  td_open: () => '<td class="px-2 py-1.5">',

  code_inline: (tokens, idx) => {
    const code = tokens[idx].content;
    return `<code class="bg-[rgba(27,31,35,0.05)] px-[0.4em] py-[0.2em] m-0 rounded break-words whitespace-pre-wrap font-medium">${code}</code>`;
  },
};

const renderMarkdown: BubbleProps["messageRender"] = (content) => {
  return (
    <div
      key={content}
      dangerouslySetInnerHTML={{ __html: md.render(content) }}
      className="prose prose-sm max-w-none"
    />
  );
};

const MessageRender = ({ msg }: MessageRenderProps) => {
  if (!msg?.content) {
    return "";
  }
  return (msg?.content as ContentBlock[])?.map(({ block, type }) => {
    switch (type) {
      // return <p className="leading-7 [&:not(:first-child)]:mt-6">{}</p>;
      case ContentType.MESSAGE:
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
