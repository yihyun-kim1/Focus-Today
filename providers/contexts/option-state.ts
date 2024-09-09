import { TodoItem } from "@/components/TaskModal";
import { useState } from "react";

const useOptionState = () => {
  const getInitialTodoItems = (): TodoItem[] => {
    const storedItemsJson =
      typeof window !== "undefined" ? localStorage.getItem("todoItems") : null;
    return storedItemsJson ? JSON.parse(storedItemsJson) : [];
  };
  const [todoItem, setTodoItem] = useState<TodoItem[]>(getInitialTodoItems);
  const selectedTimeFromStorage =
    typeof window !== "undefined" ? localStorage.getItem("selectedTime") : null;
  const initialSelectedTime = selectedTimeFromStorage
    ? parseInt(selectedTimeFromStorage)
    : 10;
  const [selectedColor, setSelectedColor] = useState<string>(
    typeof window !== "undefined"
      ? localStorage.getItem("selectedColor") || "black"
      : "black"
  );
  const initialDarkMode =
    typeof window !== "undefined"
      ? localStorage.getItem("isDarkMode") === "true"
      : false;
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialDarkMode);
  const [storedItems, setStoredItems] = useState<TodoItem[]>([]);

  return {
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
  };
};

export default useOptionState;
