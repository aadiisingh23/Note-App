import React from 'react'
import { Link } from 'react-router'
import {PlusIcon } from 'lucide-react'
const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
       <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center">
            <h1 className='text-3xl font-semibold text-primary'>ThinkBoard</h1>
            <div className='flex items-center gap-4'>
                <Link to={'/create'} className='btn btn-primary' >
                <PlusIcon/>
                <span>New Note</span>
                </Link>
            </div>
        </div>
       </div>
      
    </header>
  )
}

export default Navbar
