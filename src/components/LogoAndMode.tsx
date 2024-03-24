import React from 'react';

interface LogoAndModeProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}


export const LogoAndMode: React.FC<LogoAndModeProps> = ({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) => {
    return (
      <div className='flex flex-row pt-[20px] items-center justify-between'>
      <div className='flex flex-row items-center'>
        <div style={{backgroundColor: `${isDarkMode ? '#FFFFFF' : '#000000'}`}} className='mr-[10px] w-[16px] h-[16px] rounded-full'/>
        <div style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>focus today</div>
      </div>
      <div className='flex flex-row' style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>Dark mode:          
      <button
        className={`ml-2 w-[40px] h-[20px] rounded-full bg-gray-300 relative focus:outline-none overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-300'}`}
        onClick={toggleDarkMode}
      >
        <div className={`left-1 w-[15px] h-[15px] items-center rounded-full transition-transform duration-300 transform ${isDarkMode ? 'translate-x-[20px] bg-black' : 'translate-x-1  bg-white'}`}></div>
      </button>
  
      </div>
    </div>
    )
  }