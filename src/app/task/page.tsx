"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoAndMode } from "@/components/LogoAndMode";
import "../globals.css";
import { useOptionContext } from "../../../providers/option-provider";

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  style: string;
}

interface CountdownComponentProps {
  countdown: number;
  setCountdown: Function;
  selectedColor: string;
  isDarkMode: boolean;
  timerFinished: boolean;
  isRunning: boolean;
  setTimerIsFinished: Dispatch<SetStateAction<boolean>>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  style,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[248px] h-[66px] py-4 px-6 rounded-lg text-lg ${style}`}
    >
      {text}
    </button>
  );
};

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const CountdownComponent: React.FC<CountdownComponentProps> = ({
  countdown,
  setCountdown,
  selectedColor,
  isDarkMode,
  isRunning,
  setTimerIsFinished,
}) => {
  const initialTime =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("selectedTime") || 10) * 60
      : 10 * 60;

  useInterval(
    () => {
      if (countdown > 0 && isRunning) {
        setTimerIsFinished(false);
        setCountdown(countdown - 1);
      } else if (countdown === 0) {
        setTimerIsFinished(true);
      }
    },
    isRunning ? 1000 : null
  );

  const formattedTime = formatTime(countdown);

  return (
    <div
      className="text-[56px] h-[78px]"
      style={{
        color: `${
          selectedColor !== "black"
            ? "rgba(255, 255, 255, "
            : isDarkMode
            ? "rgba(0, 0, 0, "
            : "rgba(255, 255, 255, "
        }${!isRunning ? "0.7)" : "1)"}`,
      }}
    >
      {formattedTime}
    </div>
  );
};

export default function Task() {
  const router = useRouter();
  const [timerId, setTimerId] = useState<number | null>(null); // 타이머 ID
  const [isRunning, setIsRunning] = useState(true);
  const [showControlButtons, setShowControlButtons] = useState(false);
  const [timerFinished, setTimerIsFinished] = useState(false);
  const [countdown, setCountdown] = useState(
    typeof window !== "undefined"
      ? Number(localStorage.getItem("selectedTime") || 10) * 60
      : 10 * 60
  );
  const { isDarkMode, setIsDarkMode, selectedColor, setSelectedColor } =
    useOptionContext();

  const buttonStyle =
    selectedColor === "black" && isDarkMode
      ? "bg-black text-white"
      : `bg-white text-${selectedColor}`;

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const timeParam = urlParams.get("time");
    const parsedTime = parseInt(timeParam || "0") * 60; // 분 -> 초로 변환

    setCountdown(parsedTime);
    setIsRunning(true);

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []);

  const handlePause = () => {
    setIsRunning(false);
    setShowControlButtons(true);
  };

  const handleResume = () => {
    setIsRunning(true);
    setShowControlButtons(false);
  };

  const handleReset = () => {
    setIsRunning(true);
    setShowControlButtons(false);
    setTimerIsFinished(false);
    setCountdown(
      typeof window !== "undefined"
        ? Number(localStorage.getItem("selectedTime") || 10) * 60
        : 10 * 60
    );
  };

  const handleStop = () => {
    router.back();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <main
      className="flex flex-col w-full h-screen items-center justify-center"
      style={{
        backgroundColor: `${
          selectedColor !== "black"
            ? selectedColor
            : isDarkMode
            ? "white"
            : "black"
        }`,
        color: `${
          selectedColor === "black" && !isDarkMode ? "white" : "black"
        }`,
      }}
    >
      <div className="flex flex-col w-[1040px]">
        <LogoAndMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <div className="w-[640px] h-[732px] mb-[241px] flex flex-col items-center justify-center">
        <CountdownComponent
          countdown={countdown}
          setCountdown={setCountdown}
          selectedColor={selectedColor}
          isDarkMode={isDarkMode}
          isRunning={isRunning}
          timerFinished={timerFinished}
          setTimerIsFinished={setTimerIsFinished}
        />
        <div className="mt-4">
          <div className="flex flex-col items-center justify-center gap-y-[8px]">
            {!showControlButtons && isRunning && (
              <CustomButton
                text="Pause"
                onClick={handlePause}
                style={buttonStyle}
              />
            )}
            {showControlButtons && !timerFinished && (
              <>
                <CustomButton
                  text="Resume"
                  onClick={handleResume}
                  style={buttonStyle}
                />
                <CustomButton
                  text="Reset"
                  onClick={handleReset}
                  style={buttonStyle}
                />
                <CustomButton
                  text="Stop"
                  onClick={handleStop}
                  style={`${buttonStyle} opacity-[80%]`}
                />
              </>
            )}
            {!isRunning && timerFinished && (
              <>
                <CustomButton
                  text="Reset"
                  onClick={handleReset}
                  style={buttonStyle}
                />
                <CustomButton
                  text="Stop"
                  onClick={handleStop}
                  style={`${buttonStyle} opacity-[80%]`}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
