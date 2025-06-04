"use client";

import { useTodoList } from "@/hooks/useTodoList/useTodoList";
import { createContext, FC, PropsWithChildren, useContext } from "react";

const EmptyValue = Symbol("EmptyValue");

type TodoContextType = ReturnType<typeof useTodoList>;

const TodoContext = createContext<TodoContextType | typeof EmptyValue>(
  EmptyValue
);

export const TodoProviderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TodoContext.Provider value={useTodoList()}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === EmptyValue) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
