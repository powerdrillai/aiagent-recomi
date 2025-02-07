import { Recomi } from "@/core/index";
import { RecomiState } from "@/types";

import createRecomiApp from "./createRecomiApp";

const handleEntryClick = (API_KEY: string) => {
  if (!window.recomi || window.recomi.getState() !== RecomiState.INITIALIZED) {
    window.recomi = new Recomi();
    window.recomi.init(API_KEY);
    createRecomiApp();
  } else {
    console.log("Already initialized");
    window?.recomi?.changeAppVisiblity();
  }
};

export default function createRecomiEntry(API_KEY: string) {
  // 按钮样式
  const entryStyles: Partial<CSSStyleDeclaration> = {
    width: "3.5rem",
    height: "3.5rem",
    backgroundColor: "black",
    color: "white",
    borderRadius: "9999px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
    position: "fixed",
    bottom: "10px",
    right: "16px",
    zIndex: "9999",
  };

  // 创建按钮
  const recomiEntry = Object.assign(document.createElement("button"), {
    type: "button",
    ariaLabel: "Open chat",
  });

  Object.assign(recomiEntry.style, entryStyles);

  // 创建 SVG 图标
  recomiEntry.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/>
    </svg>
  `;

  // 绑定点击事件
  recomiEntry.addEventListener("click", () => handleEntryClick(API_KEY));

  // 添加按钮到页面
  document.body.appendChild(recomiEntry);
  return recomiEntry;
}
