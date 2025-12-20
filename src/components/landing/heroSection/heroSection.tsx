import MeetRafeeq from './meetRafeeq'

const HeroSection = () => {
  return (
    <section className='flex flex-col lg:flex-row py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 items-center justify-center w-full max-w-[1440px] mx-auto'>
      <div className='w-full lg:w-auto lg:flex-1'>
        <MeetRafeeq />
      </div>
      {/* Space reserved for image on large screens */}
      <div className='hidden lg:flex flex-1 items-center justify-center overflow-hidden min-h-[500px] lg:min-h-[550px] xl:min-h-[600px] p-8 lg:p-10 xl:p-12'>
        <img 
          src='/images/yes].PNG' 
          alt='Rafeeq Hero' 
          className='w-full h-full object-contain lg:object-cover scale-105 lg:scale-110'
        />
      </div>
    </section>
  )
}

export default HeroSection