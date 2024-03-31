'use client'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import '../globals.css';
import { LogoAndMode } from '@/components/LogoAndMode';

export default function Task() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    typeof window !== 'undefined' ? localStorage.getItem('isDarkMode') === 'true' : false
  );  
  const selectedColor = typeof window !== 'undefined' ? localStorage.getItem('selectedColor') || 'black' : 'black'; 
  const [countdown, setCountdown] = useState(typeof window !== 'undefined' ? Number(localStorage.getItem('selectedTime') || 10) * 60 : 10 * 60); 
  const [timerId, setTimerId] = useState<number | null>(null); // 타이머 ID
  const [isRunning, setIsRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    // URL 쿼리 매개변수 파싱
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const isDarkModeParam = urlParams.get('isDarkMode');
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
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
        return `00:${formattedMinutes}:${formattedSeconds}`;
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
    
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode); 
    };
    
    useEffect(() => {
      localStorage.setItem('isDarkMode', isDarkMode.toString());
    }, [isDarkMode]);
  
    return (
      <main className='flex flex-col w-full h-screen items-center justify-center' style={{backgroundColor: `${selectedColor !== 'black' ? selectedColor : isDarkMode ? 'white' : 'black'}`, color: `${selectedColor === 'black' && !isDarkMode ? 'white' : 'black'}`}}>
        <div className='flex flex-col w-[1040px] h-full'>
          <LogoAndMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
        </div>
        <div className='w-[640px] h-[732px] mb-[241px] flex flex-col items-center justify-center'>
        <div className="text-[56px] h-[78px]" style={{color: `${selectedColor !== 'black' ? 'rgba(255, 255, 255, ' : isDarkMode ? 'rgba(0, 0, 0, ' : 'rgba(255, 255, 255, '}${timerFinished ? '0.7)' : '1)'}`}}>{formatTime(countdown)}</div>
          <div className="mt-4">
            <div className='flex flex-col items-center justify-center gap-y-[8px]'>
              <button 
                style={{color: `${selectedColor !== 'black' ? selectedColor : isDarkMode ? 'white' : 'black'}`}}
                className={`w-[248px] h-[66px] py-4 px-6 rounded-lg text-lg
                            ${selectedColor === 'black' && isDarkMode ? 'bg-black text-white' : 'bg-white text-' + selectedColor}`}
                onClick={isRunning ? handleStartStop : timerFinished ? handleRestart : handleStartStop}
              >
                {isRunning ? 'Stop' : timerFinished ? 'Restart' : 'Start'}
              </button>
              <button 
                style={{color: `${selectedColor !== 'black' ? selectedColor : isDarkMode ? 'white' : 'black'}`}}
                className={`w-[248px] h-[66px] py-4 px-6 rounded-lg text-lg
                            ${selectedColor === 'black' && isDarkMode ? 'bg-black text-white' : 'bg-white text-' + selectedColor}`}
                onClick={handleFinish}
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </main>
  );
}

