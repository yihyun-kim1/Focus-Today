"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import { LogoAndMode } from "@/components/LogoAndMode";

interface TodoItem {
  text: string;
  selectedTime: number;
  selectedColor: string;
}

interface TaskModalProps {
  isEditTodoItem: boolean;
  isDarkMode: boolean;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  setInputValue: (inputValue: string) => void;
  setEditInputValue: (editInputValue: string) => void;
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  timeValue: number | null;
  setTimeValue: (time: number | null) => void;
  handleTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteAll: () => void;
  // handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveButtonClick: () => void;
  showModal: boolean;
  initialValues: { color: string; time: number; text: string };
}

const TaskModal: React.FC<
  TaskModalProps & { inputValue: string; editInputValue: string }
> = ({
  isEditTodoItem,
  isDarkMode,
  selectedColor,
  setSelectedColor,
  selectedTime,
  setSelectedTime,
  handleTime,
  handleDeleteAll,
  setEditInputValue,
  onSaveButtonClick,
  inputValue,
  editInputValue,
  setInputValue,
  timeValue,
  setTimeValue,
  showModal,
  initialValues,
}) => {
  const clearInputValue = () => {
    setEditInputValue("");
  };

  const clearTimeValue = () => {
    setSelectedTime(Number(0));
    setTimeValue(0);
  };

  const textareaRef = useRef(null);

  const handleResizeHeight = (
    // event: React.ChangeEvent<HTMLTextAreaElement>
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const trimmedValue = event.target.value;
    // const textarea = textareaRef.current;
    // if (!textarea) return;

    // // 텍스트에어리어의 높이를 "auto"로 설정하여 실제 높이를 계산
    // textarea.style.height = "auto";
    // const scrollHeight = textarea.scrollHeight;
    // if (scrollHeight > 76) {
    //   // 76px를 초과하는 경우 이전 값을 사용하고 더 이상의 입력을 허용하지 않음
    //   event.preventDefault();
    //   textarea.value = editInputValue; // 이전 값으로 되돌림
    // } else {
    //   // 76px 이하인 경우 정상적으로 값 설정
    //   textarea.style.height = `${scrollHeight}px`;
    //   setEditInputValue(trimmedValue);
    // }
    setEditInputValue(trimmedValue);
  };

  useEffect(() => {
    if (!showModal) {
      setInputValue("");
      setEditInputValue("");
      setSelectedTime(0);
      setSelectedColor("");
      // if (textareaRef.current) {
      //   textareaRef.current.style.height = "50px"; // 모달이 닫힐 때 높이 초기화
      // }
    }
  }, [showModal]);

  console.log(initialValues, "initial?");
  return (
    <div
      className={`${
        isEditTodoItem
          ? "fixed right-0 left-0 bottom-0 bg-black bg-opacity-50 z-50 top-[60px]"
          : "absolute top-[369px] rounded-xl"
      } flex justify-center items-center shadow-custom`}
    >
      <div className="inset-x-0 bottom-50 w-[360px] bg-opacity-50 flex justify-start items-center">
        <div
          className="px-[20px] py-[24px] w-full h-full flex rounded-xl flex-col"
          style={{
            border: "1px solid #27272766",
            backgroundColor: "#FFFFFF",
          }}
        >
          {isEditTodoItem && (
            <div className="relative w-[320px] mb-[24px]">
              {/* <textarea
                className="flex w-[318px] border-1 outline-none rounded-lg px-[16px] py-[12px] text-start border-gray-500 text-gray-700 pr-10"
                style={{ border: "1px solid #00000026", height: "50px" }}
                value={editInputValue}
                ref={textareaRef}
                onChange={handleResizeHeight}
                placeholder="Todo명은 최대 2줄까지 입력할 수 있습니다."
              /> */}
              <input
                className="flex w-[320px] h-[50px] border-1 rounded-lg px-[16px] py-[12px] text-start border-gray-500 text-gray-700 pr-10"
                style={{ border: "1px solid #00000026" }}
                value={editInputValue}
                onChange={handleResizeHeight}
                placeholder="Todo명은 최대 2줄까지 입력할 수 있습니다."
              />
              <img
                src="/close.svg"
                alt="Close"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={clearInputValue}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
          )}
          <h2
            className="text-lg w-[320px] h-[26px] mb-[8px]"
            style={{ color: "#000000" }}
          >
            컬러
          </h2>
          <div className="flex flex-row w-[200px] h-[32px] gap-x-[12px] relative">
            {[
              { color: "black", hex: "black" },
              { color: "pink", hex: "#EE81C8" },
              { color: "orange", hex: "#FF734B" },
              { color: "yellow", hex: "#FFD44F" },
              { color: "green", hex: "#35C792" },
            ].map((btnColor) => (
              <div key={btnColor.color} className="relative w-[32px] h-[32px]">
                <button
                  className={"flex w-full h-full rounded-md text-white"}
                  style={{ backgroundColor: btnColor.hex }}
                  onClick={() => setSelectedColor(btnColor.hex)}
                ></button>
                {selectedColor === btnColor.hex && (
                  <img
                    src="/check.svg"
                    alt="check"
                    className="absolute inset-0 m-auto"
                    style={{ width: "16px", height: "16px" }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <h2 className="mt-[24px] text-lg" style={{ color: "#000000" }}>
              포커스 시간
            </h2>
            <div className="flex flex-row w-full mt-[8px] gap-x-[12px] ">
              {[10, 15, 20, 25, 30, 45, 55].map((time) => (
                <button
                  key={time}
                  className={`flex w-[35.5px] h-[44px] text-center items-center justify-center border rounded-md mb-2 text-[17px] ${
                    selectedTime == time
                      ? "bg-black text-white"
                      : "text-black bg-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedTime(time);
                    setTimeValue(time);
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="relative mt-[12px] w-[320px]">
              <input
                type="number"
                value={timeValue !== null ? timeValue.toString() : ""}
                placeholder="직접입력 (분으로만 적어주세요)"
                style={{
                  color: isDarkMode ? "#FFFFFF" : "#000000",
                  border: "1px solid #D8DADC",
                  outline: "none",
                }}
                onChange={(event) => handleTime(event)}
                className="text-start h-[50px] w-full pl-4 pr-10 items-center rounded-lg"
              />
              <img
                src="/close.svg"
                alt="Close"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={clearTimeValue}
              />
            </div>
          </div>
          <div className="flex flex-row mt-[28px] w-[320px] gap-x-[8px]">
            <button
              className="flex-1 w-[156px] h-[44px] rounded-md bg-white text-black mr-2"
              style={{ border: "1px solid black" }}
              onClick={handleDeleteAll}
            >
              Delete
            </button>
            <button
              className={`flex-1 w-[156px] h-[44px] rounded-md ${
                isEditTodoItem
                  ? initialValues.color !== selectedColor ||
                    initialValues.time !== selectedTime ||
                    initialValues.text.trim() !== editInputValue.trim()
                    ? "bg-black text-white"
                    : "bg-gray-300 text-white"
                  : ((timeValue !== null && timeValue > 0) ||
                      selectedTime > 0) &&
                    selectedColor &&
                    inputValue.length > 0
                  ? "bg-black text-white"
                  : "bg-gray-300 text-white"
              }`}
              onClick={onSaveButtonClick}
              disabled={
                isEditTodoItem &&
                initialValues.color === selectedColor &&
                initialValues.time === selectedTime &&
                initialValues.text.trim() === editInputValue.trim()
              }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      // Ensure the input fields are also updated to reflect the selected task's data
      setInputValue(task.text);
      setEditInputValue(task.text);
      setSelectedColor(task.selectedColor);
      setSelectedTime(task.selectedTime);
      setTimeValue(task.selectedTime);
    } else if (!showModal) {
      // Reset initial values when the modal is closed
      setInitialValues({ color: "", time: 0, text: "" });
      setInputValue("");
      setEditInputValue("");
      // setSelectedColor("black"); // or your default value
      // setSelectedTime(0);
      // setTimeValue(null);
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

  // const textareaRef = useRef(null);

  // const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const trimmedValue = event.target.value;
  //   const textarea = textareaRef.current;
  //   if (!textarea) return;

  //   // 텍스트에어리어의 높이를 "auto"로 설정하여 실제 높이를 계산
  //   textarea.style.height = "auto";
  //   const scrollHeight = textarea.scrollHeight;
  //   if (scrollHeight > 76) {
  //     // 76px를 초과하는 경우 이전 값을 사용하고 더 이상의 입력을 허용하지 않음
  //     event.preventDefault();
  //     textarea.value = inputValue; // 이전 값으로 되돌림
  //   } else {
  //     // 76px 이하인 경우 정상적으로 값 설정
  //     textarea.style.height = `${scrollHeight}px`;
  //   }
  //   setInputValue(trimmedValue);
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value;
    setInputValue(trimmedValue);
  };

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const parsedValue = inputValue !== "" ? parseInt(inputValue) : null;
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
    setSelectedTodoTask(null);
    setShowModal(false);
    setInitialValues({ color: "", time: 0, text: "" });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main
      className="flex fixed w-full items-center justify-center"
      style={{ backgroundColor: `${!isDarkMode ? "#FFFFFF" : "#000000"}` }}
    >
      <div className="flex flex-col w-[1040px] min-h-screen">
        <LogoAndMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="w-[1040px] max-h-[867px] mb-[105px] mt-[56px] flex flex-row">
          <div className="w-[360px] ">
            <h1
              className="text-[40px]"
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
                <input
                  className="flex w-[296px] h-[56px] outline-none border-1 rounded-lg px-5 py-4 text-start"
                  style={{ border: "1px solid #27272766", color: "#22222280" }}
                  value={inputValue}
                  onChange={(event) => handleInputChange(event)}
                  placeholder="Todo를 적어주세요."
                ></input>
                {/* <textarea
                  className="flex w-[296px] border-1 outline-none rounded-lg px-[20px] py-[16px] text-start border-gray-500 text-gray-700"
                  style={{ border: "1px solid #00000026", height: "56px" }}
                  value={inputValue}
                  ref={textareaRef}
                  onChange={(event) => handleInputChange(event)}
                  placeholder="Todo를 적어주세요."
                /> */}
                <button
                  className="w-[56px] h-[56px] ml-[8px] rounded-xl text-[30px]"
                  style={{
                    color: `${!isDarkMode ? "#FFFFFF" : "#000000"}`,
                    backgroundColor: `${isDarkMode ? "#FFFFFF" : "#000000"}`,
                  }}
                  onClick={() => setShowModal(true)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="max-h-[618px] overflow-y-scroll">
              {todoItem.map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: `1px solid ${
                      selectedTodoTask === index
                        ? `${item.selectedColor}`
                        : "#27272766"
                    }`, // 선택된 경우 2px로 조건 주기
                    borderColor:
                      selectedTodoTask === index
                        ? `${item.selectedColor}`
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
                  <br />
                  <div
                    style={{ color: `${isDarkMode ? "#FFFFFF" : "#000000"}` }}
                    className="mt-[12px] text-[20px] max-w-[380px] overflow-hidden truncate line-clamp-20"
                  >
                    {item.text}
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
