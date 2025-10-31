"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import logo from "@/app/assets/logo.png";

export default function LoadingAnimation({ fullScreen = true }: { fullScreen?: boolean }) {
  // For SVG animation
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Loading phrases that rotate
  const phrases = [
    "Connecting entrepreneurs...",
    "Loading innovations...",
    "Building the future...",
    "Gathering startups...",
    "Almost there..."
  ];

  useEffect(() => {
    setMounted(true);
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (Math.random() * 8);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    // Rotate loading phrases
    const phraseInterval = setInterval(() => {
      setLoadingPhrase(prev => (prev + 1) % phrases.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
    };
  }, [phrases.length]);

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : 'h-full'}`}>
        <div className="animate-pulse text-zinc-500 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div 
      className={`relative flex flex-col items-center justify-center ${fullScreen ? 'h-screen' : 'h-full'} w-full bg-white dark:bg-black`}
    >
      {/* Grid pattern in background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 dark:opacity-10"></div>
      
      {/* Radial gradient behind logo */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-3xl"></div>
      
      {/* Container for logo and animations */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with animated elements */}
        <div className="relative mb-8">
          {/* Glowing effect under logo */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-30 blur-xl animate-pulse"></div>
          
          {/* Shimmer effect over logo */}
          <div className="relative animate-float">
            <div className="absolute inset-0 w-full h-full animate-shimmer rounded-full"></div>
            <Image 
              src={logo}
              width={120}
              height={120}
              alt="StartHub Logo"
              className="drop-shadow-lg"
              priority
            />
          </div>
          
          {/* Animated ring around logo */}
          <div className="absolute inset-0 w-full h-full border-4 border-blue-500/30 rounded-full animate-ping opacity-30"></div>
        </div>

        {/* StartHub text with gradient */}
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 tracking-tight animate-reveal">
          StartHub
        </h1>
        
        {/* Animated progress bar */}
        <div className="w-64 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3 relative">
          {/* Subtle pulse animation under progress bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse"></div>
          
          {/* Actual progress bar */}
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Loading text that cycles through phrases */}
        <div className="h-6 relative">
          <p className="text-zinc-600 dark:text-zinc-400 absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            {progress >= 100 ? "Ready!" : phrases[loadingPhrase]}
          </p>
        </div>
        
        {/* Subtle floating particles in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => {
            const size = Math.random() * 20 + 5;
            return (
              <div 
                key={i} 
                className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-500/10' : i % 3 === 1 ? 'bg-indigo-500/10' : 'bg-purple-500/10'}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 8 + 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            );
          })}
        </div>

        {/* Code-like animated elements for tech feel */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2">
          <div className="w-20 h-1 bg-blue-500/20 rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
          <div className="w-12 h-1 bg-indigo-500/20 rounded animate-pulse mt-2" style={{animationDelay: '0.3s'}}></div>
          <div className="w-16 h-1 bg-purple-500/20 rounded animate-pulse mt-2" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2">
          <div className="w-14 h-1 bg-blue-500/20 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-20 h-1 bg-indigo-500/20 rounded animate-pulse mt-2" style={{animationDelay: '0.4s'}}></div>
          <div className="w-10 h-1 bg-purple-500/20 rounded animate-pulse mt-2" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>
    </div>
  );
}
