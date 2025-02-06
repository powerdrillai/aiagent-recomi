export default function createRecomiApp() {
  // 创建 iframe 元素
  const iframe = document.createElement("iframe");
  iframe.src = import.meta.env.VITE_RECOMI_ORIGIN;
  iframe.id = import.meta.env.VITE_RECOMIAPP_IFRAMEID;

  // 统一设置样式
  Object.assign(iframe.style, {
    width: "400px",
    height: "600px",
    position: "fixed",
    bottom: "82px",
    right: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "white",
    zIndex: "9999",
  });

  // 添加 iframe 到页面
  document.body.appendChild(iframe);

  // 绑定 iframe 到 recomi
  if (window.recomi) {
    window.recomi.bindIframe(import.meta.env.VITE_RECOMIAPP_IFRAMEID);
  } else {
    console.error("Recomi is not initialized.");
  }
}
