import createRecomiEntry from "./ui/createRecomiEntry";

console.log(import.meta.env);

// 检查是否在浏览器环境中
if (typeof window !== "undefined") {
  (function () {
    const script = document.currentScript;
    console.log(script);

    // 根据拿到的id、domain去初始化就好了
    console.log(script?.getAttribute("SECRET_KEY"));
    console.log(script?.getAttribute("domain"));

    // TODO 从配置平台Fetch Config for Recomi
    // const RecomiConfig = {
    //   ...
    // }

    function setupRecomiUI() {
      // 创建一个新的 div 元素来承载 App
      const recomiDiv = document.createElement("div");
      recomiDiv.id = "recomi-root"; // 可以设置一个 ID
      document.body.appendChild(recomiDiv);

      createRecomiEntry(script?.getAttribute("SECRET_KEY") || "");
    }

    // Initialize recomi on window load
    setupRecomiUI();
  })();
}

// 导出用于 npm 包的接口
// export const initRecomi = (apiKey, userId, domain) => {
//   const recomiConfig = {
//     iframeUrl: domain,
//   };
//   console.log("setupRecomiUI", recomiConfig);

//   const recomiDiv = document.createElement("div");
//   recomiDiv.id = "recomi-root"; // 可以设置一个 ID
//   document.body.appendChild(recomiDiv);

//   createRecomiButton(apiKey, userId);
// };
