import MeetRafeeq from './meetRafeeq'

const HeroSection = () => {
  return (
    <section className='flex flex-col lg:flex-row py-8 md:py-12 lg:py-20 px-4 sm:px-6 md:px-12 lg:pl-16 xl:pl-30 lg:pr-8 gap-8 md:gap-12 lg:gap-24 items-start lg:items-center max-w-[1440px] mx-auto'>
      <MeetRafeeq />
      {/* Space reserved for image on large screens */}
      <div className='hidden lg:flex flex-1 items-center justify-center h'>
        img
      </div>
    </section>
  )
}

export default HeroSection