import createChatbotButton from "./ui/createChatbotButton";

console.log(import.meta.env);

(function () {
  const script = document.currentScript;
  console.log(script);

  // 根据拿到的id、domain去初始化就好了
  console.log(script?.getAttribute("API_KEY"));
  console.log(script?.getAttribute("USER_ID"));
  console.log(script?.getAttribute("domain"));

  // UI setup logic for chatbot
  const chatbotConfig = {
    iframeUrl: script?.getAttribute("domain"),
  };
  console.log("setupChatbotUI", chatbotConfig);

  function setupChatbotUI() {
    // 创建一个新的 div 元素来承载 App
    const chatbotDiv = document.createElement("div");
    chatbotDiv.id = "chatbot-root"; // 可以设置一个 ID
    document.body.appendChild(chatbotDiv);

    createChatbotButton(
      script?.getAttribute("API_KEY") || "",
      script?.getAttribute("USER_ID") || "",
    );
  }

  // Initialize chatbot on window load
  setupChatbotUI();
})();
