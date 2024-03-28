import React from 'react';

interface LogoAndModeProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}


export const LogoAndMode: React.FC<LogoAndModeProps> = ({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) => {
    return (
      <div className='flex flex-row py-[10px] h-[60px] items-center justify-between'>
      <div className='flex flex-row items-center'>
        <div style={{backgroundColor: `${isDarkMode ? '#FFFFFF' : '#000000'}`}} className='mr-[10px] w-[16px] h-[16px] rounded-full'/>
        <div style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>focus today</div>
      </div>
      <div className='flex flex-row' style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>Dark mode:          
      <button
        className={`ml-2 w-[40px] h-[22px] rounded-full bg-gray-300 relative focus:outline-none overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-white' : 'bg-gray-300'}`}
        style={{border: '1px solid black'}}
        onClick={toggleDarkMode}
      >
        <div className={`left-1 w-[15px] h-[15px] items-center rounded-full transition-transform duration-300 transform ${isDarkMode ? 'translate-x-[21px] bg-black' : 'translate-x-0.5  bg-white'}`}
        style={{border: '1px solid black'}}>
        </div>
      </button>
  
      </div>
    </div>
    )
  }