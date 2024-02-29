import HeatMap from '@/components/Profile/HeatMap'
import Sidebar from '@/components/Profile/Sidebar';
import LikedCard from '@/components/Profile/LikedCard';
import useGetUserDetails from '@/hooks/useGetUserDetails'
import Calendar from '@/components/Profile/Calendar';
import {useState,useEffect} from 'react'
import {MagnifyingGlass} from 'react-loader-spinner'


const profile = () => {
      const importantDates = ['2024-02-14', '2024-02-05']; 
  const {...data} = useGetUserDetails()
  const solvedDates = data.solvedDates;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (solvedDates.length > 0) {
      setIsLoading(false);
    }
  }, [solvedDates]);
  
  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
    <MagnifyingGlass
  visible={true}
  height="300"
  width="300"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  /></div>
    )
  }

  if (solvedDates.length === 0) {
    return <div>No data available</div>;
  }
  const aggregatedData: { [key: string]: number } = {};

  solvedDates.forEach(entry => {
    const { date, count } = entry;
    try {
      const dateObj = new Date(date);
      if (!isNaN(dateObj.getTime())) {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const day = dateObj.getDate();
        const key = `${year}-${month + 1}-${day}`;
        aggregatedData[key] = (aggregatedData[key] || 0) + count;
      } else {
        console.error(`Invalid date string: ${date}`);
      }
    } catch (error) {
      console.error(`Error processing date string: ${date}`, error);
    }
  });
  const valuesArray = Object.entries(aggregatedData).map(([date, count]) => ({ date, count }));

  return (
    <>
<div className='flex'>
     <div className="w-[25%]">
   <Sidebar/></div>
   <div className="w-[75%] px-5">
    <h1 className='font-bold text-center py-4 text-2xl'>Your Performance - {new Date().getFullYear()}</h1>
 <HeatMap
  values={valuesArray}/> 

     <div className='flex justify-between'>
    <LikedCard liked={data.liked} title={'Liked'}/>
    <LikedCard liked={data.starred} title={'Starred'}/>
     <Calendar importantDates={importantDates}/>
     </div>
   
     </div>
    </div> 


    </>
  )
}


export default profile