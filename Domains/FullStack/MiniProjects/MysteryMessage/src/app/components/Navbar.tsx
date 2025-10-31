"use client"

import { Menu, X, User as UserIcon, Loader2 } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import logo from "../assets/logo.png"
import Image from "next/image"
import ShinyText from './ShinyText'
import { useTheme } from 'next-themes'

const Navbar = () => {
  const { data: session, status } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === 'system' ? systemTheme : theme

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="fixed w-full p-2 md:p-4 bg-white dark:bg-black z-50">
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between md:justify-start">
          {/* Desktop: Left - Logo */}
          <Link href="/" className="hidden md:block">
            <Image src={logo} alt="MysteryMessage logo" width={60} height={30} />
          </Link>

          {/* Desktop: Center - ShinyText */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-4xl font-bold text-center font-serif">
              {/* Light mode text */}
              <span className="dark:hidden">MysteryMessage</span>

              {/* Dark mode shiny text */}
              <span className="hidden dark:inline">
                <ShinyText text="MysteryMessage" disabled={false} speed={3} className="custom-class" />
              </span>
            </h1>
          </div>


          {/* Desktop: Right - ThemeToggle + Session */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <ThemeToggle />
            {status === 'loading' ? (
              <span className="text-sm"><Loader2/></span>
            ) : session ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-primary" />
                  </div>
                  <Link href={"/dashboard"}><span className="text-sm font-medium">{session.user.username}</span></Link>
                </div>
                <Button size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
                  Log Out
                </Button>
              </div>
            ) : (
              <Link href="/sign-in">
                <Button size="sm">Log in</Button>
              </Link>
            )}
          </div>

          {/* Mobile: Left - Logo */}
          <Link href="/" className="md:hidden">
            <Image src={logo} alt="MysteryMessage logo" width={50} height={30} />
          </Link>

          {/* Mobile: Center - ShinyText */}
          <div className="flex-1 flex justify-center md:hidden">
            <h1 className="text-2xl font-bold font-serif text-black dark:text-white">
              <span className="dark:hidden">MysteryMessage</span>
              <span className="hidden dark:inline">
                <ShinyText text="MysteryMessage" disabled={false} speed={3} className="custom-class" />
              </span>
            </h1>
          </div>



          {/* Mobile: Right - ThemeToggle + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">

            <button
              className="p-2 rounded-md focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col justify-center items-center pt-4 pb-2 px-2 space-y-4 border-t dark:border-gray-800 mt-4">
            {status === 'loading' ? (
              <span className="block py-2 text-sm"><Loader2/></span>
            ) : session ? (
              <>
                <div className="flex w-full flex-row justify-between gap-2 py-2">
                  <div className='flex justify-center items-center gap-2'>

                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-primary" />
                    </div>
                    <Link href={"/dashboard"}><span className="text-sm font-medium">{session.user.username}</span></Link>
                  </div>
                  <div>
                    <ThemeToggle />
                  </div>
                </div>
                <div>
               
                <Button
                  className="w-full"
                  onClick={() => {
                    signOut({ callbackUrl: '/' })
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Log Out
                </Button>
                </div>
              </>
            ) : (
              <div className='flex justify-between w-full'>               
                         
              <Link
                href="/sign-in"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full">Log in</Button>
              </Link>
              <ThemeToggle />     
              </div>
            )}

          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
