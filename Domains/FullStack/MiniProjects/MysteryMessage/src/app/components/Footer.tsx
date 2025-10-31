"use client"

import Link from "next/link"
import { Github, Mail, Heart, Linkedin } from "lucide-react"
import Image from "next/image"
import logo from "../assets/logo.png"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full dark:bg-black py-6 px-4 md:px-6 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex gap-2 justify-start mb-4 items-center">
              <Image src={logo} alt="MysteryMessage Logo" width={35} height={35} />
            <h3 className="text-lg font-semibold">MysteryMessage</h3>
            </div>            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Send anonymous messages to your friends and receive messages from others.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="mailto:sujalpawar00007@gmail.com" aria-label="Email" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://github.com/sujal-pawar" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/sujal-pawar/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} Mystery Message. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  )
}
