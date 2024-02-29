import React, { useEffect, useState } from 'react'
import { FiRefreshCcw } from 'react-icons/fi'
import { GrAlarm } from "react-icons/gr";
type Props = {}

const Timer = (props: Props) => {
    const [time, setTime] = useState<number>(0);
     const [showTimer, setShowTimer] = useState(false)
    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
    
        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
        }`;
    };
    
    
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
    
        if (showTimer) {
            intervalId = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        }
    
        return () => clearInterval(intervalId);
    }, [showTimer]);
  return (
    <div>
      {showTimer ? (
        <div className='flex items-center space-x-2 bg-dark-fill-2 p-1.5 cursor-pointer
        rounded hover:bg-dark-fill-2'>
            <div>{formatTime(time)}</div>
            <FiRefreshCcw onClick={()=>{
                setShowTimer(false)
                setTime(0)
            }}/>
        </div>
      ):(
        <div className='flex items-center p-1 h-8 hover:bg-dark-fill-3 rounded cursor-pointer' onClick={()=>setShowTimer(true)}><GrAlarm size={'20'}/></div>
      )}  
    </div>
  )
}

export default Timer