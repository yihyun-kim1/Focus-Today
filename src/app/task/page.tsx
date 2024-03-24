'use client'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import '../globals.css';

export default function Task() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const selectedColor = typeof window !== 'undefined' ? localStorage.getItem('selectedColor') || 'black' : 'black'; 
  const [countdown, setCountdown] = useState(typeof window !== 'undefined' ? Number(localStorage.getItem('selectedTime') || 10) * 60 : 10 * 60); 
  const [timerId, setTimerId] = useState<number | null>(null); // 타이머 ID
  const [isRunning, setIsRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    // URL 쿼리 매개변수 파싱
    console.log(selectedColor)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const isDarkModeParam = urlParams.get('isDarkMode');
    setIsDarkMode(isDarkModeParam === 'true'); 
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
        setCountdown(prevCountdown => {
          if (prevCountdown === 0) {
            clearInterval(id);
            setIsRunning(false);
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
  

    const formatTime = (seconds:number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `00:${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleStartStop = () => {
      if (isRunning || timerFinished) {
        setIsRunning(false);
        setTimerFinished(false);
      } else {
        setIsRunning(true);
      }
    };

    const handleRestart = () => {
      setIsRunning(true);
      setTimerFinished(false);
      setCountdown(typeof window !== 'undefined' ? Number(localStorage.getItem('selectedTime') || 10) * 60 : 10 * 60);
    };
  
    const handleFinish = () => {
      router.back(); // 이전 페이지로 돌아가기
    };
    
  
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center' style={{backgroundColor:selectedColor}}>
            <div className="text-6xl text-white">{formatTime(countdown)}</div>
              <div className="mt-4">
                <div className='flex flex-col items-center justify-center gap-y-[15px]'>
                <button className={`w-[250px] x-4 py-2 rounded-md ${!isDarkMode && selectedColor !== 'black' ? `bg-white text-${selectedColor}` : isDarkMode && selectedColor === 'black' ? 'bg-black text-white' : ''} ${selectedColor === 'black' && !isDarkMode ? 'text-black' : ''}`} onClick={isRunning ? handleStartStop : timerFinished ? handleRestart : handleStartStop}>
                  {isRunning ? 'Stop' : timerFinished ? 'Restart' : 'Start'}
                </button>
                <button className={`w-[250px] px-4 py-2 rounded-md ${!isDarkMode && selectedColor !== 'black' ? `bg-white text-${selectedColor}` : isDarkMode && selectedColor === 'black' ? 'bg-black text-white' : ''} ${selectedColor === 'black' && !isDarkMode ? 'text-black' : ''}`} onClick={handleFinish}>
                    Finish
                  </button>
                </div>
            </div>
        </div>
    );
}

