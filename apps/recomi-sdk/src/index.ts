import createChatbotButton from "./ui/createChatbotButton";

(function () {
  // UI setup logic for chatbot
  const chatbotConfig = {
    iframeUrl: "http://localhost:5174",
  };
  console.log("setupChatbotUI", chatbotConfig);

  function setupChatbotUI() {
    // 创建一个新的 div 元素来承载 App
    const chatbotDiv = document.createElement("div");
    chatbotDiv.id = "chatbot-root"; // 可以设置一个 ID
    document.body.appendChild(chatbotDiv);

    console.log(chatbotConfig);

    createChatbotButton();
  }

  // Initialize chatbot on window load
  setupChatbotUI();
})();
