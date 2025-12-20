"use client"

import React from 'react'
const imgImage = "/images/advantage-card-unclear.png"
const imgImage1 = "/images/advantage-card-multilingual.png"
const imgBg = "/images/icon-star-bg.svg"
const imgIcon = "/images/icon-star.svg"
const imgBg1 = "/images/icon-danger-bg.svg"
const imgIcon1 = "/images/icon-danger.svg"
const imgEdit = "/images/icon-edit-bg.svg"
const imgEditIcon = "/images/icon-edit.svg"

// Icon components
const IconlyGlassStar = () => (
  <div className='relative w-full h-full'>
    <div className='absolute inset-0'>
      <div className='absolute top-0 left-[9.8%] right-[5.77%] bottom-[33.34%]'>
        <img alt="" className=' block max-w-none w-full h-full' src={imgBg} />
      </div>
      <div className='absolute top-[26.87%] left-0 right-0 bottom-0'>
        <img alt="" className='block max-w-none w-full h-full' src={imgIcon} />
      </div>
    </div>
  </div>
)

const IconlyGlassDanger = () => (
  <div className='relative w-full h-full'>
    <div className='absolute inset-0'>
      <div className='absolute flex items-center justify-center top-0 left-0 right-[31.87%] bottom-[4.94%]'>
        <div className='rotate-[345deg]'>
          <img alt="" className='block max-w-none' src={imgBg1} style={{ width: '272.558px', height: '245.302px' }} />
        </div>
      </div>
      <div className='absolute top-[1.76%] left-[26.38%] right-0 bottom-0'>
        <img alt="" className='block max-w-none w-full h-full' src={imgIcon1} />
      </div>
    </div>
  </div>
)

const IconlyGlassEdit = () => (
  <div className='relative w-full h-full'>
    <div className='absolute inset-0'>
      <div className='absolute top-0 left-0 right-[15.32%] bottom-[12.92%]'>
        <img alt="" className='block max-w-none w-full h-full' src={imgEdit} />
      </div>
      <div className='absolute top-[22.71%] left-[24.85%] right-0 bottom-0'>
        <img alt="" className='block max-w-none w-full h-full' src={imgEditIcon} />
      </div>
    </div>
  </div>
)

const Advantage = () => {
  const cards = [
    {

      id: 1,
      title: 'Reduce Stress',
      description: 'Move from confusion to clarity',
      gradient: 'from-[#ffffff] from-[8.496%] to-[#ef3971] to-[137.65%]',
      icon: <IconlyGlassDanger />,
      iconRotation: 'rotate-[356.251deg]',
      iconSize: { width: '479.594px', height: '323.457px' }
    },
    {
      id: 2,
      title: 'Automate Tasks',
      description: 'Let the agent handle repetitive administrative work',
      gradient: 'from-[#ffffff] from-[10.047%] to-[#2d8dff] to-[114.81%]',
      icon: <IconlyGlassStar />,
      iconRotation: 'rotate-[6.187deg]',
      iconSize: { width: '347.339px', height: '427.439px' }
    },
    {
      id: 3,
      title: 'Personalization',
      description: "A dashboard tailored to the student's specific university and specialty",
      gradient: 'from-[#ffffff] from-[10.047%] to-[#50c551] to-[114.81%]',
      icon: <IconlyGlassEdit />,
      iconRotation: 'rotate-[357.065deg]',
      iconSize: { width: '416.573px', height: '405.072px' }
    },
    {
      id: 4,
      title: 'Handles unclear requests',
      description: 'Your AI Agent adapts to modern conversational styles, making interactions feel natural and relatable, no matter the user\'s tone or slang.',
      image: imgImage,
      useInterFont: true
    },
    {
      id: 5,
      title: 'Enhance multilingual support',
      description: 'Engage users globally with seamless language detection and translation, providing real-time assistance in over 80+ languages.',
      image: imgImage1,
      useInterFont: true
    }
  ]

  return (
    <section className='bg-white flex flex-col items-center justify-center gap-5 px-4 md:px-8 lg:px-30 py-8 md:py-12 lg:py-15 w-full'>
      {/* Badge */}
      <div className='border-[0.5px] border-solid border-[#6f6c90] rounded-3xl'>
        <div className='flex items-center gap-2 px-5 py-2.5'>
          <div className='bg-gradient-to-r from-[#fb923c] via-50% via-[#f472b6] to-[#e879f9] rounded-full size-2' />
          <p className='font-medium text-[13.9px] leading-5 text-[#09090b]'>Advantages</p>
        </div>
      </div>

      {/* Title */}
      <h2 
        className='font-extrabold text-3xl md:text-4xl lg:text-[48px] leading-tight md:leading-[48px] tracking-[-0.576px] text-[#09090b] text-center max-w-[305.198px] px-4'
        style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
      >
        Impact Student Life
      </h2>

      {/* Cards Container with Horizontal Scroll */}
      <div className='w-full max-w-[1232px] relative'>
        <div className='overflow-hidden rounded-[inherit]'>
          <div className='flex gap-4 md:gap-6 lg:gap-8 px-4 md:px-0 md:pl-4 overflow-x-auto scrollbar-hide'>
            {cards.map((card) => (
              <div 
                key={card.id}
                className='flex-none w-[85vw] sm:w-[70vw] md:flex-1 md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-21.33px)] flex flex-col gap-4 md:gap-6'
              >
                {/* Card Image/Icon Container */}
                <div 
                  className={`h-[280px] sm:h-[350px] md:h-[380px] lg:h-[404.66px] w-full rounded-[20px] overflow-hidden relative ${
                    card.gradient ? `bg-gradient-to-b ${card.gradient}` : ''
                  }`}
                >
                  {card.icon && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div 
                        className={card.iconRotation}
                        style={{
                          width: card.iconSize.width,
                          height: card.iconSize.height
                        }}
                      >
                        {card.icon}
                      </div>
                    </div>
                  )}
                  {card.image && (
                    <img 
                      alt={card.title} 
                      className='absolute inset-0 w-full h-full object-contain pointer-events-none' 
                      src={card.image} 
                    />
                  )}
                </div>

                {/* Card Content */}
                <div className='flex flex-col gap-1'>
                  <h3 
                    className={`${card.useInterFont ? 'font-medium text-lg md:text-[19.8px] leading-6 md:leading-7' : 'font-semibold text-xl md:text-2xl leading-7 md:leading-8 tracking-[-0.144px]'} text-[#09090b]`}
                    style={{ 
                      fontFamily: card.useInterFont ? 'Inter' : 'DM Sans',
                      fontVariationSettings: !card.useInterFont ? "'opsz' 14" : undefined
                    }}
                  >
                    {card.title}
                  </h3>
                  <p 
                    className={`${card.useInterFont ? 'text-xs md:text-[13.9px] leading-4 md:leading-5' : 'text-sm md:text-base leading-5 md:leading-6 tracking-[-0.48px]'} text-[#52525b]`}
                    style={{ 
                      fontFamily: card.useInterFont ? 'Inter' : 'DM Sans',
                      fontVariationSettings: !card.useInterFont ? "'opsz' 14" : undefined,
                      fontWeight: card.useInterFont ? 400 : 353
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

export default Advantage
