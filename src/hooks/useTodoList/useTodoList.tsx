"use client";

import { Task } from "@/types/Task";
import { useCallback, useEffect, useRef, useState } from "react";

const TASKS_STORAGE_KEY = "tasks";

const getStoredTasks = () => {
  const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
  try {
    return tasks ? JSON.parse(tasks) : [];
  } catch {
    return [];
  }
};

export const useTodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const lastId = useRef(1);
  const isLoaded = useRef(false);

  useEffect(() => {
    const storedTasks = getStoredTasks();
    setTasks(storedTasks);
    lastId.current = storedTasks[storedTasks.length - 1]?.id || 1;
    isLoaded.current = true;
  }, [setTasks, lastId, isLoaded]);

  const addTask = useCallback(
    (title: string) => {
      const newTask: Task = {
        id: ++lastId.current,
        title,
        completed: false,
      };
      setTasks((tasks) => [...tasks, newTask]);
    },
    [setTasks, lastId]
  );

  useEffect(() => {
    if (!isLoaded.current) return;
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  const removeTask = useCallback(
    (taskId: number) =>
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId)),
    [setTasks]
  );

  const updateTaskLabel = useCallback(
    (taskId: number, newLabel: string) =>
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === taskId ? { ...task, title: newLabel } : task
        )
      ),
    [setTasks]
  );

  const updateTaskCompleted = useCallback(
    (taskId: number, completed: boolean) =>
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed } : task
        )
      ),
    [setTasks]
  );

  const removedAllDoneTasks = useCallback(() => {
    setTasks((tasks) => tasks.filter((task) => !task.completed));
  }, [setTasks]);

  const moveTask = useCallback(
    (from: number, moveTo: 1 | -1) => {
      setTasks((tasks) => {
        const tasksCopy = [...tasks];
        const task = tasksCopy[from];
        tasksCopy.splice(from, 1);
        tasksCopy.splice(from + moveTo, 0, task);
        return tasksCopy;
      });
    },
    [setTasks]
  );

  return {
    tasks,
    addTask,
    removeTask,
    updateTaskLabel,
    updateTaskCompleted,
    removedAllDoneTasks,
    moveTask,
  };
};
