"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import "../globals.css";
import { LogoAndMode } from "@/components/LogoAndMode";

export default function Task() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    typeof window !== "undefined"
      ? localStorage.getItem("isDarkMode") === "true"
      : false
  );
  const selectedColor =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedColor") || "black"
      : "black";
  const [countdown, setCountdown] = useState(
    typeof window !== "undefined"
      ? Number(localStorage.getItem("selectedTime") || 10) * 60
      : 10 * 60
  );
  const [timerId, setTimerId] = useState<number | null>(null); // 타이머 ID
  const [isRunning, setIsRunning] = useState(true);
  const [showControlButtons, setShowControlButtons] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

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

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setIsRunning(false);
      setTimerFinished(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(id);
            setIsRunning(false);
            setTimerFinished(true);
            setShowControlButtons(false);
            return 0;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
      setTimerId(Number(id));
      return () => clearInterval(id);
    }
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

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
    setTimerFinished(false);
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
        <div
          className="text-[56px] h-[78px]"
          style={{
            color: `${
              selectedColor !== "black"
                ? "rgba(255, 255, 255, "
                : isDarkMode
                ? "rgba(0, 0, 0, "
                : "rgba(255, 255, 255, "
            }${timerFinished || !isRunning ? "0.7)" : "1)"}`,
          }}
        >
          {formatTime(countdown)}
        </div>
        <div className="mt-4">
          <div className="flex flex-col items-center justify-center gap-y-[8px]">
            {!showControlButtons && isRunning && (
              <button
                style={{
                  color: `${
                    selectedColor !== "black"
                      ? selectedColor
                      : isDarkMode
                      ? "white"
                      : "black"
                  }`,
                }}
                className={`w-[248px] h-[66px] py-4 px-6 rounded-lg text-lg
                          ${
                            selectedColor === "black" && isDarkMode
                              ? "bg-black text-white"
                              : "bg-white text-" + selectedColor
                          }`}
                onClick={handlePause}
              >
                Pause
              </button>
            )}
            {showControlButtons && !timerFinished && (
              <>
                <button
                  style={{
                    color: `${
                      selectedColor !== "black"
                        ? selectedColor
                        : isDarkMode
                        ? "white"
                        : "black"
                    }`,
                  }}
                  className={`w-[248px] h-[66px] py-4 px-6 rounded-lg text-lg
                          ${
                            selectedColor === "black" && isDarkMode
                              ? "bg-black text-white"
                              : "bg-white text-" + selectedColor
                          }`}
                  onClick={handleResume}
                >
                  Resume
                </button>
                <button
                  style={{
                    color: `${
                      selectedColor !== "black"
                        ? selectedColor
                        : isDarkMode
                        ? "white"
                        : "black"
                    }`,
                  }}
                  className={`w-[248px] h-[66px] py-4 px-6 rounded-lg text-lg
                          ${
                            selectedColor === "black" && isDarkMode
                              ? "bg-black text-white"
                              : "bg-white text-" + selectedColor
                          }`}
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  style={{
                    color: `${
                      selectedColor !== "black"
                        ? selectedColor
                        : isDarkMode
                        ? "white"
                        : "black"
                    }`,
                  }}
                  className={`w-[248px] opacity-[80%] h-[66px] py-4 px-6 rounded-lg text-lg
                          ${
                            selectedColor === "black" && isDarkMode
                              ? "bg-black text-white"
                              : "bg-white text-" + selectedColor
                          }`}
                  onClick={handleStop}
                >
                  Stop
                </button>
              </>
            )}
            {!isRunning && timerFinished && (
              <>
                <button
                  style={{
                    color: `${
                      selectedColor !== "black"
                        ? selectedColor
                        : isDarkMode
                        ? "white"
                        : "black"
                    }`,
                  }}
                  className={`w-[248px] h-[66px] py-4 px-6 rounded-lg text-lg
                          ${
                            selectedColor === "black" && isDarkMode
                              ? "bg-black text-white"
                              : "bg-white text-" + selectedColor
                          }`}
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  style={{
                    color: `${
                      selectedColor !== "black"
                        ? selectedColor
                        : isDarkMode
                        ? "white"
                        : "black"
                    }`,
                  }}
                  className={`w-[248px] h-[66px] opacity-[80%] py-4 px-6 rounded-lg text-lg
                          ${
                            selectedColor === "black" && isDarkMode
                              ? "bg-black text-white"
                              : "bg-white text-" + selectedColor
                          }`}
                  onClick={handleStop}
                >
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
