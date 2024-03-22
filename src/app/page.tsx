'use client'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import './globals.css';

interface TodoItem {
  text: string
  selectedTime: number
  selectedColor: string
}

export default function Home() {
  const router = useRouter(); 
  const pathname = usePathname();
  const getInitialTodoItems = (): TodoItem[] => {
    const storedItemsJson = localStorage.getItem('todoItems');
    return storedItemsJson ? JSON.parse(storedItemsJson) : [];
  };
  
  const [todoItem, setTodoItem] = useState<TodoItem[]>(getInitialTodoItems);
  
  const [inputValue, setInputValue] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(
    typeof window !== 'undefined' ? localStorage.getItem('selectedColor') || 'black' : 'black'
  );
  const selectedTimeFromStorage = typeof window !== 'undefined' ? localStorage.getItem('selectedTime') : null;
  const initialSelectedTime = selectedTimeFromStorage ? parseInt(selectedTimeFromStorage) : 10;
  const [selectedTime, setSelectedTime] = useState<number>(initialSelectedTime);
  const [selectedTodoTask, setSelectedTodoTask] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [storedItems, setStoredItems] = useState<TodoItem[]>([]); // 상태로 변경

  useEffect(() => {
    const storedColor = localStorage.getItem('selectedColor');
    const storedTime = localStorage.getItem('selectedTime');

    if (storedColor) {
      setSelectedColor(storedColor);
    }
    if (storedTime) {
      setSelectedTime(parseInt(storedTime));
    }

    const storedItemsJson = localStorage.getItem('todoItems');
    if (storedItemsJson) {
      const parsedItems = JSON.parse(storedItemsJson);
      setTodoItem(parsedItems); // 초기 todoItem 상태 설정
      console.log(todoItem,'!!!!!!!!!!!!')
      setStoredItems(parsedItems); // 초기 storedItems 상태 설정
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedColor', selectedColor);
  }, [selectedColor]);

  useEffect(() => {
    localStorage.setItem('selectedTime', selectedTime.toString());
  }, [selectedTime]);

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(todoItem));
  }, [todoItem]);

  useEffect(() => {
    console.log(isDarkMode, "dark?????????")
  }, [isDarkMode]);


  const handleTodoTaskClick = (index: number) => {
    setSelectedTodoTask(index);
    const selectedTask = todoItem[index];
    setSelectedColor(selectedTask.selectedColor);
    setSelectedTime(selectedTask.selectedTime);
    console.log(selectedColor, selectedTask,selectedTime)
    localStorage.setItem('selectedTime', selectedTime.toString());
    localStorage.setItem('selectedColor', selectedColor);
  };

const handleStartButtonClick = () => {
  if (selectedTodoTask !== null) {
      const selectedTask = todoItem[selectedTodoTask];
      const { selectedTime, selectedColor } = selectedTask;
      router.push(`/task?time=${selectedTime}&color=${selectedColor}`);
  }
};


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const addTodoItem = () => {
    if (inputValue.trim() !== '') {
      const newItem: TodoItem = {
        text: inputValue,
        selectedTime: selectedTime,
        selectedColor: selectedColor
      }
      setTodoItem([...todoItem, newItem])
      setStoredItems([...storedItems, newItem]);
      setInputValue('');
      setShowModal(false)
      
    }
  };

  const handleDeleteAll = () => {
    setTodoItem([]);
    setStoredItems([]);
    setShowModal(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (

    <main className="flex min-h-screen w-full" style={{backgroundColor: `${!isDarkMode ? '#FFFFFF' : '#000000'}`}}>
      <div className='flex flex-col w-full mx-[200px]'>
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
      <div className="">
        <h1 className='text-[40px] mt-[30px]' style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>
        Hello,<br/>
        let&apos;s focus today.</h1>
        <div className='flex w-[360px] mt-[50px]'>
          <div className='flex flex-row'>
            <textarea className='flex w-[296px] h-[56px] border-1 border-gray-500 text-start text-gray-700'  
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder='Todo를 적어주세요.'></textarea>
            <button className='w-[56px] h-[56px] ml-[20px] rounded-lg text-[30px]'  style={{color: `${!isDarkMode ? '#FFFFFF' : '#000000'}`, backgroundColor: `${isDarkMode ? '#FFFFFF' : '#000000'}`}} onClick={() => setShowModal(true)}>+</button>
          </div>
        </div>
        {todoItem.map((item, index) => (
            <div key={index} className={`border-1 rounded-xl w-[380px] py-[10px] border-gray-700 h-[136px] my-8 cursor-pointer ${selectedTodoTask === index ? 'border-' + item.selectedColor : ''}`} onClick={() => handleTodoTaskClick(index)}>
            <div className='flex flex-row gap-x-[5px] items-center'>
              <div style={{backgroundColor: `${item.selectedColor}`}} className='mx-[10px] w-[16px] h-[16px] rounded-xl'/>
              <div  style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>{item.selectedTime}min</div>
            </div>
            <br/>
            <div  style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}} className='my-[10px] mx-[10px] text-[20px] max-w-[380px] overflow-hidden truncate line-clamp-20'>
            {item.text}
            </div>
          </div>
        ))}
        {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 w-[360px] h-[400px] flex flex-col">
            <h2 className="text-lg font-semibold mb-4"  style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>컬러</h2>
            <div className="flex flex-row w-[200px] h-[30px] my-2 ">
              <button
                className={`flex w-[30px] h-[30px] rounded-md bg-black text-white mr-2 ${selectedColor === 'black' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('black')}
              >
              </button>
              <button
                className={`flex bg-pink-500 w-[30px] h-[30px] rounded-md text-white mr-2 ${selectedColor === 'pink' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('pink')}
              >
              </button>
              <button
                className={`flex bg-orange-500 w-[30px] h-[30px] rounded-md text-white mr-2 ${selectedColor === 'orange' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('orange')}
              >
              </button>
              <button
                className={`flex bg-yellow-500 w-[30px] h-[30px] rounded-md text-white mr-2 ${selectedColor === 'yellow' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('yellow')}
              >
              </button>
              <button
                className={`flex bg-green-500 w-[30px] h-[30px] rounded-md text-white ${selectedColor === 'green' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('green')}
              >
              </button>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold"  style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>시간</h2>
              <div className='flex flex-row'>
              {[10, 15, 20, 25, 30, 45, 55].map((time) => (
                <button
                  key={time}
                  className={`flex mt-[10px] w-[30px] h-[30px] text-center items-center justify-center bg-gray-300 border rounded-md mr-2 mb-2 ${selectedTime === time ? 'bg-gray-300' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))} 
              </div>
              <textarea placeholder='직접입력' style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}></textarea>
            </div>
            <div className="flex flex-row mt-[20px]">
              <button
                className="flex-1 h-[40px] rounded-md bg-gray-300 text-black mr-2"
                onClick={handleDeleteAll}
              >
                Delete
              </button>
              <button
                className="flex-1 h-[40px] rounded-md bg-black text-white"
                onClick={addTodoItem}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedTodoTask !== null && (
        <div className="flex flex-col max-w-[250px] max-h-[300px] items-center text-center justify-center relative">
          <div className={`flex flex-col max-h-[200px] items-center justify-center mb-4`}>
          <div className={`w-full h-[100px] text-[60px] text-${selectedColor} mb-4`}>00:{selectedTime}:00</div>
          <button
            className={`${
              selectedColor === 'black' ? 'bg-black' : `bg-${selectedColor}-500`
            } w-[180px] h-[40px] text-white px-4 py-2 rounded-lg`}
            onClick={handleStartButtonClick}
          >
            Start
          </button>
          </div>
          <style jsx>{`
          .relative {
            position: absolute;
            left: 60%;
            bottom: 350px; // 오른쪽으로 150px 이동
          }
        `}</style>
        </div>
      )}
      </div>
      </div>
    </main>
  );
}
