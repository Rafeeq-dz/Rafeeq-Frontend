import React from 'react'



const InfoIcon = () => (
  <div className='absolute h-43.75 left-100 top-[10px] w-[205px]'>
    <div className='relative size-full'>
      <div className='absolute inset-[-1.22%]'>
        <img 
          src="/images/Info.png" 
          alt="" 
          width={167} 
          height={167}
          className='block max-w-none'
        />
      </div>
    </div>
  </div>
)

const ClockIcon = () => (
  <div className='absolute flex h-[200px] items-center justify-center left-100 top-[-5px] w-[205px]'>
    <div className='rotate-180 scale-y-[-100%]'>
      <div className='h-[200px] relative w-[205px]'>
        <div className='absolute inset-[7.91%_0_0_3.87%]'>
          <div className='absolute inset-[7.91%_13.1%_9.07%_3.87%]'>
            <div className='absolute inset-[-12.65%_-6.93%_-7.91%_-12.74%]'>
              <img src="/icons/clock-bg.svg" alt=""  className='block max-w-none w-full h-full' />
            </div>
          </div>
          <div className='absolute inset-[22.75%_0_0_22.75%]'>
            <div className='absolute inset-[-1.35%_-1.32%]'>
              <img src="/icons/clock-icon.svg" alt=""  className='block max-w-none w-full h-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const NotificationIcon = () => (
  <div className='absolute h-[180px] left-100 top-[5px] w-[205px]'>
    <div className='absolute inset-0'>
      <div className='absolute flex inset-[17.59%_39.34%_6.9%_0] items-center justify-center'>
        <div className='rotate-[15deg] h-[145.469px] w-[123.22px]'>
          <div className='relative size-full'>
            <div className='absolute inset-[-13.07%_-7.21%_0_-1.16%]'>
              <img src="/icons/notification-bg.svg" alt=""  className='block max-w-none w-full h-full' />
            </div>
          </div>
        </div>
      </div>
      <div className='absolute inset-[0_0_0_19.88%]'>
        <img src="/icons/notification-icon.svg" alt=""  className='block max-w-none w-full h-full'  />
      </div>
    </div>
  </div>
)

const CalendarIcon = () => (
  <div className='absolute flex h-[210px] items-center justify-center left-100 top-[-10px] w-[205px]'>
    <div className='rotate-180 scale-y-[-100%]'>
      <div className='h-[210px] relative w-[205px]'>
        <div className='absolute inset-[7.62%_0_-3.03%_-3.87%]'>
          <div className='absolute inset-[7.62%_8.06%_-3.03%_-3.87%]'>
            <div className='absolute inset-[-8.14%_0_0_0]'>
              <img src="/icons/calendar-bg.svg" alt=""  className='block max-w-none w-full h-full' />
            </div>
          </div>
          <div className='absolute inset-[20.6%_0_0_27.41%]'>
            <div className='absolute inset-[-6.12%_-1.36%_-1.22%_-1.36%]'>
              <img src="/icons/calendar-icon.svg" alt=""  className='block max-w-none w-full h-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Problems = () => {
  return (
    <div className='bg-white border border-[#e4e4e7] flex flex-col items-start rounded-2xl shadow-[0px_0px_31.2px_0px_rgba(0,0,0,0.04)] w-full'>
      {/* Problem 1: Scattered Information */}
      <div className='border-b border-[#e4e4e7] h-[177px] relative w-full'>
        <div className='overflow-hidden relative size-full'>
          <InfoIcon />
          <div className='absolute left-8 top-[84px] w-[400px]'>
            <p className='font-normal leading-6 text-base text-[#52525b] tracking-[-0.48px]'>
              Vital details like schedules, exam rules, and course materials are buried across emails, Discord servers, and outdated portals
            </p>
          </div>
          <div className='absolute left-8 top-[59.5px] -translate-y-1/2'>
            <h3 className='font-semibold leading-8 text-2xl text-black tracking-[-0.144px] whitespace-nowrap'>
              Scattered Information
            </h3>
          </div>
        </div>
      </div>

      {/* Problem 2: Administrative Friction */}
      <div className='border-b border-[#e4e4e7] h-[177px] relative w-full'>
        <div className='overflow-hidden relative size-full'>
          <ClockIcon />
          <div className='absolute left-8 top-[84px] w-[400px]'>
            <p className='font-normal leading-6 text-base text-[#52525b] tracking-[-0.48px]'>
              Students waste hours asking repetitive questions that current static and manual systems can't answer quickly
            </p>
          </div>
          <div className='absolute left-8 top-[59.5px] -translate-y-1/2'>
            <h3 className='font-semibold leading-8 text-2xl text-black tracking-[-0.144px] whitespace-nowrap'>
              Administrative Friction
            </h3>
          </div>
        </div>
      </div>

      {/* Problem 3: Information Overload */}
      <div className='border-b border-[#e4e4e7] h-[177px] relative w-full'>
        <div className='overflow-hidden relative size-full'>
          <NotificationIcon />
          <div className='absolute left-8 top-[84px] w-[400.4px]'>
            <p className='font-normal leading-6 text-base text-[#52525b] tracking-[-0.48px]'>
              Between notifications and constant announcements, communication is fragmented, causing unnecessary stress and confusion
            </p>
          </div>
          <div className='absolute left-8 top-[59.5px] -translate-y-1/2'>
            <h3 className='font-semibold leading-8 text-2xl text-black tracking-[-0.144px] whitespace-nowrap'>
              Information Overload
            </h3>
          </div>
        </div>
      </div>

      {/* Problem 4: Poor Planning */}
      <div className='h-[176px] relative w-full'>
        <div className='overflow-hidden relative size-full'>
          <CalendarIcon />
          <div className='absolute left-8 top-[84px] w-[400.4px]'>
            <p className='font-normal leading-6 text-base text-[#52525b] tracking-[-0.48px]'>
              Without a personalized way to organize tasks, deadlines are missed, and student well-being suffers
            </p>
          </div>
          <div className='absolute left-8 top-[59.5px] -translate-y-1/2'>
            <h3 className='font-semibold leading-8 text-2xl text-black tracking-[-0.144px] whitespace-nowrap'>
              Poor Planning
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Problems
