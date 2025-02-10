import React, { useEffect, useRef, useState } from "react";

/**
 * ScriptLoader 组件允许用户输入新的脚本代码并加载它。
 */
const ScriptLoader: React.FC = () => {
  const [scriptCode, setScriptCode] = useState<string>("");
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const loadScript = (code: string) => {
    if (scriptRef.current) {
      document.body.removeChild(scriptRef.current);
    }

    // 创建一个新的 script 元素
    const script = document.createElement("script");
    script.type = "text/javascript";

    // 将用户输入的代码作为字符串插入
    script.innerHTML = code; // 直接使用用户输入的代码
    scriptRef.current = script;
    document.body.appendChild(script);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScriptCode(event.target.value);
  };

  const handleLoadScript = () => {
    loadScript(scriptCode);
  };


  return (
    <div>
      <h1>Recomi SDK Demo</h1>
      <p>This page demonstrates the Recomi SDK functionality.</p>
      <textarea
        value={scriptCode}
        onChange={handleInputChange}
        placeholder="输入新的脚本代码"
        rows={10}
        cols={50}
      />
      <button onClick={handleLoadScript}>加载脚本</button>
    </div>
  );
};

export default ScriptLoader;
