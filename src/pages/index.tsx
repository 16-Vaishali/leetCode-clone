import Image from 'next/image'
import ProblemsTable from '@/components/ProblemsTable/ProblemsTable'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Topbar from '@/components/Topbar/Topbar'
import Footer from '@/components/Footer'
import useGetProblems from "@/hooks/useGetProblems";
import Search from '@/components/FilterSearch/Search'
import Filter from '@/components/FilterSearch/Filter'






export default function Home() {
  const {problems} = useGetProblems()
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const detectMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    detectMobile();
  }, []);
const [searchQuery, setSearchQuery] = useState('');
const [filterCriteria, setFilterCriteria] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;
const filteredData = problems.filter(item => {
  // Filter based on search query
  if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
    return false;
  }
  // Filter based on filter criteria
  if (filterCriteria && item.category !== filterCriteria) {
    return false;
  }
  return true;
});

const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// Slice data for current page
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedData = filteredData.slice(startIndex, endIndex);

const handlePageChange = (page:number) => {
  setCurrentPage(page);
};



// const { systemTheme, theme, setTheme } = useTheme();
// const currentTheme = theme === 'system' ? systemTheme : theme;
const hasMounted = useHasMounted()
if(!hasMounted) return null;



return (
  <>
  {isMobile ? (
        <div className="flex items-center justify-center h-screen w-[150px]">
          <div className="bg-red-500 text-white p-4 rounded-lg">
          Oops! We are not mobile version yet :(
          </div>
        </div>
      ) :(
        <main className='bg-dark-layer-2 min-h-screen'>

      <Topbar />
      <div className='w-full flex px-1'>
      <Search value={searchQuery} onChange={setSearchQuery}/>
      <Filter category='Array' onClick={setFilterCriteria}/>
      <Filter category='Dynamic Programming' onClick={setFilterCriteria}/>
      <Filter category='Stack' onClick={setFilterCriteria}/>
      <Filter category='Linked List' onClick={setFilterCriteria}/>
      <Filter category='Two Pointers' onClick={setFilterCriteria}/>
    
      

      
      </div>
      <h1
        className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
        uppercase mt-10 mb-5'
      >
       Problems
      </h1>
      <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
        {problems.length===0 && (
          <div className='max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse'>
            {[...Array(5)].map((_, idx) => (
              <LoadingSkeleton key={idx} />
            ))}
          </div>
        )}


        <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
          {problems.length>0 && (
            <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
              <tr>
                <th scope='col' className='px-1 py-3 w-0 font-medium'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Title
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Difficulty
                </th>

                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Category
                </th>
                <th scope='col' className='px-6 py-3 w-0 font-medium'>
                  Solution
                </th>
              </tr>
            </thead>
          )}
          <ProblemsTable problems={paginatedData} />
        </table>
      </div>
      <div className="flex justify-center my-4">
       
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      className="mx-2 bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
   
      {index + 1}
    </button>
  ))}
</div>

      <Footer/>
    </main>
      )}
    
  </>
);

}

const LoadingSkeleton = () => {
	return (
		<div className='flex items-center space-x-12 mt-4 px-6'>
			<div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1'></div>
			<div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};


function useHasMounted(){
  const [hasMounted,setHasMounted] = useState(false)
  useEffect(()=>{
    setHasMounted(true)
  },[])
  return hasMounted
}





// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import { useTheme } from 'next-themes';

// export default function Home() {
//   const { systemTheme, theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;
//   const currentTheme = theme === 'system' ? systemTheme : theme;

//   return (
//     <div className="grid place-items-center h-screen">
//       <div>
//         <h1 className="text-7xl font-bold text-center">
//           {currentTheme === 'dark' ? 'Dark' : 'Light'}{' '}
//           <span className="text-purple-600">Mode</span>
//         </h1>
//         <p className="dark:text-purple-600 my-8 text-center">
//           Click the button below to switch mode
//         </p>
//         <div className="flex justify-center">
//           {currentTheme === 'dark' ? (
//             <button
//               className="bg-black-700 hover:bg-black w-28 rounded-md border-purple-400 border-2 p-4"
//               onClick={() => setTheme('light')}
//             >
//               {' '}
//              <div>sun</div>
//             </button>
//           ) : (
//             <button
//               className="bg-gray-100 w-28 rounded-md border-purple-400 border-2 p-4 hover:bg-gray-300"
//               onClick={() => setTheme('dark')}
//             >
//        <div>moon</div>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }