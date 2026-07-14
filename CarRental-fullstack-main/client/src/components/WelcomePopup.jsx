import React, { useEffect, useState } from 'react'

const WelcomePopup = () => {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1700)
    const hideTimer = setTimeout(() => setVisible(false), 2200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`flex w-full max-w-lg flex-col items-center justify-center gap-3 px-6 text-center ${fadeOut ? 'animate-welcome-out' : 'animate-welcome-in'}`}>
        <h2 className='text-3xl font-extrabold uppercase tracking-[0.35em] text-red-600 sm:text-4xl md:text-5xl'>CAR RENTAL</h2>
        <p className='text-base font-medium uppercase tracking-[0.2em] text-slate-600 sm:text-lg'>Happy Journey With Us</p>
      </div>
    </div>
  )
}

export default WelcomePopup
