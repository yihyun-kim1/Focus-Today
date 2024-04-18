"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";
import { LogoAndMode } from "@/components/LogoAndMode";
import TextareaAutosize, {
  TextareaHeightChangeMeta,
} from "react-textarea-autosize";
import TaskModal, { TodoItem } from "@/components/TaskModal";

export default function Home() {
  const router = useRouter();
  const getInitialTodoItems = (): TodoItem[] => {
    const storedItemsJson =
      typeof window !== "undefined" ? localStorage.getItem("todoItems") : null;
    return storedItemsJson ? JSON.parse(storedItemsJson) : [];
  };

  const [todoItem, setTodoItem] = useState<TodoItem[]>(getInitialTodoItems);
  const [inputValue, setInputValue] = useState<string>("");
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [timeValue, setTimeValue] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(
    typeof window !== "undefined"
      ? localStorage.getItem("selectedColor") || "black"
      : "black"
  );
  const selectedTimeFromStorage =
    typeof window !== "undefined" ? localStorage.getItem("selectedTime") : null;
  const initialSelectedTime = selectedTimeFromStorage
    ? parseInt(selectedTimeFromStorage)
    : 10;
  const [selectedTime, setSelectedTime] = useState<number>(initialSelectedTime);
  const [selectedTodoTask, setSelectedTodoTask] = useState<number | null>(null);
  const [textareaHeight, setTextareaHeight] = useState(0);
  const [isEditTodoItem, setIsEditTodoItem] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({
    color: isEditTodoItem ? selectedColor : "black",
    time: isEditTodoItem ? selectedTime : 0,
    text: isEditTodoItem ? inputValue : "",
  });
  const initialDarkMode =
    typeof window !== "undefined"
      ? localStorage.getItem("isDarkMode") === "true"
      : false;
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialDarkMode);
  const [storedItems, setStoredItems] = useState<TodoItem[]>([]); // 상태로 변경

  useEffect(() => {
    const storedColor =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedColor")
        : null;
    const storedTime =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedTime")
        : null;
    const storedDarkMode =
      typeof window !== "undefined" ? localStorage.getItem("isDarkMode") : null;

    if (storedColor) {
      setSelectedColor(storedColor);
    }
    if (storedTime) {
      setSelectedTime(parseInt(storedTime));
    }
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === "true");
    }

    const storedItemsJson =
      typeof window !== "undefined" ? localStorage.getItem("todoItems") : null;
    if (storedItemsJson) {
      const parsedItems = JSON.parse(storedItemsJson);
      setTodoItem(parsedItems); // 초기 todoItem 상태 설정
      console.log(todoItem, "!!!!!!!!!!!!");
      setStoredItems(parsedItems); // 초기 storedItems 상태 설정
    }
  }, []);

  useEffect(() => {
    typeof window !== "undefined"
      ? localStorage.setItem("selectedColor", selectedColor)
      : null;
  }, [selectedColor]);

  useEffect(() => {
    typeof window !== "undefined"
      ? localStorage.setItem("selectedTime", selectedTime.toString())
      : null;
  }, [selectedTime]);

  useEffect(() => {
    typeof window !== "undefined"
      ? localStorage.setItem("todoItems", JSON.stringify(todoItem))
      : null;
  }, [todoItem]);

  useEffect(() => {
    typeof window !== "undefined"
      ? localStorage.setItem("isDarkMode", isDarkMode.toString())
      : null;
  }, [isDarkMode]);

  useEffect(() => {
    if (showModal && isEditTodoItem && selectedTodoTask !== null) {
      const task = todoItem[selectedTodoTask];
      setInitialValues({
        color: isEditTodoItem ? task.selectedColor : "black",
        time: isEditTodoItem ? task.selectedTime : 0,
        text: isEditTodoItem ? task.text : "",
      });
      setInputValue(task.text);
      setEditInputValue(task.text);
      setSelectedColor(task.selectedColor);
      setSelectedTime(task.selectedTime);
      setTimeValue(task.selectedTime);
    } else if (!showModal) {
      setInitialValues({ color: "", time: 0, text: "" });
      setInputValue("");
      setEditInputValue("");
    }
  }, [showModal, isEditTodoItem, selectedTodoTask, todoItem]);

  const handleTodoTaskClick = (index: number) => {
    setSelectedTodoTask(index);
    const selectedTask = todoItem[index];
    setSelectedColor(selectedTask.selectedColor);
    setSelectedTime(selectedTask.selectedTime);
    console.log(selectedTask, "??????????");
    localStorage.setItem("text", selectedTask.text);
    localStorage.setItem("selectedTime", selectedTask.selectedTime.toString());
    localStorage.setItem("selectedColor", selectedTask.selectedColor);
  };

  const hours = Math.floor(selectedTime / 60);
  const minutes = selectedTime % 60;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:00`;

  const handleStartButtonClick = () => {
    if (selectedTodoTask !== null) {
      const selectedTask = todoItem[selectedTodoTask];
      const { selectedColor } = selectedTask;

      router.push(
        `/task?time=${selectedTime}&color=${selectedColor}&isDarkMode=${isDarkMode}`
      );
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const trimmedValue = event.target.value;
    setInputValue(trimmedValue);
  };

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 3) {
      event.target.value = event.target.value.slice(0, 3);
    }
    const parsedValue =
      event.target.value !== "" ? parseInt(event.target.value) : null;
    setTimeValue(parsedValue);
    setSelectedTime(parsedValue || 0);
  };

  const addTodoItem = () => {
    if (
      (selectedTime > 0 && selectedColor && inputValue.trim() !== "") ||
      isEditTodoItem
    ) {
      const newItem: TodoItem = {
        text:
          !isEditTodoItem &&
          selectedTime > 0 &&
          selectedColor &&
          inputValue.trim() !== ""
            ? inputValue
            : isEditTodoItem &&
              selectedTodoTask !== null &&
              selectedTime > 0 &&
              selectedColor &&
              editInputValue.trim() !== ""
            ? editInputValue
            : isEditTodoItem && selectedTodoTask !== null
            ? todoItem[selectedTodoTask].text
            : "",

        selectedTime:
          isEditTodoItem && selectedTodoTask !== null
            ? selectedTime
            : localStorage.selectedTime || selectedTime,
        selectedColor:
          isEditTodoItem && selectedTodoTask !== null
            ? selectedColor
            : localStorage.selectedColor || selectedColor,
      };

      if (isEditTodoItem && selectedTodoTask !== null) {
        // 수정 모달에서 저장 버튼을 누른 경우
        const updatedItems = [...todoItem];
        updatedItems[selectedTodoTask] = newItem;
        setTodoItem(updatedItems);
        setStoredItems(updatedItems);
        setIsEditTodoItem(false);
      } else {
        // 새로운 todo 항목을 추가하는 경우
        setTodoItem([...todoItem, newItem]);
        setStoredItems([...storedItems, newItem]);
      }
      console.log(inputValue, selectedTime, selectedColor, "update!");
      setInputValue("");
      setEditInputValue("");
      setSelectedColor("");
      setSelectedTime(0);
      setShowModal(false);
      setSelectedTodoTask(null);
    } else {
      alert("필요한 항목을 모두 입력해주세요.");
    }
  };

  const editTodoItem = (index: number) => {
    setSelectedTodoTask(index); // 현재 선택된 todo 항목의 인덱스 저장
    setIsEditTodoItem(true);
    setShowModal(true);
  };

  const handleDeleteAll = () => {
    setInputValue("");
    setSelectedColor("");
    setSelectedTime(0);
    setIsEditTodoItem(false);
    setSelectedTodoTask(null);
    setShowModal(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Textarea 높이 변경 함수
  const handleHeightChange = (
    height: number,
    meta: TextareaHeightChangeMeta
  ) => {
    setTextareaHeight(height);
  };

  return (
    <main
      className="flex fixed w-full items-center justify-center"
      style={{ backgroundColor: `${!isDarkMode ? "#FFFFFF" : "#000000"}` }}
    >
      <div className="flex flex-col w-[1040px] h-screen">
        <LogoAndMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="w-[1040px] mb-[64px] mt-[56px] flex flex-row">
          <div className="w-[360px] h-[867px]">
            <h1
              className="text-[36px] h-[100px]"
              style={{ color: `${isDarkMode ? "#FFFFFF" : "#000000"}` }}
            >
              Hello,
              <br />
              let&apos;s focus today.
            </h1>
            <div
              className="flex w-[360px] mt-[64px] mb-[24px]"
              onClick={() => setShowModal(true)}
            >
              <div className="flex flex-row">
                <TextareaAutosize
                  cacheMeasurements
                  className="flex w-[360px] resize-none border-1 outline-none rounded-lg px-[20px] py-[16px]  border-gray-500 text-gray-700 placeholder-custom-gray"
                  style={{ border: "1px solid #27272766" }}
                  value={inputValue}
                  minRows={1}
                  maxRows={2}
                  maxLength={43}
                  onChange={(event) => handleInputChange(event)}
                  onHeightChange={handleHeightChange}
                  placeholder="Todo를 적어주세요."
                />
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-scroll">
              {todoItem.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: `solid ${
                      selectedTodoTask === index
                        ? `2px ${item.selectedColor}`
                        : "1px #27272766"
                    }`,
                    borderColor:
                      selectedTodoTask === index
                        ? `${item.selectedColor}`
                        : isDarkMode
                        ? "#FFFFFF4D"
                        : "#27272766",
                  }}
                  className={`rounded-xl w-full px-[16px] py-[16px] mb-2 h-[136px] cursor-pointer todo-task`}
                  onClick={() => handleTodoTaskClick(index)}
                >
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                      <div
                        style={{
                          backgroundColor: `${
                            item.selectedColor == "black" && isDarkMode == true
                              ? "white"
                              : item.selectedColor
                          }`,
                        }}
                        className="mr-[10px] w-[16px] h-[16px] rounded-full"
                      />
                      <div
                        style={{
                          color: `${isDarkMode ? "#FFFFFF" : "#000000"}`,
                        }}
                      >
                        {item.selectedTime}min
                      </div>
                    </div>
                    <div
                      onClick={() => editTodoItem(index)}
                      style={{ color: `${isDarkMode ? "#FFFFFF" : "#000000"}` }}
                    >
                      Edit
                    </div>
                  </div>
                  <div
                    style={{ color: `${isDarkMode ? "#FFFFFF" : "#000000"}` }}
                    className="mt-[12px] text-[16px] max-w-[380px] h-[44px] overflow-hidden"
                  >
                    <p className="line-clamp-2">{item.text}</p>
                  </div>
                  <div className="flex w-full h-[20px] py-[6px] px-[3px] flex-col items-end">
                    <img
                      src="/Union.png"
                      className="w-[14px] h-[8px]"
                      alt="arrow"
                    />
                  </div>
                </div>
              ))}
            </div>
            {showModal && (
              <TaskModal
                isEditTodoItem={isEditTodoItem}
                isDarkMode={isDarkMode}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                // selectedTodoTaskHeight={selectedTodoTask !== null ? taskHeights[selectedTodoTask] : 0}
                timeValue={timeValue}
                setTimeValue={setTimeValue}
                setInputValue={setInputValue}
                setEditInputValue={setEditInputValue}
                handleTime={handleTime}
                handleDeleteAll={handleDeleteAll}
                handleInputChange={handleInputChange}
                onSaveButtonClick={addTodoItem}
                inputValue={inputValue}
                editInputValue={editInputValue}
                showModal={showModal}
                initialValues={initialValues}
                textareaHeight={textareaHeight}
              />
            )}
          </div>
          <div className="w-[640px] h-[732px] flex ml-[40px] items-center justify-center">
            {selectedTodoTask !== null && !isEditTodoItem && (
              <div className="flex flex-col max-w-[250px] max-h-[300px] items-center text-center justify-center">
                <div className={`flex flex-col max-h-[200px] gap-y-[16px]`}>
                  <div
                    className={`w-[248px] h-[78px] text-[60px]`}
                    style={{
                      color: `${
                        isDarkMode && selectedColor === "black"
                          ? "#FFFFFF"
                          : selectedColor
                      }`,
                    }}
                  >
                    {formattedTime}
                  </div>
                  <button
                    className={`w-full h-[66px] text-${
                      isDarkMode == true ? "black" : "white"
                    } px-3 py-2 rounded-lg`}
                    style={{
                      backgroundColor: `${
                        selectedColor == "black" && isDarkMode == true
                          ? "white"
                          : selectedColor
                      }`,
                      padding: 0,
                    }}
                    onClick={handleStartButtonClick}
                  >
                    <a className="text-lg">Start</a>
                  </button>
                </div>
                <style jsx>{`
                  .relative {
                    position: absolute;
                    // left: 60%;
                    bottom: 380px;
                  }
                `}</style>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
