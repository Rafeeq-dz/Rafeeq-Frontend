import React from "react";


const WhyRafeeq = () => {
  return (
    <div className="flex flex-col items-start justify-between relative w-full">
      {/* Header Section */}
      <div className="relative">
        <div className="flex flex-col gap-5 items-start">
          {/* Problems Badge */}
          <div className="border-[0.5px] border-[#6F6C90] flex gap-2 h-10 items-center px-5 py-2.5 rounded-[20px]">
            <div className="bg-linear-to-r from-[#fb923c] via-[#f472b6] via-50% to-[#e879f9] rounded-full size-2" />
            <p className="font-medium leading-5 text-[13.9px] text-[#09090b]">
              Problems
            </p>
          </div>

          {/* Title */}
          <h1 className="font-extrabold leading-12 text-[48px] text-[#0A0820] tracking-[-0.576px] whitespace-nowrap">
            Why Rafeeq
          </h1>

          {/* Description */}
          <div className="flex flex-col items-start w-[497px]">
            <p className="font-normal leading-7 text-[20px] text-[#6F6C90]">
              Modern university life is supposed to be about learning, but
              students often spend more time navigating chaos than studying
            </p>
          </div>
        </div>
      </div>

      {/* Mission Card */}
      <div
        className="border-[1.518px] border-[#cecece] h-[434.036px] relative rounded-[20px] w-[499.036px] mt-5 overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135.27deg, rgb(255, 255, 255) 0%, rgb(241, 241, 241) 100%)",
        }}
      >
        {/* Background Image with Purple Overlay */}
        <div className="absolute inset-[-31.44%_-5.54%_-31.16%_-5.48%]">
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/images/why-rafeeq-bg.png"
              alt=""
              className="object-cover object-[50%_50%] w-full h-full"
            />
            <div className="absolute bg-[#4A3AFF] inset-0 mix-blend-hue" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute flex flex-col gap-[50px] items-start left-1/2 top-[53.52px] -translate-x-1/2">
          {/* Stacked Title with Gradient Text */}
          <div className="font-bold relative text-[75.642px] tracking-[-0.7828px] leading-[0.905]">
            <p
              className="bg-clip-text bg-gradient-to-b from-[#ffffff] from-[35.424%] via-[#ffffff] via-[44.667%] to-[rgba(234,218,255,0)] to-[103.92%] whitespace-nowrap"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              The
            </p>
            <p
              className="bg-clip-text bg-gradient-to-b from-[#ffffff] from-[35.424%] via-[#ffffff] via-[44.667%] to-[rgba(234,218,255,0)] to-[103.92%] whitespace-nowrap"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              Rafeeq
            </p>
            <p
              className="bg-clip-text bg-gradient-to-b from-[#ffffff] from-[35.424%] via-[#ffffff] via-[44.667%] to-[rgba(234,218,255,0)] to-[103.92%] whitespace-nowrap"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              Mission!
            </p>
          </div>

          {/* Mission Description */}
          <p className="font-normal leading-6 text-base text-white tracking-[-0.48px] w-[451.069px]">
            Our mission is to replace this inefficiency with AI-driven logic.
            Rafik acts as your core companion to simplify, personalize, and
            improve every aspect of your campus journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyRafeeq;
