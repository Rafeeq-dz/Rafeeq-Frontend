import React from 'react'

const Solutions = () => {
  return (
    <section className='py-20 px-30 max-md:hidden'>
        <div className='flex flex-col gap-4 rounded-[32px] pt-15 bg-black w-full'>
            <div className='h-[106px] w-full'>
                <img
                    src={"/images/solutionshead.svg"}
                    alt="Solutions Header"
                    width={800}
                    height={100}
                    className='object-contain w-full h-full'
                />
            </div>
            <div className='h-[760px] w-[950px] mx-auto'>
                <img
                    src={"/images/solutionmain.svg"}
                    alt="Solutions Header"
                    width={800}
                    height={100}
                    className='object-contain w-full h-full'
                />
            </div>
            <div className='h-[557px] w-[813px]  relative bottom-0 mx-auto'>
                <img
                    src={"/images/solutionfooter.svg"}
                    alt="Solutions Header"
                    width={800}
                    height={100}
                    className='object-contain w-full h-full'
                />
            </div>
        </div>
    </section>
  )
}

export default Solutions