'use client'
import { useState } from 'react';
import './globals.css';

export default function Home() {
  const [todoItem, setTodoItem] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedTime, setSelectedTime] = useState<number>(10);


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const addTodoItem = () => {
    if (inputValue.trim() !== '') {
      setTodoItem([...todoItem, `${selectedTime}분 ${selectedColor} - ${inputValue}`]);
      setInputValue('');
      setShowModal(false)
    }
  };

  const handleDeleteAll = () => {
    setTodoItem([]);
    setShowModal(false);
  };

  return (

    <main className="flex min-h-screen flex-col bg-white ">
      <div className="py-[100px] mx-[200px] w-[360px] ">
        <h1 className='text-[40px]'>
        Hello,<br/>
        let's focus today.</h1>
        <div className='flex w-[360px] mt-[50px]'>
          <div className='flex flex-row'>
            <textarea className='flex w-[240px] h-[50px] border-1 border-black text-gray-600 text-center'  
                      value={inputValue}
                      onChange={handleInputChange}></textarea>
            <button className='w-[50px] h-[50px] bg-black rounded-lg text-white text-[30px]' onClick={() => setShowModal(true)}>+</button>
          </div>
        </div>
        {todoItem.map((item, index) => (
          <div key={index} className="border-1 w-[240px] h-[50px] border-gray-600 mt-4">
            {item}
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
