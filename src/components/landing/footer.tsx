"use client"

import React from 'react'

import { Link }from 'react-router-dom'

const Footer = () => {
  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Case studies', href: '#case-studies' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'Updates', href: '#updates' },
    ],
    company: [
      { label: 'About', href: '#about' },
      { label: 'Contact us', href: '#contact' },
      { label: 'Careers', href: '#careers' },
      { label: 'Culture', href: '#culture' },
      { label: 'Blog', href: '#blog' },
    ],
    support: [
      { label: 'Getting started', href: '#getting-started' },
      { label: 'Help center', href: '#help-center' },
      { label: 'Server status', href: '#server-status' },
      { label: 'Report a bug', href: '#report-bug' },
      { label: 'Chat support', href: '#chat-support' },
    ],
  }

  const socialMedia = [
    { icon: '/images/social-facebook.svg', href: '#facebook', alt: 'Facebook', width: 11, height: 19 },
    { icon: '/images/social-twitter.svg', href: '#twitter', alt: 'Twitter', width: 19, height: 15 },
    { icon: '/images/social-instagram.svg', href: '#instagram', alt: 'Instagram', width: 19, height: 19 },
    { icon: '/images/social-linkedin.svg', href: '#linkedin', alt: 'LinkedIn', width: 19, height: 18 },
    { icon: '/images/social-youtube.svg', href: '#youtube', alt: 'YouTube', width: 21, height: 15 },
  ]

  return (
    <footer className='bg-white w-full relative overflow-hidden'>
      {/* Top Divider */}
      <div className='w-full h-0 relative'>
        <img 
          src="/images/footer-divider.svg" 
          alt="" 
          width={1440} 
          height={1}
          className='w-full rotate-180'
        />
      </div>

      <div className='max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[99px] py-12 md:py-16 lg:py-[120px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8'>
          {/* Logo & Social Section */}
          <div className='lg:col-span-1 flex flex-col gap-6'>
            <div className='w-[146.084px] h-[39.824px] relative'>
              <img 
                src="/images/logo-footer.svg" 
                alt="Rafeeq Logo" 
                
                className='object-contain w-full h-full'
              />
            </div>
            <p 
              className='text-[#6f6c90] text-lg leading-[30px] max-w-[310px]'
              style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            </p>
            <div className='flex items-center gap-[22px]'>
              {socialMedia.map((social, index) => (
                <Link 
                  key={index} 
                  to={social.href}
                  className='hover:opacity-70 transition-opacity'
                >
                  <img 
                    src={social.icon} 
                    alt={social.alt} 
                    width={social.width} 
                    height={social.height}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div className='flex flex-col gap-8 lg:gap-10'>
            <h3 
              className='text-[#170f49] text-xl font-bold leading-[22px]'
              style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
            >
              Product
            </h3>
            <ul className='flex flex-col gap-[18px]'>
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className='text-[#6f6c90] text-lg leading-5 hover:text-[#4a3aff] transition-colors'
                    style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className='flex flex-col gap-8 lg:gap-10'>
            <h3 
              className='text-[#170f49] text-xl font-bold leading-[22px]'
              style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
            >
              Company
            </h3>
            <ul className='flex flex-col gap-[18px]'>
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className='text-[#6f6c90] text-lg leading-5 hover:text-[#4a3aff] transition-colors'
                    style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className='flex flex-col gap-8 lg:gap-10'>
            <h3 
              className='text-[#170f49] text-xl font-bold leading-[22px]'
              style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
            >
              Support
            </h3>
            <ul className='flex flex-col gap-[18px]'>
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className='text-[#6f6c90] text-lg leading-5 hover:text-[#4a3aff] transition-colors'
                    style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className='flex flex-col gap-8 lg:gap-10'>
            <h3 
              className='text-[#170f49] text-xl font-bold leading-[22px]'
              style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
            >
              Contacts us
            </h3>
            <div className='flex flex-col gap-[42px]'>
              {/* Email */}
              <Link 
                to="mailto:contact@company.com"
                className='flex items-center gap-[6px] hover:text-[#4a3aff] transition-colors group'
              >
                <img 
                  src="/images/icon-email.svg" 
                  alt="Email" 
                  width={20} 
                  height={20}
                  className='flex-shrink-0'
                />
                <span 
                  className='text-[#6f6c90] text-lg leading-5 group-hover:text-[#4a3aff]'
                  style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
                >
                  contact@company.com
                </span>
              </Link>

              {/* Phone */}
              <Link 
                to="tel:+14146875892"
                className='flex items-center gap-[6px] hover:text-[#4a3aff] transition-colors group'
              >
                <img 
                  src="/images/icon-phone.svg" 
                  alt="Phone" 
                  width={20} 
                  height={20}
                  className='flex-shrink-0'
                />
                <span 
                  className='text-[#6f6c90] text-lg leading-5 group-hover:text-[#4a3aff]'
                  style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
                >
                  (414) 687 - 5892
                </span>
              </Link>

              {/* Address */}
              <div className='flex gap-2 items-start'>
                <img 
                  src="/images/icon-location.svg" 
                  alt="Location" 
                  width={20} 
                  height={20}
                  className='flex-shrink-0 mt-[5.7px]'
                />
                <address 
                  className='text-[#6f6c90] text-lg leading-[30px] not-italic'
                  style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
                >
                  794 Mcallister St<br />
                  San Francisco, 94102
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-16 lg:mt-[221px] pt-6 lg:pt-[25px] border-t border-[#d9dbe9] relative'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p 
              className='text-[#6f6c90] text-lg leading-[30px] text-center md:text-left'
              style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
            >
              Copyright © 2025 rafeeq
            </p>
            <p 
              className='text-[#6f6c90] text-lg leading-[30px] text-center md:text-right'
              style={{ fontFamily: 'DM Sans', fontVariationSettings: "'opsz' 14" }}
            >
              All Rights Reserved |{' '}
              <Link to="#terms" className='text-[#4a3aff] underline hover:opacity-80'>
                Terms and Conditions
              </Link>
              {' | '}
              <Link to="#privacy" className='text-[#4a3aff] underline hover:opacity-80'>
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer