'use client'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import './globals.css';

interface TodoItem {
  text: string
  selectedTime: number
  selectedColor: string
}


interface TaskModalProps {
  isEditTodoItem: boolean;
  isDarkMode: boolean;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  handleTime: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDeleteAll: () => void;
  onSaveButtonClick: () => void;
}



const TaskModal: React.FC<TaskModalProps> = ({
  isEditTodoItem,
  isDarkMode,
  selectedColor,
  setSelectedColor,
  selectedTime,
  setSelectedTime,
  handleTime,
  handleDeleteAll,
  onSaveButtonClick,
  }) => {
return (
  <div className={`absolute flex top-[69%] ${isEditTodoItem ? 'left-[33%]' : ''} justify-center items-center`}>
    <div className="absolute inset-x-0 bottom-0 w-[380px] bg-opacity-50 flex justify-start items-center">
    <div className="bg-white p-8 top-50% w-full h-[340px] flex rounded-xl flex-col" style={{border: '1px solid #000000'}}>
      <h2 className="text-lg font-semibold mb-4"  style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>컬러</h2>
      <div className="flex flex-row w-[200px] h-[30px] my-2 ">
        <button
          className={`flex w-[30px] h-[30px] rounded-md bg-black text-white mr-2 ${selectedColor === 'black' ? 'border-2 border-gray-800' : ''}`}
          onClick={() => setSelectedColor('black')}
        >
        </button>
        <button
          className={`flex w-[30px] h-[30px] rounded-md text-white mr-2 ${selectedColor === 'pink' ? 'border-2 border-gray-800' : ''}`}
          style={{backgroundColor: '#EE81C8'}}
          onClick={() => setSelectedColor('#EE81C8')}
        >
        </button>
        <button
          className={`flex w-[30px] h-[30px] rounded-md text-white mr-2 ${selectedColor === 'orange' ? 'border-2 border-gray-800' : ''}`}
          style={{backgroundColor: '#FF734B'}}
          onClick={() => setSelectedColor('#FF734B')}
        >
        </button>
        <button
          className={`flex w-[30px] h-[30px] rounded-md text-white mr-2 ${selectedColor === 'yellow' ? 'border-2 border-gray-800' : ''}`}
          style={{backgroundColor: '#FFD44F'}}
          onClick={() => setSelectedColor('#FFD44F')}
        >
        </button>
        <button
          className={`flex w-[30px] h-[30px] rounded-md text-white ${selectedColor === 'green' ? 'border-2 border-gray-800' : ''}`}
          style={{backgroundColor: '#35C792'}}
          onClick={() => setSelectedColor('#35C792')}
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
        <textarea placeholder='직접입력 (분으로만 적어주세요)' style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}} onChange={handleTime}></textarea>
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
          onClick={onSaveButtonClick}
        >
          Save
        </button>
      </div>
    </div>
    </div>
  </div>
  )
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
  const [isEditTodoItem, setIsEditTodoItem] = useState<boolean>(false); 

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
    console.log(selectedColor, selectedTask, selectedTime)
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

  const handleTime = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedTime(Number(event.target.value))
  }

  const addTodoItem = () => {
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<')
    if (inputValue.trim() !== '' || isEditTodoItem) {
      const newItem: TodoItem = {
        text: (isEditTodoItem && selectedTodoTask !== null && inputValue.trim() !== '') ? inputValue : (selectedTodoTask !== null ? todoItem[selectedTodoTask].text : ''),
        selectedTime: isEditTodoItem && selectedTodoTask !== null ? selectedTime : localStorage.selectedTime || selectedTime,
        selectedColor: isEditTodoItem && selectedTodoTask !== null ? selectedColor : localStorage.selectedColor || selectedColor
      };

      if (isEditTodoItem && selectedTodoTask !== null) {
        // 수정 모달에서 저장 버튼을 누른 경우
        const updatedItems = [...todoItem];
        updatedItems[selectedTodoTask] = newItem;
        setTodoItem(updatedItems);
        setStoredItems(updatedItems);
        console.log(updatedItems,'update!')
      } else {
        // 새로운 todo 항목을 추가하는 경우
        setTodoItem([...todoItem, newItem]);
        setStoredItems([...storedItems, newItem]);
      }
      
      setInputValue('');
      setShowModal(false);
      setIsEditTodoItem(false);
      setSelectedTodoTask(null);
      
    }
  };

  const editTodoItem = (index: number) => {
    setSelectedTodoTask(index); // 현재 선택된 todo 항목의 인덱스 저장
    setIsEditTodoItem(true);
    setShowModal(true);
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
      <div className="mt-[40px] overflow-y-auto max-h-[calc(100vh - 40px)]">
        <h1 className='text-[40px] mt-[30px]' style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>
        Hello,<br/>
        let&apos;s focus today.</h1>
        <div className='flex w-[360px] mt-[50px]'>
          <div className='flex flex-row'>
            <textarea className='flex w-[315px] h-[56px] border-1 rounded-lg px-5 py-4 text-start border-gray-500 text-gray-700'  style={{border: '1px solid #00000026'}}
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder='Todo를 적어주세요.'></textarea>
            <button className='w-[56px] h-[56px] ml-[10px] rounded-xl text-[30px]'  style={{color: `${!isDarkMode ? '#FFFFFF' : '#000000'}`, backgroundColor: `${isDarkMode ? '#FFFFFF' : '#000000'}`}} onClick={() => setShowModal(true)}>+</button>
          </div>
        </div>
        <div className='overflow-y-auto max-h-[calc(100vh - 100px)]'>
        {todoItem.map((item, index) => (
            <div
            key={index}
            style={{ 
              border: `1px solid ${selectedTodoTask === index ? `${item.selectedColor}` : '#D8D8D8'}`,
              borderColor: selectedTodoTask === index ? `${item.selectedColor}` : '#D8D8D8'
            }}
            className={`rounded-xl w-[380px] py-[10px] h-[136px] my-3 cursor-pointer`}
            onClick={() => handleTodoTaskClick(index)}
          >
            <div className='flex flex-row px-3 justify-between'>
              <div className='flex flex-row items-center'>
                <div style={{backgroundColor: `${item.selectedColor == 'black' && isDarkMode == true ? 'white' : item.selectedColor}`}} className='mr-[10px] w-[16px] h-[16px] rounded-full'/>
                <div  style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>{item.selectedTime}min</div>
              </div>
                <div onClick={()=>editTodoItem(index)}>Edit</div>
            </div>
            <br/>
            <div style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}} className='my-[10px] mx-[10px] text-[20px] max-w-[380px] overflow-hidden truncate line-clamp-20'>
            {item.text}
            </div>
          </div>
        ))}
        </div>
        {showModal && (
          <TaskModal
            isEditTodoItem={isEditTodoItem}
            isDarkMode={isDarkMode}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            handleTime={handleTime}
            handleDeleteAll={handleDeleteAll}
            onSaveButtonClick={addTodoItem} 
          />
        )}

      {selectedTodoTask !== null && (
        <div className="flex flex-col max-w-[250px] max-h-[300px] items-center text-center justify-center relative">
          <div className={`flex flex-col max-h-[200px] items-center justify-center mb-4`}>
          <div className={`w-full h-[100px] text-[60px] mb-4`} style={{ color: `${isDarkMode && selectedColor === 'black' ? '#FFFFFF' : selectedColor}` }}>00:{selectedTime}:00</div>
          <button
            className={`w-[180px] h-[40px] text-${isDarkMode==true ? 'black' : 'white'} px-4 py-2 rounded-lg`}
            style={{backgroundColor: `${selectedColor == 'black' && isDarkMode == true ? 'white' : selectedColor}`}}
            onClick={handleStartButtonClick}
          >
            Start
          </button>
          </div>
          <style jsx>{`
          .relative {
            position: absolute;
            left: 60%;
            bottom: 350px; 
          }
        `}</style>
        </div>
      )}
      </div>
      </div>
    </main>
  );
}
