import React, { useRef, useState } from "react";

const ScriptLoader: React.FC = () => {
  // 保存用户输入的代码
  const [scriptCode, setScriptCode] = useState<string>("");
  // 用于显示加载状态或错误提示
  const [message, setMessage] = useState<string>("");
  // 用来保存当前加载的 <script> 元素引用，便于后续替换或移除
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  // 用于标记是否需要提示用户刷新页面（保留原有逻辑）
  const [showReloadMessage, setShowReloadMessage] = useState<boolean>(false);

  // 样式对象定义
  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: "20px",
  };

  const textareaStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "14px",
    boxSizing: "border-box",
    resize: "vertical",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const messageStyle = (isError: boolean): React.CSSProperties => ({
    marginTop: "10px",
    color: isError ? "#d9534f" : "#5cb85c",
    fontWeight: "bold",
  });

  const reloadContainerStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #f0ad4e",
    borderRadius: "4px",
    backgroundColor: "#fcf8e3",
  };

  const reloadButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#f0ad4e",
    marginTop: "10px",
  };

  /**
   * 加载并执行用户输入的代码
   */
  const loadScript = (code: string) => {
    if (!code.trim()) {
      setMessage("Please enter valid script code.");
      return;
    }

    // 如果已存在加载过的脚本，则移除旧脚本
    if (scriptRef.current) {
      document.body.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    // 尝试执行代码
    try {
      // 使用 new Function 替代 eval，执行用户代码
      new Function(code)();
      setMessage("Script loaded successfully!");
      setShowReloadMessage(true);
    } catch (error: any) {
      setMessage(`Error executing script: ${error.message}`);
      console.error("Error executing script:", error);
      return;
    }

    // 创建新的 <script> 元素（如果需要保留加载的状态）
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = code;
    scriptRef.current = script;
    document.body.appendChild(script);
  };

  // 文本框输入变化时更新状态
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScriptCode(event.target.value);
  };

  // 点击加载按钮时处理
  const handleLoadScript = () => {
    // 自动去除可能存在的 <script> 标签，确保用户输入的代码格式正确
    const cleanedCode = scriptCode
      .replace(/<script>/gi, "")
      .replace(/<\/script>/gi, "");
    loadScript(cleanedCode);
  };

  // 刷新页面（原有逻辑，用于重新加载脚本代码）
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>Usage Instructions</h2>
        <ol style={{ textAlign: "left" }}>
          <li>
            Please enter the <strong>JavaScript</strong> code provided by{" "}
            <a href="https://aiagent-recomi-configuration.vercel.app/">
              Recomi Config Platform
            </a>{" "}
            in the text area below.
          </li>
          <li>
            Then click the <strong>"Load Script"</strong> button
          </li>
        </ol>
      </div>
      <textarea
        value={scriptCode}
        onChange={handleInputChange}
        placeholder="Please enter valid JavaScript code..."
        rows={10}
        style={textareaStyle}
      />
      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <button onClick={handleLoadScript} style={buttonStyle}>
          Load Script
        </button>
      </div>

      {message && message.includes("Error") && (
        <div style={messageStyle(message.includes("Error"))}>{message}</div>
      )}

      {showReloadMessage && (
        <div style={reloadContainerStyle}>
          <h3 style={messageStyle(message.includes("Error"))}>
            Script loaded successfully.
          </h3>
          <p>
            If you need to update the script code, please refresh the page and
            re-enter the script.
          </p>
          <button onClick={handleReload} style={reloadButtonStyle}>
            Refresh Page
          </button>
        </div>
      )}
    </div>
  );
};

export default ScriptLoader;
