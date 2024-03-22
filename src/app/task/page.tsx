'use client'
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

import '../globals.css';

export default function Task() {
  // const router = useRouter();
  // 클라이언트 측에서만 localStorage 사용하도록 지정
  const selectedColor = typeof window !== 'undefined' ? localStorage.getItem('selectedColor') || 'black' : 'black'; 
  const [countdown, setCountdown] = useState(typeof window !== 'undefined' ? Number(localStorage.getItem('selectedTime') || 10) * 60 : 10 * 60); 
  const [timerId, setTimerId] = useState<number | null>(null); // 타이머 ID
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []);
  
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

    const handleStart = () => {
      setIsRunning(true);
    };
  
    const handleStop = () => {
      setIsRunning(false);
    };
  
    return (
        <div className={`w-full h-screen flex flex-col items-center justify-center bg-${selectedColor}-500`}>
            <div className="text-6xl text-white">{formatTime(countdown)}</div>
            <div className="mt-4">
        <div className='flex flex-col gap-y-[15px]'>
          <button className="bg-black w-[200px] text-white px-4 py-2 rounded-md mr-4" onClick={handleStart}>
            Start
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-md mr-4" onClick={handleStop}>
            Stop
          </button>
        </div>
      </div>
        </div>
    );
}

