import React from 'react'

type Props = {
    onClick:React.Dispatch<React.SetStateAction<string>>,
    category:string
}

const Filter:React.FC<Props> = ({onClick,category}) => {

  return (
    <div onClick={()=>onClick(category)} onMouseDown={()=>onClick(category)}
    className='cursor-pointer w-auto m-7 p-2 border rounded-lg bg-yellow-50 text-dark-layer-1
    text-center'>{category}</div>
  )
}

export default Filter