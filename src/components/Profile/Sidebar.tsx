import useGetUserDetails from '@/hooks/useGetUserDetails'
import useGetProblems from '@/hooks/useGetProblems';
import Image from "next/image"
import { MdVerified } from "react-icons/md";
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { motion } from 'framer-motion';
type Props = {}

const Sidebar = (props: Props) => {
    const { ...data } = useGetUserDetails();
    const {problems,len} = useGetProblems()
    const easyProblemsCount = problems.filter(problem => problem.difficulty === 'Easy').length;
    const mediumProblemsCount = problems.filter(problem => problem.difficulty === 'Medium').length;
    const hardProblemsCount = problems.filter(problem => problem.difficulty === 'Hard').length;
  
    const [signout,loading,error] = useSignOut(auth)
    const handleClick =()=>{
    signout()
    }
  
    const createDate = (create: any) => {
    const dateObject = new Date(create);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  
  const created = createDate(data.createdAt);
  const updated = createDate(data.updatedAt)



  const difficultyCounts = {
    Easy: 0,
    Medium: 0,
    Hard: 0
  };

data.solved.forEach(solvedProblemTitle => {
const problem = problems.find(problem => problem.id === solvedProblemTitle);// Debugging
if (problem) {
      difficultyCounts[problem.difficulty]++;
    }
  });

const easyPercent = (difficultyCounts.Easy/easyProblemsCount)*100;
const mediumPercent = (difficultyCounts.Medium/easyProblemsCount)*100;
const harPercent = (difficultyCounts.Hard/easyProblemsCount)*100




const percent = (data.solved.length/len)*100;
  return (
    <motion.div className=' bg-side h-full ml-3' style={{boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} initial={{ opacity: 0, x: -10 }} 
    animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.5, delay: 0.2 }}>
      <div className='text-center py-6 font-bold'>
      <h2>User Profile</h2> </div>
        <div className='flex justify-between pl-2'>
             <motion.div className='w-[50%] rounded-full'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image src={'/assets/user.jpg'} alt='' className='rounded-full' width={200} height={190}/>
        </motion.div>
        <motion.div
            className='pt-6 mx-auto'
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }} >
            <div className='flex justify-center'>
                {data.premium && (
                    <motion.div
                        whileHover={{ scale: 1.2 }} 
                        transition={{ duration: 0.2 }}  >
                        <MdVerified fontSize={22} color='green' />
                    </motion.div>
                )}
                <motion.h2
                    className='text-center px-2 font-bold capitalize'
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                    transition={{ duration: 0.2 }}    >
                    {data.displayName}
                </motion.h2>
            </div>
            <div>
                <motion.span
                    className='text-center pr-3 mt-4'
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                    transition={{ duration: 0.2 }}  >
                    Joined on<br />{created}
                </motion.span>
            </div>
        </motion.div>
            
        </div>

        <h4 className='text-center text-sm py-4'>{data.email}</h4>
        <h2 className='text-center font-bold py-2 text-xl'>Problems solved</h2>
        <div className="relative w-32 h-32 mx-auto my-3">
  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 32 32">
    <circle className="stroke-current text-gray-300" cx="16" cy="16" r="14" strokeWidth="4" fill="none" />
    <circle className="stroke-current text-blue-500" cx="16" cy="16" r="14" strokeWidth="4" fill="none" 
      strokeDasharray="88.3"
      strokeDashoffset={88.3 - (percent / 100) * 88.3} />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center text-dark font-bold text-md">
    {data.solved.length}/{len}
  </div>
</div>

<div className='flex justify-center'>
  <h5 className='pl-6 text-xs py-2'>Easy {difficultyCounts.Easy}/{easyProblemsCount} </h5><Linear percent={easyPercent} bg={'green'}/> </div>
  <div className='flex justify-center'>
  <h5 className='pl-5 text-xs py-2'>Medium {difficultyCounts.Medium}/{mediumProblemsCount} </h5><Linear percent={mediumPercent} bg={'yellow'}/> </div>
  <div className='flex justify-center'>
  <h5 className='pl-6 text-xs py-2'>Hard {difficultyCounts.Hard}/{hardProblemsCount}</h5><Linear percent={harPercent} bg={'red'}/>  </div>


<div className='py-4 text-center'>
  <h5 className='text-sm'>Last Updated {updated}</h5>
</div>

<button className='bg-dark-fill-3 mx-3 py-3 flex w-full cursor-pointer rounded items-center justify-center text-dark'
    onClick={handleClick}> Logout
    </button>


    </motion.div>

  )
}

export default Sidebar


const Linear = ({percent,bg})=>{
  return (
    <div className="relative w-32 h-2 bg-gray-300 rounded-full mx-auto my-3">
  <div
    className='absolute top-0 left-0 h-full  rounded-full' style={{ backgroundColor: bg, width: `${percent}%` }}
  ></div>
  <div className="absolute inset-0 flex items-center justify-center text-dark font-bold text-sm">
  </div>
</div>
  )
}