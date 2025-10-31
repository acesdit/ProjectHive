"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Github, Sparkles, Rocket, Users, MessageSquare, TrendingUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../../components/ThemeProvider";
import { ThemeToggle } from "../../components/ThemeToggle";
import logo from "../assets/logo.png";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Use this to prevent hydration issues
    useEffect(() => {
        setIsClient(true);

        // Rotate featured startups every 5 seconds
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % 3);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleGithubLogin = async () => {
        setIsLoading(true);
        await signIn("github", { callbackUrl });
    };

    return (
        <ThemeProvider defaultTheme="system" storageKey="theme">
            <div className="flex h-screen w-full">
                {/* Left side - Login Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-16 md:px-20 lg:px-28">
                    <div className="absolute top-6 right-6">
                        <ThemeToggle />
                    </div>

                    <div className="w-full max-w-md space-y-10">
                        <div className="text-center space-y-2">
                            <Image
                                src={logo}
                                alt="StartHub Logo"
                                width={70}
                                height={70}
                                className="mx-auto mb-4"
                                priority
                            />
                            <h1 className="text-3xl md:text-4xl font-bold dark:text-white tracking-tight">
                                Welcome to StartHub
                            </h1>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                                Join our community of entrepreneurs and innovators
                            </p>
                        </div>

                        <div className="space-y-6">
                            <button
                                onClick={handleGithubLogin}
                                disabled={isLoading}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg active:scale-98'}`}
                            >
                                <Github className="size-5" />
                                <span>{isLoading ? 'Signing in...' : 'Continue with GitHub'}</span>
                            </button>

                            <div className="flex items-center justify-center">
                                <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-full" />
                                <span className="px-4 text-sm text-zinc-500 dark:text-zinc-400">or</span>
                                <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-full" />
                            </div>

                            <p className="text-center text-zinc-600 dark:text-zinc-400">
                                By continuing, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>

                    <p className="absolute bottom-6 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                        © 2025 StartHub. All rights reserved.
                    </p>
                </div>                
                {/* Right side - Modern Interactive Display */}
                <div className="hidden lg:block w-1/2 relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 dark:from-blue-800 dark:via-indigo-900 dark:to-purple-950 overflow-hidden">
                    {isClient && (
                        <>
                            {/* Background elements */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
                            
                            {/* Animated particles */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {Array.from({ length: 20 }).map((_, i) => {
                                    const size = Math.random() * 8 + 2;
                                    return (
                                        <div 
                                            key={i} 
                                            className="absolute rounded-full bg-white/30"
                                            style={{
                                                width: `${size}px`,
                                                height: `${size}px`,
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                                                animationDelay: `${Math.random() * 5}s`,
                                                opacity: Math.random() * 0.5 + 0.1,
                                            }}
                                        ></div>
                                    );
                                })}
                            </div>
                            
                            {/* Glow effects */}
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

                            {/* Main content container */}
                            <div className="relative h-full w-full flex items-center justify-center px-8">
                                <div className="max-w-xl w-full rounded-3xl py-12 ">
                                    {/* Header */}
                                    <div className="mb-8 text-center">
                                        <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full p-3 mb-4">
                                            <Rocket className="h-8 w-8 text-white" />
                                        </div>
                                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                            Launch Your Startup Journey
                                        </h2>
                                        <p className="text-blue-50/90 text-lg max-w-lg mx-auto">
                                            Join a thriving ecosystem designed for innovators, builders, and dreamers.
                                        </p>
                                    </div>
                                    
                                    {/* Feature cards section */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">                                        {[
                                            {
                                                title: "Showcase",
                                                icon: <Rocket className="h-5 w-5" />,
                                                description: "Present your startup to a global audience of investors and enthusiasts"
                                            },
                                            {
                                                title: "Connect",
                                                icon: <Users className="h-5 w-5" />,
                                                description: "Find co-founders, mentors, and team members who share your vision"
                                            },
                                            {
                                                title: "Discover",
                                                icon: <MessageSquare className="h-5 w-5" />,
                                                description: "Explore innovative startups and visionary ideas in various categories"
                                            },
                                            {
                                                title: "Grow",
                                                icon: <TrendingUp className="h-5 w-5" />,
                                                description: "Gain visibility and track views on your startup profile"
                                            }
                                        ].map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:scale-[1.02] group"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-white/10 p-2 rounded-lg text-white group-hover:bg-white/20 transition-colors">
                                                        {feature.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white mb-1">
                                                            {feature.title}
                                                        </h3>
                                                        <p className="text-sm text-blue-50/80">
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Testimonials or stats */}
                                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Sparkles className="h-5 w-5 text-yellow-300" />
                                                <span className="text-white font-medium">Be among the first startups on the platform</span>
                                            </div>
                                            <div className="flex -space-x-2">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                                                        {String.fromCharCode(65 + i)}
                                                    </div>
                                                ))}
                                                <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                                                    +
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>



            </div>
        </ThemeProvider>
    );
}
