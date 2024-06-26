import React from 'react'
import { MdOutlineElectricBolt } from "react-icons/md";


const FilterProduct = ({category, onClick, isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl p-5 rounded-full cursor-pointer ${isActive ? "bg-green-600 text-white" : "bg-blue-500" }`}>
      <MdOutlineElectricBolt />

      </div>
      <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  )
}

export default FilterProduct
