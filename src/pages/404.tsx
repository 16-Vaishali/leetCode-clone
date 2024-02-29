import Image from 'next/image';
const NotFound = ()=>{
    return (
<>
<div className='flex justify-between items-center px-40 py-20'>
<div className='pl-30'>
    <h2 className='text-4xl'>Dude! Your page is not here <b>404!</b></h2>
    <h4 className='text-3xl text-center pt-10'>I stole it LOL 	&#128514;</h4>
</div>
<div>
<Image src={'/assets/cat.jpg'} alt='page-not-found' width={'250'} height={'150'}/>
</div>
</div>
</>
    )
}

export default NotFound;