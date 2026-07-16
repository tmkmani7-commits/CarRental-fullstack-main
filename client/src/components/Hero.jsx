import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('')

    const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext()

    const handleSearch = (e)=>{
        e.preventDefault()
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-light px-4 py-16 text-center sm:px-6 lg:px-8'>

      <motion.form
      initial={{ scale: 0.95, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      onSubmit={handleSearch}
      className='mt-8 flex w-full max-w-6xl flex-col items-stretch gap-4 rounded-[28px] border border-borderColor/70 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:flex-row md:items-center md:justify-between md:gap-6 md:p-6 lg:p-8'>

        <div className='flex flex-1 flex-col gap-4 md:flex-row md:items-end md:gap-6'>
            <div className='flex flex-1 flex-col items-start gap-2'>
                <label className='text-sm font-semibold text-gray-700'>Pickup Location</label>
                <select className='w-full rounded-xl border border-borderColor bg-gray-50 px-3 py-3 text-sm outline-none focus:border-primary' required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)}>
                    <option value="">Select location</option>
                    {cityList.map((city)=> <option key={city} value={city}>{city}</option>)}
                </select>
            </div>
            <div className='flex flex-1 flex-col items-start gap-2'>
                <label htmlFor='pickup-date' className='text-sm font-semibold text-gray-700'>Pick-up Date</label>
                <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className='w-full rounded-xl border border-borderColor bg-gray-50 px-3 py-3 text-sm text-gray-600 outline-none focus:border-primary' required/>
            </div>
            <div className='flex flex-1 flex-col items-start gap-2'>
                <label htmlFor='return-date' className='text-sm font-semibold text-gray-700'>Return Date</label>
                <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" className='w-full rounded-xl border border-borderColor bg-gray-50 px-3 py-3 text-sm text-gray-600 outline-none focus:border-primary' required/>
            </div>
        </div>
            <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-dull'>
                <img src={assets.search_icon} alt="search" className='brightness-300'/>
                Search
            </motion.button>
      </motion.form>

      <motion.img 
        initial={{ y: 100, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.8, delay: 0.6 }}
      src={assets.main_car} alt="car" className='mt-10 max-h-72 w-full max-w-4xl object-contain'/>
    </motion.div>
  )
}

export default Hero
