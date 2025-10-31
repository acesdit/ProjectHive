"use client";

import Navbar from "../../components/Navbar";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="font-work-sans
        ">
            <SessionProvider>
                <ThemeProvider defaultTheme="system" storageKey="theme">
                    <Navbar />

                    {children}

                </ThemeProvider>
            </SessionProvider>
        </main>
    );
}