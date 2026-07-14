import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const {axios, isOwner, currency} = useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    {title: "Total Cars", value: data.totalCars, icon: assets.carIconColored},
    {title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored},
    {title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored},
    {title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored},
  ]

  const fetchDashboardData = async ()=>{
    try {
       const { data } = await axios.get('/api/owner/dashboard')
       if (data.success){
        setData(data.dashboardData)
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(isOwner){
      fetchDashboardData()
    }
  },[isOwner])

  return (
    <div className='flex-1 bg-slate-50 px-4 py-6 md:px-8 lg:px-10'>
      <div className='mx-auto max-w-7xl rounded-[28px] border border-borderColor/70 bg-white p-6 shadow-[0_16px_45px_rgba(0,0,0,0.06)] md:p-8'>
        <Title title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"/>

        <div className='mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {dashboardCards.map((card, index)=>(
            <div key={index} className='flex items-center justify-between rounded-2xl border border-borderColor bg-slate-50 p-4 shadow-sm'>
              <div>
                <h1 className='text-xs font-semibold uppercase tracking-[0.2em] text-gray-500'>{card.title}</h1>
                <p className='mt-2 text-xl font-semibold text-gray-900'>{card.value}</p>
              </div>
              <div className='flex h-11 w-11 items-center justify-center rounded-full bg-primary/10'>
                <img src={card.icon} alt="" className='h-5 w-5'/>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-8 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]'>
          <div className='rounded-2xl border border-borderColor bg-white p-5 shadow-sm md:p-6'>
            <h1 className='text-lg font-semibold text-gray-900'>Recent Bookings</h1>
            <p className='mt-1 text-sm text-gray-500'>Latest customer bookings</p>
            {data.recentBookings.map((booking, index)=>(
              <div key={index} className='mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3'>
                <div className='flex items-center gap-3'>
                  <div className='hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-primary/10'>
                    <img src={assets.listIconColored} alt="" className='h-5 w-5'/>
                  </div>
                  <div>
                    <p className='font-medium text-gray-800'>{booking.car.brand} {booking.car.model}</p>
                    <p className='text-sm text-gray-500'>{booking.createdAt.split('T')[0]}</p>
                  </div>
                </div>

                <div className='flex items-center gap-3 font-medium'>
                  <p className='text-sm text-gray-600'>{currency}{booking.price}</p>
                  <p className='rounded-full border border-borderColor px-3 py-1 text-sm text-gray-700'>{booking.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='rounded-2xl border border-borderColor bg-gradient-to-br from-primary/10 to-white p-5 shadow-sm md:p-6'>
            <h1 className='text-lg font-semibold text-gray-900'>Monthly Revenue</h1>
            <p className='mt-1 text-sm text-gray-500'>Revenue for current month</p>
            <p className='mt-8 text-3xl font-semibold text-primary'>{currency}{data.monthlyRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
