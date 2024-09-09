import useOptionState from "./option-state";

const useOptionHandler = () => {
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
  } = useOptionState();

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

export default useOptionHandler;
