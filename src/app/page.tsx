'use client'
import { useState } from 'react';
import './globals.css';

export default function Home() {
  const [todoItem, setTodoItem] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const addTodoItem = () => {
    if (inputValue.trim() !== '') {
      setTodoItem([...todoItem, inputValue]);
      setInputValue('');
    }
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
            <button className='w-[50px] h-[50px] bg-black rounded-lg text-white text-[30px]' onClick={addTodoItem}>+</button>
          </div>
        </div>
        {todoItem.map((item, index) => (
          <div key={index} className="border-1 w-[240px] h-[50px] border-gray-600 mt-4">
            {item}
          </div>
        ))}
      </div>
    </main>
  );
}
