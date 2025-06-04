"use client";

import { useTodoContext } from "./TodoContext";

export const MainFooter = () => {
  const { tasks, removedAllDoneTasks } = useTodoContext();
  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <footer className="bg-empty text-empty-text flex p-2">
      <p className="flex-1 text-center">Tasks: {tasks.length}</p>
      <p className="flex-1 text-center">Done: {completedTasks.length}</p>
      <button className="btn" onClick={removedAllDoneTasks}>
        Clear
      </button>
    </footer>
  );
};
