import React, { useCallback } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Button } from "../../../components/ui/Button";
import { useMessage } from "../../../hooks/useMessage";

const codeExample = `
const bot = new ConfigBot({
  apiKey: 'your-api-key',
  userId: 'your-user-id',
  datasetId: 'your-dataset-id'
});

// Initialize the bot
await bot.init();

// Start processing
const result = await bot.process({
  input: 'Your input here'
});
`;

function BotUsage() {
  const { success } = useMessage();

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(codeExample.trim());
    success("Code copied to clipboard!");
  }, [success]);

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
        <a href="#" className="text-blue-600 hover:underline">
          comprehensive documentation
        </a>
        .
      </p>
    </div>
  );
}

export default BotUsage;
