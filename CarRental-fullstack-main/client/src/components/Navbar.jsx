import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import {motion, AnimatePresence} from 'motion/react'

const Navbar = () => {

    const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const changeRole = async ()=>{
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleMenuClick = () => {
        setOpen(false)
    }

  return (
    <motion.header 
    initial={{y: -20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
    className={`sticky top-0 z-50 border-b border-borderColor/80 bg-white/95 backdrop-blur-sm shadow-md ${location.pathname === "/" ? "bg-light/95" : "bg-white/95"}`}>
      <div className='mx-auto flex h-20 sm:h-24 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12'>
        <Link to='/' className="flex items-center">
            <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="logo" className="h-16 sm:h-20 md:h-24 w-auto max-w-[240px] object-contain"/>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden sm:flex items-center gap-4 sm:gap-6 lg:gap-8'>
            <div className='flex items-center gap-4 sm:gap-6 lg:gap-8 text-sm font-medium text-gray-600'>
                {menuLinks.map((link, index)=> (
                    <Link key={index} to={link.path} className='transition hover:text-primary'>
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor bg-white px-3 py-2 rounded-full max-w-56 shadow-sm'>
                <input type="text" className="w-full bg-transparent outline-none placeholder-gray-500 text-sm" placeholder="Search cars"/>
                <img src={assets.search_icon} alt="search" className='w-4 h-4' />
            </div>

            <div className='flex items-center gap-4 sm:gap-6'>
                <button onClick={()=> isOwner ? navigate('/owner') : changeRole()} className="text-sm font-medium text-gray-700 transition hover:text-primary">{isOwner ? 'Dashboard' : 'List cars'}</button>
                <button onClick={()=> {user ? logout() : setShowLogin(true)}} className="cursor-pointer rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-dull">{user ? 'Logout' : 'Login'}</button>
            </div>
        </div>

        {/* Mobile Menu Button */}
        <button className='sm:hidden cursor-pointer flex items-center justify-center' aria-label="Menu" onClick={()=> setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className='w-6 h-6'/>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='sm:hidden absolute top-full left-0 right-0 bg-white border-b border-borderColor shadow-lg z-50'
          >
            <div className='mx-auto px-4 py-6 flex flex-col gap-6'>
              {/* Mobile Menu Items */}
              <div className='flex flex-col gap-4'>
                {menuLinks.map((link, index)=> (
                    <Link 
                      key={index} 
                      to={link.path} 
                      onClick={handleMenuClick}
                      className='text-base font-medium text-gray-700 transition hover:text-primary hover:pl-2 duration-200'
                    >
                      {link.name}
                    </Link>
                ))}
              </div>

              {/* Mobile Search */}
              <div className='flex items-center text-sm gap-2 border border-borderColor bg-light px-3 py-2 rounded-full'>
                <input type="text" className="w-full bg-transparent outline-none placeholder-gray-500 text-sm" placeholder="Search cars"/>
                <img src={assets.search_icon} alt="search" className='w-4 h-4' />
              </div>

              {/* Mobile Action Buttons */}
              <div className='flex flex-col gap-3'>
                <button 
                  onClick={()=> {
                    if(isOwner) {
                      navigate('/owner')
                    } else {
                      changeRole()
                    }
                    handleMenuClick()
                  }} 
                  className="w-full text-base font-medium text-gray-700 transition hover:text-primary hover:bg-gray-50 py-2 px-3 rounded-lg"
                >
                  {isOwner ? 'Dashboard' : 'List cars'}
                </button>
                <button 
                  onClick={()=> {
                    if(user) {
                      logout()
                    } else {
                      setShowLogin(true)
                    }
                    handleMenuClick()
                  }} 
                  className="w-full cursor-pointer rounded-lg bg-primary px-6 py-2 text-base font-semibold text-white transition hover:bg-primary-dull"
                >
                  {user ? 'Logout' : 'Login'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
