"use client";

import { useEffect, useState } from "react";

import {Link} from "react-router-dom";
export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <div
      className={`w-full flex justify-between items-center font-sans px-4 sm:px-8 md:px-16 lg:px-30 py-4 md:py-5 fixed top-0 z-50
      transition-all duration-300 ease-in-out
      ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white"
      }`}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          src="/images/Layer_1.svg"
          alt="Rafeeq Logo"
          width={120}
          height={40}
          className="w-24 sm:w-32 md:w-[146px] h-auto"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className={`hidden lg:flex gap-6 xl:gap-8 transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-gray-800'}`}>
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href}
            className="hover:text-[#4a3aff] transition-colors duration-200 font-medium text-sm xl:text-base"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        <Link 
          to="/auth/login"
          className="px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium text-gray-800 text-sm lg:text-base"
        >
          Login
        </Link>
        <Link 
          to="/auth/register"
          className="px-4 lg:px-6 py-2 rounded-lg bg-[#4a3aff] text-white hover:bg-[#3d2fd9] transition-all duration-200 font-medium shadow-sm hover:shadow-md text-sm lg:text-base whitespace-nowrap"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center relative z-50"
        aria-label="Toggle menu"
      >
        <span
          className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
            mobileMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
            mobileMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
            mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-[280px] sm:w-[320px] bg-white shadow-2xl z-40 lg:hidden
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6">
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-4 mb-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 hover:text-[#4a3aff] transition-colors duration-200 font-medium text-lg py-2 border-b border-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3 mt-auto">
            <Link
              to="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium text-gray-800 text-center border border-gray-200"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-3 rounded-lg bg-[#4a3aff] text-white hover:bg-[#3d2fd9] transition-all duration-200 font-medium shadow-sm hover:shadow-md text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
