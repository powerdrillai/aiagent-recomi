import { useCallback } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import type { Bot } from "@/apis/bot";

import { Button } from "../ui/Button";
import { useMessage } from "../../hooks/useMessage";

interface BotUsageProps {
  bot: Bot | null;
}

function BotUsage({ bot }: BotUsageProps) {
  const { success } = useMessage();

  const codeExample = `
    <script>
      (function () {
        const onLoad = function () {
          const script = document.createElement("script");
          script.src = "https://aiagent-recomi.vercel.app/RecomiSDK.umd.cjs";
          script.setAttribute("BOT_ID", ${bot?.id});
          script.setAttribute("SECRET_KEY", ${bot?.secretkey});
          script.setAttribute("domain", "https://aiagent-recomi.vercel.app/");
          document.body.appendChild(script);
        };

        if (document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      })();
    </script>
  `;

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(codeExample.trim());
    success("Code copied to clipboard!");
  }, [success, codeExample]);

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4">Quick Start Guide</h4>
      <p className="mb-4">
        Follow these steps to integrate the bot into your application:
      </p>

      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-2 right-2"
          onClick={copyCode}
        >
          Copy
        </Button>
        <SyntaxHighlighter
          language="javascript"
          style={docco}
          className="!bg-gray-50 dark:!bg-gray-900 rounded-lg"
        >
          {codeExample}
        </SyntaxHighlighter>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-4">Documentation</h4>
      <p>
        For more detailed information, please refer to our{" "}
        <a
          href="#"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          comprehensive documentation
        </a>
        .
      </p>
    </div>
  );
}

export default BotUsage;
