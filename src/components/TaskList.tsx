"use client";

import { TaskLine } from "./TaskLine";
import { useTodoContext } from "./TodoContext";

export const TaskList = () => {
  const { tasks } = useTodoContext();
  const tasksSize = tasks.length;
  return (
    <div className="overflow-y-auto flex-1 min-h-0">
      <ul>
        {tasks.map((task, index) => (
          <TaskLine
            key={task.id}
            task={task}
            index={index}
            maxIndex={tasksSize}
          />
        ))}
      </ul>
    </div>
  );
};
