import React, { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";

export interface TodoItem {
  text: string;
  selectedTime: number;
  selectedColor: string;
}

export interface TaskModalProps {
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
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveButtonClick: () => void;
  showModal: boolean;
  initialValues: { color: string; time: number; text: string };
  textareaHeight: number;
}

export const TaskModal: React.FC<
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
  textareaHeight,
}) => {
  const clearInputValue = () => {
    setEditInputValue("");
  };

  const clearTimeValue = () => {
    setSelectedTime(Number(0));
    setTimeValue(0);
  };

  const handleResizeHeight = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const trimmedValue = event.target.value;
    setEditInputValue(trimmedValue);
  };

  useEffect(() => {
    if (!showModal) {
      setInputValue("");
      setEditInputValue("");
      setSelectedTime(0);
      setSelectedColor("");
    }
  }, [showModal]);

  const calculateTop = () => {
    if (isEditTodoItem) {
      return "60px"; // 수정 모드일 때 상단 고정
    } else {
      return textareaHeight > 58 ? "366px" : "346px"; // 뷰 모드일 때 조건부 위치
    }
  };

  return (
    <div
      className={`${
        isEditTodoItem
          ? "fixed right-0 left-0 bottom-0 bg-black bg-opacity-50 z-50 "
          : "absolute rounded-xl"
      } flex justify-center items-center shadow-custom`}
      style={{ top: calculateTop() }}
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
              <TextareaAutosize
                cacheMeasurements
                className="flex w-[318px] min-h-[50px] resize-none max-h-[76px] overflow-hidden border-1 outline-none rounded-lg px-[16px] py-[12px] text-start border-gray-500 text-gray-700 pr-10 placeholder-custom-gray"
                style={{ border: "1px solid #27272766" }}
                minRows={1}
                maxRows={2}
                value={editInputValue}
                maxLength={35}
                onChange={handleResizeHeight}
                placeholder="Todo명은 최대 2줄까지 입력할 수 있습니다."
              />
              <Image
                src="/Image/close.svg"
                alt="Close"
                width={20}
                height={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={clearInputValue}
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
                  <Image
                    src="/Image/check.svg"
                    alt="check"
                    className="absolute inset-0 m-auto"
                    width={16}
                    height={16}
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
              <Image
                src="/Image/close.svg"
                alt="Close"
                width={20}
                height={20}
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

export default TaskModal;
