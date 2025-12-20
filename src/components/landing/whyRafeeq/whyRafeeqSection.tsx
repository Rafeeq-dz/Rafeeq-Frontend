import WhyRafeeq from './whyrafeeq'
import Problems from './problems'
const WhyRafeeqSection = () => {
  return (
    <section className='flex flex-col lg:flex-row max-md:w-full items-start py-20 p-30 justify-between w-full'>
        <WhyRafeeq />
        <Problems />
    </section>
  )
}

export default WhyRafeeqSection