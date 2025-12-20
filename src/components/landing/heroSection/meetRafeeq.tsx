import {Link} from 'react-router-dom'

const MeetRafeeq = () => {
  return (
    <div className='flex flex-col gap-4 md:gap-5 items-start justify-center w-full max-w-full lg:max-w-[571px]'>
      {/* Header Section */}
      <div className='flex flex-col gap-2 md:gap-3 items-start w-full'>
        <div className='border-[0.5px] border-[#6F6C90] flex h-[30px] md:h-[34px] items-center justify-center px-4 md:px-5 py-2 md:py-2.5 rounded-[20px] w-auto'>
          <p className='font-normal leading-6 text-sm md:text-base text-[#0A0820] text-center whitespace-nowrap'>
            Meet Rafeeq
          </p>
        </div>
        
        <div className='flex flex-col gap-3 md:gap-4 lg:gap-5 items-start justify-center w-full'>
          <h1 className='font-bold leading-tight md:leading-[52px] lg:leading-[62px] text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] text-[#0A0820] w-full'>
            Your Personal AI Agent for a Smarter Campus
          </h1>
          <p className='font-normal leading-6 md:leading-7 text-sm md:text-base text-[#6F6C90] tracking-[-0.48px] w-full'>
            One agent, four nodes. Rafik automates your planning, summarizes your learning, and organizes your student life so you can focus on what matters.
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className='flex flex-col gap-4 md:gap-6 items-start justify-center w-full'>
        <div className='flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch sm:items-center w-full sm:w-auto'>
          <Link 
            to="#" 
            className='bg-[#0A0820] flex items-center justify-center py-3 md:pb-[19px] md:pt-4 px-6 md:px-8 rounded-[56px] shadow-[0px_3px_12px_0px_rgba(74,58,255,0.18)] w-full sm:w-auto'
          >
            <p className='font-bold leading-5 text-base md:text-lg text-white text-center whitespace-nowrap'>
              Get started for free
            </p>
          </Link>
          
          <Link 
            to="#" 
            className='bg-[rgba(74,58,255,0.18)] flex flex-col items-start p-1.5 md:p-2 rounded-[55.677px] w-full sm:w-auto sm:min-w-[240px] md:min-w-[263px]'
          >
            <div className='border-[1.74px] border-solid border-white h-14 overflow-hidden relative rounded-[59.157px] shadow-[0px_6.96px_65.247px_0px_rgba(74,58,255,0.18)] w-full'
              style={{
                backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 247 56\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\"><rect x=\"0\" y=\"0\" height=\"100%\" width=\"100%\" fill=\"url(%23grad)\" opacity=\"1\"/><defs><radialGradient id=\"grad\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"10\" gradientTransform=\"matrix(12.359 -3.5012e-8 0.0036814 2.802 123.5 28)\"><stop stop-color=\"rgba(63,85,255,1)\" offset=\"0\"/><stop stop-color=\"rgba(74,58,255,1)\" offset=\"1\"/></radialGradient></defs></svg>')"
              }}
            >
              {/* Decorative Icons */}
              <div className='absolute flex h-[51.822px] items-center justify-center left-[262.09px] top-[19.47px] w-[47.031px]'>
                <div className='rotate-[22.75deg]'>
                  <div className='h-[42.235px] relative w-[33.288px]'>
                    <img
                      src="/images/turnip-icon.png"
                      alt=""
                      className='object-contain w-full h-full'
                    />
                  </div>
                </div>
              </div>

              <div className='absolute flex h-[66.507px] items-center justify-center left-[172.27px] top-[-30.07px] w-[66.35px]'>
                <div className='rotate-[342deg]'>
                  <div className='h-[52.841px] relative w-[52.596px]'>
                    <img
                      src="/images/trophy-icon.png"
                      alt=""
                      className='object-contain w-full h-full'
                    />
                  </div>
                </div>
              </div>

              <div className='absolute flex h-[81.241px] items-center justify-center left-[103.62px] top-[6.42px] w-[86.086px]'>
                <div className='rotate-[5deg]'>
                  <div className='h-[74.562px] relative w-[79.892px]'>
                    <img
                      src="/images/crown-icon.png"
                      alt=""
                      className='object-contain w-full h-full'
                    />
                  </div>
                </div>
              </div>

              <div className='absolute flex h-[64.509px] items-center justify-center left-[2.04px] top-[-19.76px] w-[63.134px]'>
                <div className='rotate-[25deg]'>
                  <div className='h-[49.446px] relative w-[46.604px]'>
                    <img
                      src="/images/potion-icon.png"
                      alt=""
                      className='object-contain w-full h-full'
                    />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className='absolute flex items-center justify-center left-[calc(50%+0.09px)] top-[calc(50%+0.19px)] -translate-x-1/2 -translate-y-1/2 gap-2 md:gap-[17.4px] z-10'>
                <p className='font-semibold leading-7 text-base md:text-[20px] text-white tracking-[-0.1px] whitespace-nowrap'>
                  join our discord
                </p>
                <div className='relative rounded-[3.376px] size-6 md:size-[27px]'>
                  <img
                    src="/images/discordicon.svg"
                    alt="Discord"
                    className='w-full h-full rounded-[3.376px]'
                  />
                </div>
              </div>

              {/* Background Ellipses */}
              <div className='absolute h-[208.789px] left-[calc(50%+0.35px)] top-[71.33px] -translate-x-1/2 w-[214.009px]'>
                <div className='absolute inset-[-25.83%_-25.2%]'>
                  <img
                    src="/images/ellipse-3380.svg"
                    alt=""
                    className='object-cover w-full h-full'
                  />
                </div>
              </div>

              <div className='absolute flex h-[163.076px] items-center justify-center left-[calc(50%-6.32px)] top-[54.15px] -translate-x-1/2 w-[212.632px]'>
                <div className='rotate-[359.777deg]'>
                  <div className='h-[162.251px] relative w-[212.001px]'>
                    <div className='absolute inset-[-25.83%_-19.77%]'>
                      <img
                        src="/images/ellipse-3381.svg"
                        alt=""
                        className='object-cover w-full h-full'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Inner Shadow Overlay */}
              <div className='absolute inset-0 pointer-events-none shadow-[inset_0px_0px_20.879px_0px_white,inset_0px_13.919px_41.758px_0px_rgba(255,255,255,0.24)]' />
            </div>
          </Link>
        </div>

        {/* Info Text */}
        <div className='flex gap-2 items-start w-full'>
          <div className='relative size-5 md:size-[22px] flex-shrink-0 mt-0.5'>
            <img
              src="/icons/info-icon.svg"
              alt="Info"
              className='w-full h-full'
            />
          </div>
          <p className='font-normal leading-6 md:leading-[26px] text-sm md:text-base text-[#6F6C90] flex-1'>
            Rafik automates your planning, summarizes your learning, and organizes your student life so you can focus on what matters
          </p>
        </div>
      </div>

      {/* Feature Tags */}
      <div className='flex flex-col gap-2 md:gap-3 items-start w-full'>
        <div className='flex flex-wrap gap-2 md:gap-4 items-center'>
          <div className='border-[0.5px] border-[#6F6C90] flex items-center justify-center px-3 md:px-5 py-2 md:py-2.5 rounded-[24px]'>
            <p className='font-bold leading-5 md:leading-6 text-xs md:text-base text-[#0A0820] whitespace-nowrap'>
              Proactive Agentic Planning
            </p>
          </div>
          <div className='border-[0.5px] border-[#6F6C90] flex items-center justify-center px-3 md:px-5 py-2 md:py-2.5 rounded-[24px]'>
            <p className='font-bold leading-5 md:leading-6 text-xs md:text-base text-[#0A0820] whitespace-nowrap'>
              Discord-to-Platform Sync
            </p>
          </div>
        </div>
        <div className='flex flex-wrap gap-2 md:gap-4 items-center w-full'>
          <div className='border-[0.5px] border-[#6F6C90] flex items-center justify-center px-3 md:px-5 py-2 md:py-2.5 rounded-[24px]'>
            <p className='font-bold leading-5 md:leading-6 text-xs md:text-base text-[#0A0820] whitespace-nowrap'>
              RAG-Powered Knowledge Base
            </p>
          </div>
          <div className='border-[0.5px] border-[#6F6C90] flex items-center justify-center px-3 md:px-5 py-2 md:py-2.5 rounded-[24px]'>
            <p className='font-bold leading-5 md:leading-6 text-xs md:text-base text-[#0A0820] whitespace-nowrap'>
              Smart Opportunity Discovery
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetRafeeq