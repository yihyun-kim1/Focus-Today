'use client'
import { useState } from 'react';
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
  const [todoItem, setTodoItem] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedTime, setSelectedTime] = useState<number>(10);
  const [selectedTodoTask, setSelectedTodoTask] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleTodoTaskClick = (index: number) => {
    setSelectedTodoTask(index);
    // router.push('/task');
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
      setInputValue('');
      setShowModal(false)
    }
  };

  const handleDeleteAll = () => {
    setTodoItem([]);
    setShowModal(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (

    <main className="flex min-h-screen flex-col bg-white ">
      <div className="py-[100px] mx-[200px] w-[360px] ">
        <h1 className='text-[40px]'>
        Hello,<br/>
        let&apos;s focus today.</h1>
        <div className='flex w-[360px] mt-[50px]'>
          <div className='flex flex-row'>
            <textarea className='flex w-[296px] h-[56px] border-1 border-gray-500 text-start text-gray-700'  
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder='Todo를 적어주세요.'></textarea>
            <button className='w-[56px] h-[56px] ml-[20px] bg-black rounded-lg text-white text-[30px]' onClick={() => setShowModal(true)}>+</button>
          </div>
        </div>
        {todoItem.map((item, index) => (
            <div key={index} className={`border-1 w-[380px] h-[136px] my-8 cursor-pointer ${selectedTodoTask === index ? 'border-' + item.selectedColor : ''}`} onClick={() => handleTodoTaskClick(index)}>
            <div className='flex flex-row gap-x-[5px] items-center'>
              <div style={{backgroundColor: `${item.selectedColor}`}} className='w-[16px] h-[16px] rounded-xl'/>
              <div>{item.selectedTime}min</div>
            </div>
            <br/>
            <div className='my-[10px]'>
            {item.text}
            </div>
          </div>
        ))}
        {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 w-[360px] h-[400px] flex flex-col">
            <h2 className="text-lg font-semibold mb-4">컬러</h2>
            <div className="flex flex-row mb-4">
              <button
                className={`flex-1 w-[30px] h-[30px] bg-black text-white mr-2 ${selectedColor === 'black' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('black')}
              >
              </button>
              <button
                className={`flex-1 bg-pink-500 text-white mr-2 ${selectedColor === 'pink' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('pink')}
              >
              </button>
              <button
                className={`flex-1 bg-orange-500 text-white mr-2 ${selectedColor === 'orange' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('orange')}
              >
              </button>
              <button
                className={`flex-1 bg-yellow-500 text-white mr-2 ${selectedColor === 'yellow' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('yellow')}
              >
              </button>
              <button
                className={`flex-1 bg-green-500 text-white ${selectedColor === 'green' ? 'border-2 border-gray-800' : ''}`}
                onClick={() => setSelectedColor('green')}
              >
              </button>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">시간</h2>
              <div className='flex flex-row'>
              {[10, 15, 20, 25, 30, 45, 55].map((time) => (
                <button
                  key={time}
                  className={`flex-1 mt-[10px] bg-white border border-gray-800 mr-2 ${selectedTime === time ? 'bg-gray-300' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))} 
              </div>
              <textarea placeholder='직접입력'></textarea>
            </div>
            <div className="flex flex-row mt-[20px]">
              <button
                className="flex-1 bg-gray-300 text-black mr-2"
                onClick={handleDeleteAll}
              >
                Delete
              </button>
              <button
                className="flex-1 bg-gray-300 text-white"
                onClick={addTodoItem}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </main>
  );
}
