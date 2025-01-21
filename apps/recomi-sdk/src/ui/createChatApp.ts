export default function createChatApp() {
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:5174/";
  iframe.style.width = "400px";
  iframe.style.height = "600px";
  iframe.style.position = "fixed";
  iframe.style.bottom = "82px";
  iframe.style.right = "16px";
  iframe.style.border = "1px solid grey";
  iframe.style.borderRadius = "8px";
  iframe.style.background = "white";
  iframe.style.zIndex = "9999";
  iframe.id = import.meta.env.VITE_CHATAPP_IFRAMEID;

  document.body.appendChild(iframe);

  window.recomi.bindIframe(import.meta.env.VITE_CHATAPP_IFRAMEID);
}
