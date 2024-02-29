import Link from "next/link";
import { useRouter } from "../../../node_modules/next/router"
import { motion } from 'framer-motion';
import { FaHeart, FaStar } from "react-icons/fa";

type Props = {
    liked:any,title:any
}

const LikedCard:React.FC<Props> = ({liked,title}) => {
const router = useRouter()
return (
  <motion.div
      className='w-[30%] rounded-lg text-dark h-[30%] pt-5 px-10 my-20 mx-10'
      style={{ backgroundColor: '#EAF2FB',boxShadow:'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px' }}
      initial={{ opacity: 0, scale: 0.5 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }} 
  >
      <h3 className='py-10 text-lg font-bold flex'>{title==='Liked' ? <FaHeart 
      color="red" fontSize={'22'} className="mr-2"/> : <FaStar color="gold" fontSize={'22'} className="mr-2"/>}{title} Problems</h3>
      {liked.map((item, idx) => (
          <motion.h4
              key={idx}
              className='cursor-pointer capitalize'
              onClick={() => router.push(`/${item}`)}
              whileHover={{ scale: 1.1 }} // Scale up on hover
              whileTap={{ scale: 0.9 }} // Scale down on tap
              transition={{ duration: 0.5 }} // Smooth hover transition duration
          > <Link href={`/problems/${item}`}>
              {idx + 1}. &nbsp; {item} <br/> </Link>
          </motion.h4>
      ))}
  </motion.div>
)
}

export default LikedCard