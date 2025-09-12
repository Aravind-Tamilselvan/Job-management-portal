import React, { useContext } from 'react'
import cybermind from '/cybermind_works_logo.jpg'
import { dataContext } from '../App'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {setShowOverlay,user} = useContext(dataContext)
  return (
    <nav className='mt-3 d-flex justify-content-center'>
      <div className='bg-white d-flex justify-content-evenly align-items-center shadow-sm'>
        <img src={cybermind} alt='cybermind-logo' height={'50px'} width={'50px'} />
        <ul className='d-flex align-items-center'>
          <li>Home</li>
          <li>Find Jobs</li>
          <li>Find Talents</li>
          <li>About Us</li>
          <li>Testimonials</li>
        </ul>
        {!user ? <Link to={'/authentication'}><button >Login</button></Link> : <button onClick={()=>setShowOverlay(true)}>Create Jobs</button>}
        
      </div>
    </nav>
  )
}

export default Navbar