import type { ContentBlock, TaskContent } from "@/types";

// 将blocks分配到每个task和正常回答里面
export function distributeBlocks(
  blocks: ContentBlock[],
  taskContents: TaskContent[],
) {
  // Respond 的task就是正常答案流
  const respondTask = taskContents.find((t) => t.taskStage === "Respond");
  const respondTaskId = respondTask ? respondTask.taskId : "-1";
  // 如果没有id或者id是-1，那么这个内容就是正常回答
  const simpleBlocks = blocks.filter(
    (block) =>
      !block.blockId ||
      block.blockId === "-1" ||
      block.blockId === respondTaskId,
  );
  taskContents.forEach((t) => {
    if (t.taskStage === "Respond") {
      // 如果是Respond，那么block是属于正常回答流的，不在task step里面
      return;
    }
    const task = t;
    const { taskId } = task;
    const taskBlocks = blocks.filter((block) => block.blockId === taskId);
    task.content = [...taskBlocks];
  });
  return {
    content: [...simpleBlocks],
    taskContent: [...taskContents],
  };
}
