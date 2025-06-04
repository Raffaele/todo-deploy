"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTodoContext } from "./TodoContext";

export const TaskCreationForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [taskName, setTaskName] = useState("");
  const { addTask } = useTodoContext();
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addTask(taskName);
      setTaskName("");
      inputRef.current?.focus();
    },
    [addTask, taskName, setTaskName, inputRef]
  );
  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 bg-amber-50 shadow-lg rounded-xl space-y-4 w-full flex gap-3 md:items-end flex-col md:flex-row min-h-0"
    >
      <label className="flex-1 w-full mb-0">
        <span className="block text-sm font-medium text-gray-700">
          Task name:
        </span>
        <input
          type="text"
          className="input w-full"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          ref={inputRef}
          required
        />
      </label>

      <button type="submit" disabled={!taskName} className="btn inline-block">
        Add
      </button>
    </form>
  );
};
