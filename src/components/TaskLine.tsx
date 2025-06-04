"use client";

import { Task } from "@/types/Task";
import { useTodoContext } from "./TodoContext";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Props = { task: Task; index: number; maxIndex: number };
type OnMove = (position: 1 | -1) => void;

const LiWrapper = ({
  children,
  index,
  maxIndex,
  onMove,
}: PropsWithChildren<{
  onMove: OnMove;
  index: number;
  maxIndex: number;
}>) => (
  <li className="p-2 border-b border-gray-200 flex ">
    <div className="flex flex-col pr-5 justify-between">
      <button
        className="text-xs border radius cursor-pointer rounded-sm px-1"
        disabled={index === 0}
        onClick={() => onMove(-1)}
      >
        UP
      </button>
      <button
        className="text-xs border radius cursor-pointer rounded-sm px-1 disabled:cursor-not-allowed disabled:opacity-30"
        disabled={index === maxIndex}
        onClick={() => onMove(1)}
      >
        DOWN
      </button>
    </div>
    <div className="flex-1 flex flex-col md:flex-row justify-between disabled:cursor-not-allowed disabled:opacity-30">
      {children}
    </div>
  </li>
);

export const TaskLine = ({ task, index, maxIndex }: Props) => {
  const [taskName, setTaskName] = useState(task.title);
  const [isEditMode, setIsEditMode] = useState(false);
  const { removeTask, updateTaskCompleted, updateTaskLabel, moveTask } =
    useTodoContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => inputRef.current?.focus(), [inputRef.current]);
  const handleEnableEditMode = useCallback(() => {
    setIsEditMode(true);
    setTaskName(task.title);
  }, [task, setIsEditMode, setTaskName]);
  const handleSaveTaskLabel = useCallback(() => {
    updateTaskLabel(task.id, taskName);
    setIsEditMode(false);
    setTaskName("");
  }, [updateTaskLabel, setIsEditMode, taskName, task.id, setTaskName]);

  if (isEditMode) {
    return (
      <LiWrapper
        onMove={(position) => {
          console.log({ index, position });
          moveTask(index, position);
        }}
        index={index}
        maxIndex={maxIndex}
      >
        <input
          type="text"
          className="input"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          ref={inputRef}
        />
        <div className="flex gap-1">
          <button className="btn" onClick={handleSaveTaskLabel}>
            Save
          </button>
          <button className="btn" onClick={() => setIsEditMode(false)}>
            Cancel
          </button>
        </div>
      </LiWrapper>
    );
  }
  return (
    <LiWrapper
      onMove={(position) => moveTask(index, position)}
      index={index}
      maxIndex={maxIndex}
    >
      <label className="inline-flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={task.completed}
          onChange={(e) => updateTaskCompleted(task.id, e.target.checked)}
        />
        <span className="text-gray-700">{task.title}</span>
      </label>
      <div className="flex gap-1">
        <button className="btn" onClick={() => removeTask(task.id)}>
          Delete
        </button>
        <button className="btn" onClick={handleEnableEditMode}>
          Rename
        </button>
      </div>
    </LiWrapper>
  );
};
