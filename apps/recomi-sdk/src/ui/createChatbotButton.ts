import { Recomi } from "@/core/index";
import { RecomiState } from "@/types";

import createChatApp from "./createChatApp";

const handleChatButtonClick = () => {
  if (!window.recomi || window.recomi.getState() !== RecomiState.INITIALIZED) {
    window.recomi = new Recomi();
    window.recomi.init();
    createChatApp();
  } else {
    console.log("has inited");

    window?.recomi?.changeAppVisiblity();
  }
};

export default function createChatbotButton() {
  // 创建按钮
  const chatbotButton = document.createElement("button");
  chatbotButton.type = "button";

  // 设置按钮的样式
  chatbotButton.style.width = "3.5rem"; // w-14
  chatbotButton.style.height = "3.5rem"; // h-14
  chatbotButton.style.backgroundColor = "black"; // bg-black
  chatbotButton.style.color = "white"; // text-white
  chatbotButton.style.borderRadius = "9999px"; // rounded-full
  chatbotButton.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // shadow-lg
  chatbotButton.style.display = "flex"; // flex
  chatbotButton.style.alignItems = "center"; // items-center
  chatbotButton.style.justifyContent = "center"; // justify-center
  chatbotButton.style.transition = "background-color 0.2s"; // transition-colors
  chatbotButton.style.position = "fixed";
  chatbotButton.style.bottom = "10px";
  chatbotButton.style.right = "16px";
  chatbotButton.style.zIndex = "9999";

  // chatbotButton.setAttribute("aria-label", isOpen ? "Close chat" : "Open chat");
  chatbotButton.setAttribute("aria-label", "Open chat");

  // 创建 SVG 图标
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke", "currentColor");
  svg.classList.add("w-6", "h-6");

  // 创建路径
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute(
    "d",
    "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z",
  );

  // 将路径添加到 SVG
  svg.appendChild(path);

  // 将 SVG 图标添加到按钮
  chatbotButton.appendChild(svg);

  // 绑定点击事件
  chatbotButton.addEventListener("click", handleChatButtonClick);

  // 设置按钮的固定位置
  chatbotButton.style.position = "fixed";
  chatbotButton.style.bottom = "10px";
  chatbotButton.style.right = "16px";

  // 将按钮添加到页面
  document.body.appendChild(chatbotButton);
  return chatbotButton;
}
