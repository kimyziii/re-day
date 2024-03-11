'use client'
import React from 'react'
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUnorderedList,
  AiFillSetting,
} from 'react-icons/ai'

const NavBar = () => {
  return (
    <div className='flex flex-col justify-between items-center w-[60px] h-[100vh] bg-secondary-foreground text-white px-3 py-6'>
      <div className='space-y-6'>
        <AiOutlineHome size={22} color='white' />
        <AiOutlineSearch size={22} color='white' />
        <AiOutlineUnorderedList size={22} color='white' />
      </div>
      <div>
        <AiFillSetting size={22} color='white' />
      </div>
    </div>
  )
}

export default NavBar
