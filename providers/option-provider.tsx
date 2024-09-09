"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useOptionHandler from "./contexts/option-handler";

const OptionContext = createContext<
  ReturnType<typeof useOptionHandler> | undefined
>(undefined);

export const OptionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    getInitialTodoItems,
    todoItem,
    setTodoItem,
    selectedTimeFromStorage,
    selectedColor,
    setSelectedColor,
    initialDarkMode,
    initialSelectedTime,
    isDarkMode,
    setIsDarkMode,
    storedItems,
    setStoredItems,
  } = useOptionHandler();

  return (
    <OptionContext.Provider
      value={{
        getInitialTodoItems,
        todoItem,
        setTodoItem,
        selectedTimeFromStorage,
        selectedColor,
        setSelectedColor,
        initialDarkMode,
        initialSelectedTime,
        isDarkMode,
        setIsDarkMode,
        storedItems,
        setStoredItems,
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

export const useOptionContext = () => {
  const context = useContext(OptionContext);
  if (!context) {
    throw new Error("useOptionContext must be used within a OptionProvider");
  }
  return context;
};
