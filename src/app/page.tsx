'use client'
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import './globals.css';
import { LogoAndMode } from '@/components/LogoAndMode';

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
  setInputValue: (inputValue: string) => void;
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  // selectedTodoTaskHeight: number | null,
  timeValue: number | null,
  setTimeValue: (time: number | null) => void;
  handleTime: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteAll: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveButtonClick: () => void;
  showModal: boolean;
}

const TaskModal: React.FC<TaskModalProps & { inputValue: string }> = ({
  isEditTodoItem,
  isDarkMode,
  selectedColor,
  setSelectedColor,
  selectedTime,
  setSelectedTime,
  handleTime,
  handleDeleteAll,
  handleInputChange,
  onSaveButtonClick,
  inputValue,
  setInputValue,
  timeValue,
  setTimeValue,
  showModal,
  }) => {
  
  // const taskRef = useRef<HTMLDivElement>(null); 
  // const [selectedTodoTaskHeight, setSelectedTodoTaskHeight] = useState<number>(0); // 선택된 Task의 높이
  const [editInputValue, setEditInputValue] = useState<string>('');
  const clearTimeValue = () => {
  setSelectedTime(Number(0));// 이미지 클릭 시 입력 필드의 값을 지움
  setTimeValue(0)
};

const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const trimmedValue = event.target.value;
  setEditInputValue(trimmedValue);
  setInputValue(trimmedValue)
  // handleInputChange(trimmedValue); 
};

useEffect(() => {
  if (!showModal) {
    setInputValue('');
    setEditInputValue('');
    setSelectedTime(0);
    setSelectedColor('');
  }
}, [showModal]);

// useEffect(() => {
//   if (taskRef.current) {
//     const height = taskRef.current.offsetHeight;
//     setSelectedTodoTaskHeight(height);
//     console.log(height, 'heights!!');
//   }
// }, [isEditTodoItem, taskRef.current]);

  
return (
  // <div className={`absolute flex ${isEditTodoItem ? `top-[${selectedTodoTaskHeight}px]` : 'top-[74%]'}`} justify-center items-center>
  <div className={`absolute flex  ${isEditTodoItem ? 'left-[45%] top-[81%]' : 'top-[74%]'} justify-center items-center`}>
    <div className="absolute inset-x-0 bottom-0 w-[380px] bg-opacity-50 flex justify-start items-center">
    <div className="p-8 top-50% w-full h-full flex rounded-xl flex-col" style={{border: `1px solid ${isDarkMode ? '#FFFFFF' : '#000000'}`, backgroundColor: `${!isDarkMode? '#FFFFFF' : '#000000'}`}}>
    {isEditTodoItem && <input className='flex w-[315px] mb-[24px] h-[102px] border-1 rounded-lg px-5 py-4 text-start border-gray-500 text-gray-700'  style={{border: '1px solid #00000026'}}
            value={editInputValue}
            onChange={handleEditInputChange}
            placeholder='Todo를 적어주세요.'>
      </input>}
      <h2 className="text-lg w-[320px] h-[26px] mb-[16px]" style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>컬러</h2>
      <div className="flex flex-row w-[200px] h-[32px] gap-x-[12px] ">
        <button
          className={`flex w-[32px] h-[32px] rounded-md bg-black text-white ${selectedColor === 'black' ? 'border-2 border-gray-800' : ''}`}
          onClick={() => setSelectedColor('black')}
        >
        </button>
        <button
          className={`flex w-[32px] h-[32px] rounded-md text-white ${selectedColor === 'pink' ? 'border-2 border-gray-800' : ''}`}
          style={{backgroundColor: '#EE81C8'}}
          onClick={() => setSelectedColor('#EE81C8')}
        >
        </button>
        <button
          className={`flex w-[32px] h-[32px] rounded-md text-white ${selectedColor === 'orange' ? 'border-2 border-gray-800' : ''}`}
          style={{backgroundColor: '#FF734B'}}
          onClick={() => setSelectedColor('#FF734B')}
        >
        </button>
        <button
          className={`flex w-[32px] h-[32px] rounded-md text-white ${selectedColor === 'yellow' ? 'border-2 border-gray-800' : ''}`}
          style={{backgroundColor: '#FFD44F'}}
          onClick={() => setSelectedColor('#FFD44F')}
        >
        </button>
        <button
          className={`flex w-[32px] h-[32px] rounded-md text-white ${selectedColor === 'green' ? 'border-2 border-gray-800' : ''}`}
          style={{backgroundColor: '#35C792'}}
          onClick={() => setSelectedColor('#35C792')}
        >
        </button>
      </div>
      <div className="flex flex-col">
        <h2 className="mt-[24px] text-lg" style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>포커스 시간</h2>
        <div className='flex flex-row'>
        {[10, 15, 20, 25, 30, 45, 55].map((time) => (
          <button
            key={time}
            className={`flex mt-[24px] w-[35px] h-[44px] text-center items-center justify-center border rounded-md mr-2 mb-2 text-[17px] ${selectedTime === time ? 'bg-black text-white' : 'text-black bg-gray-300'}`}
            onClick={() => {
              setSelectedTime(time);
              setTimeValue(time); 
            }}
          >
            {time}
          </button>
        ))} 
        </div>
        <div className="relative mt-[12px]">
          <input
            type="number"
            value={timeValue !== null ? timeValue.toString() : ''}
            placeholder='직접입력 (분으로만 적어주세요)'
            style={{ color: isDarkMode ? '#FFFFFF' : '#000000', border: '1px solid #D8DADC' }}
            onChange={(event) => handleTime(event)}
            className='text-start h-[50px] w-full pl-4 pr-10 items-center rounded-lg'
          />
          <img
            src='/close.svg'
            alt='Close'
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={clearTimeValue}
          />
        </div>


      </div>
      <div className="flex flex-row mt-[28px]">
        <button
          className="flex-1 w-[156px] h-[44px] rounded-md bg-gray-300 text-black mr-2"
          onClick={handleDeleteAll}
        >
          Delete
        </button>
        <button
          className={`flex-1 w-[156px] h-[44px] rounded-md ${
            (((timeValue !== null && timeValue > 0) || (selectedTime > 0)) && selectedColor && inputValue.length > 0)
              ? 'bg-black text-white' 
              : 'bg-gray-300 text-black'
          }`}
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
  const getInitialTodoItems = (): TodoItem[] => {
    const storedItemsJson = typeof window !== 'undefined' ? localStorage.getItem('todoItems') : null;
    return storedItemsJson ? JSON.parse(storedItemsJson) : [];
  };

  // const taskRef = useRef<HTMLDivElement>(null);
  // const [selectedTodoTaskHeight, setSelectedTodoTaskHeight] = useState<number | null>(null);
  // const selectedTodoTaskRef = useRef<HTMLDivElement>(null);
  const [todoItem, setTodoItem] = useState<TodoItem[]>(getInitialTodoItems);
  
  const [inputValue, setInputValue] = useState<string>('');
  const [timeValue, setTimeValue] = useState<number|null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(
    typeof window !== 'undefined' ? localStorage.getItem('selectedColor') || 'black' : 'black'
  );
  const selectedTimeFromStorage = typeof window !== 'undefined' ? localStorage.getItem('selectedTime') : null;
  const initialSelectedTime = selectedTimeFromStorage ? parseInt(selectedTimeFromStorage) : 10;
  const [selectedTime, setSelectedTime] = useState<number>(initialSelectedTime);
  const [selectedTodoTask, setSelectedTodoTask] = useState<number | null>(null);
  const initialDarkMode = typeof window !== 'undefined' ? localStorage.getItem('isDarkMode') === 'true' : false;
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialDarkMode);
  const [storedItems, setStoredItems] = useState<TodoItem[]>([]); // 상태로 변경
  const [isEditTodoItem, setIsEditTodoItem] = useState<boolean>(false); 

  // const [taskHeights, setTaskHeights] = useState<number[]>([]);

  // useEffect(() => {
  //   const heights: number[] = [];
  //   document.querySelectorAll('.todo-task').forEach(task => {
  //     if (task instanceof HTMLDivElement) {
  //       heights.push(task.offsetHeight);
  //     }
  //   });
  //   setTaskHeights(heights);
  // }, [todoItem]);
  

  useEffect(() => {
    const storedColor = typeof window !== 'undefined' ? localStorage.getItem('selectedColor') : null;
    const storedTime = typeof window !== 'undefined' ? localStorage.getItem('selectedTime') : null;
    const storedDarkMode = typeof window !== 'undefined' ? localStorage.getItem('isDarkMode') : null;

    if (storedColor) {
      setSelectedColor(storedColor);
    }
    if (storedTime) {
      setSelectedTime(parseInt(storedTime));
    }
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === 'true');
    }
    
    const storedItemsJson = typeof window !== 'undefined' ? localStorage.getItem('todoItems') : null;
    if (storedItemsJson) {
      const parsedItems = JSON.parse(storedItemsJson);
      setTodoItem(parsedItems); // 초기 todoItem 상태 설정
      console.log(todoItem,'!!!!!!!!!!!!')
      setStoredItems(parsedItems); // 초기 storedItems 상태 설정
    }
  }, []);

  useEffect(() => {
    typeof window !== 'undefined' ? localStorage.setItem('selectedColor', selectedColor) : null;
  }, [selectedColor]);

  useEffect(() => {
    typeof window !== 'undefined' ? localStorage.setItem('selectedTime', selectedTime.toString()) : null;
  }, [selectedTime]);

  useEffect(() => {
    typeof window !== 'undefined' ?localStorage.setItem('todoItems', JSON.stringify(todoItem)) : null;
  }, [todoItem]);

  useEffect(() => {
    typeof window !== 'undefined' ?localStorage.setItem('isDarkMode', isDarkMode.toString()) : null;
  }, [isDarkMode]);

  useEffect(() => {
    if (!showModal) {
      setInputValue('');
      setSelectedTime(0);
      setSelectedColor('');
      setIsEditTodoItem(false)
    }
  }, [showModal]);
  


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
      router.push(`/task?time=${selectedTime}&color=${selectedColor}&isDarkMode=${isDarkMode}`);
  }
};

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value;
    setInputValue(trimmedValue); 
  };

  const handleTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const parsedValue = inputValue !== '' ? parseInt(inputValue) : null;
    setTimeValue(parsedValue);
    setSelectedTime(parsedValue || 0);
  };
  

  const addTodoItem = () => {
    if ((selectedTime > 0 && selectedColor && inputValue.trim() !== '') || isEditTodoItem) {
      const newItem: TodoItem = {
        text: (!isEditTodoItem && selectedTime > 0 && selectedColor && inputValue.trim() !== '') 
        ? inputValue 
        : (isEditTodoItem && selectedTodoTask !== null && selectedTime > 0 && selectedColor && inputValue.trim() !== '') 
          ? inputValue 
          : (isEditTodoItem && selectedTodoTask !== null) 
            ? todoItem[selectedTodoTask].text 
            : '',
      
        // selectedTime: isEditTodoItem && selectedTodoTask !== null ? selectedTime : localStorage.selectedTime || selectedTime,
        // selectedColor: isEditTodoItem && selectedTodoTask !== null ? selectedColor : localStorage.selectedColor || selectedColor
        selectedTime: isEditTodoItem && selectedTodoTask !== null ? selectedTime : localStorage.selectedTime || selectedTime,
        selectedColor: isEditTodoItem && selectedTodoTask !== null ? selectedColor : localStorage.selectedColor || selectedColor
      };

      if (isEditTodoItem && selectedTodoTask !== null) {
        // 수정 모달에서 저장 버튼을 누른 경우
        const updatedItems = [...todoItem];
        updatedItems[selectedTodoTask] = newItem;
        setTodoItem(updatedItems);
        setStoredItems(updatedItems);
        setIsEditTodoItem(false);
      } else {
        // 새로운 todo 항목을 추가하는 경우
        setTodoItem([...todoItem, newItem]);
        setStoredItems([...storedItems, newItem]);
      }
      console.log(inputValue, selectedTime,selectedColor,'update!')
      setInputValue('');
      setSelectedColor('')
      setSelectedTime(0)
      setShowModal(false);
      setSelectedTodoTask(null);
      
    }
    else {
      alert('필요한 항목을 모두 입력해주세요.');
    }
  };

  const editTodoItem = (index: number) => {
    setSelectedTodoTask(index); // 현재 선택된 todo 항목의 인덱스 저장
    setIsEditTodoItem(true);
    setShowModal(true);
  };
  

  const handleDeleteAll = () => {
    setInputValue('')
    setSelectedColor('')
    setSelectedTime(0)
    setSelectedTodoTask(null)
    setShowModal(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (

    <main className="flex min-h-screen w-full items-center justify-center" style={{backgroundColor: `${!isDarkMode ? '#FFFFFF' : '#000000'}`}}>
      <div className='flex flex-col w-[1040px] min-h-screen'>
        <LogoAndMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <div className="overflow-y-auto max-h-[calc(100vh - 40px)] mt-[56px] flex flex-row">
        <div className='w-[360px]'>
        <h1 className='text-[40px]' style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>
          Hello,<br/>
          let&apos;s focus today.
        </h1>
        <div className='flex w-[360px] mt-[64px] mb-[24px]' onClick={() => setShowModal(true)}>
          <div className='flex flex-row'>
            <input className='flex w-[296px] h-[56px] border-1 rounded-lg px-5 py-4 text-start border-gray-500 text-gray-700'  style={{border: '1px solid #00000026'}}
                      value={inputValue}
                      onChange={(event)=>handleInputChange(event)}
                      placeholder='Todo를 적어주세요.'>
            </input>
            <button className='w-[56px] h-[56px] ml-[8px] rounded-xl text-[30px]'  style={{color: `${!isDarkMode ? '#FFFFFF' : '#000000'}`, backgroundColor: `${isDarkMode ? '#FFFFFF' : '#000000'}`}} onClick={() => setShowModal(true)}>+</button>
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
            className={`rounded-xl w-full px-[16px] py-[16px] mb-2 h-[136px] cursor-pointer todo-task`}
            onClick={() => handleTodoTaskClick(index)}
          >
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row items-center'>
                <div style={{backgroundColor: `${item.selectedColor == 'black' && isDarkMode == true ? 'white' : item.selectedColor}`}} className='mr-[10px] w-[16px] h-[16px] rounded-full'/>
                <div  style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>{item.selectedTime}min</div>
              </div>
                <div onClick={()=>editTodoItem(index)} style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}}>Edit</div>
            </div>
            <br/>
            <div style={{color: `${isDarkMode ? '#FFFFFF' : '#000000'}`}} className='mt-[12px] text-[20px] max-w-[380px] overflow-hidden truncate line-clamp-20'>
            {item.text}
            </div>
            <div className='flex w-full h-[20px] py-[6px] px-[3px] flex-col items-end'>
              <img src='/Union.png' className='w-[14px] h-[8px]' alt='arrow'/>
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
              // selectedTodoTaskHeight={selectedTodoTask !== null ? taskHeights[selectedTodoTask] : 0}
              timeValue={timeValue}
              setTimeValue={setTimeValue}
              setInputValue={setInputValue}
              handleTime={handleTime}
              handleDeleteAll={handleDeleteAll}
              handleInputChange={handleInputChange}
              onSaveButtonClick={addTodoItem} 
              inputValue={inputValue}
              showModal={showModal}
          />
        )}
      </div>
      <div className='w-[640px] flex align-center justify-center'>
      {selectedTodoTask !== null && !isEditTodoItem && (
        <div className="flex flex-col max-w-[250px] max-h-[300px] items-center text-center justify-center relative">
          <div className={`flex flex-col max-h-[200px] gap-y-[16px]`}>
          <div className={`w-[248px] h-[78px] text-[60px]`} style={{ color: `${isDarkMode && selectedColor === 'black' ? '#FFFFFF' : selectedColor}` }}>00:{selectedTime.toString().padStart(2, '0')}:00</div>
          <button
            className={`w-full h-[66px] text-${isDarkMode==true ? 'black' : 'white'} px-3 py-2 rounded-lg`}
            style={{
              backgroundColor: `${selectedColor == 'black' && isDarkMode == true ? 'white' : selectedColor}`,
              padding: 0
            }}
            onClick={handleStartButtonClick}
          >
            <a className='text-lg'>Start</a>
          </button>
          </div>
          <style jsx>{`
          .relative {
            position: absolute;
            // left: 60%;
            bottom: 380px; 
          }
        `}</style>
        </div>
      )}
      </div>
      </div>
      </div>
    </main>
  );
}
