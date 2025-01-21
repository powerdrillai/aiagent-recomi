import type { Message } from "@/types/chat";

export function deduplicateArray(
  arr: Message[],
  id: string | null | undefined,
  isDone: boolean | undefined,
) {
  const deduplicatedMap = new Map();
  // Loop through the array and store the last occurrence of each message_id or messageId in the map
  // eslint-disable-next-line no-restricted-syntax
  for (const obj of arr) {
    const key = obj.id || "template";
    if ((id && key === id) || isDone) {
      deduplicatedMap.delete("template");
    }
    deduplicatedMap.set(key, obj);
  }

  // Convert the map values back to an array to get the deduplicated result
  const result = Array.from(deduplicatedMap.values());
  return result;
}
