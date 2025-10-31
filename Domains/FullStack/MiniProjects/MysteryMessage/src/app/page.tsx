"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import DecryptedText from '@/app/components/DecryptedText';
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { ShieldCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import ScrollVelocity from '@/app/components/ScrollVelocity';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>MysteryMessage • Anonymous Feedback Platform</title>
        <meta
          name="description"
          content="Dive into the world of anonymous feedback with MysteryMessage. Share and receive messages without revealing identity."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="pt-12 max-sm:pt-4 min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white transition-colors">
        <main className="w-full flex flex-col items-center justify-center md:px-0">
          {/* Hero Section */}
          <section className="text-center max-sm:px-4 mb-12 max-w-4xl mx-auto">
            <div style={{ marginTop: '2rem' }}>
              <h1 className="text-6xl max-sm:text-5xl  font-extrabold leading-tight">
                <DecryptedText
                  text="Dive into the World of Anonymous Feedback"
                  animateOn="view"
                  revealDirection="center"
                  speed={150}
                />
              </h1>
            </div>
            <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              MysteryMessage is a secure platform where your identity remains a secret while you share honest feedback.
              No usernames, no emails - just pure, unfiltered messages.
            </p>
            <div className="mt-8 flex flex-col max-sm:flex-row md:flex-row gap-4 justify-center">
              <Link href="/sign-up" passHref>
                <Button
                  size="lg"
                  className="text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
                  style={{
                    background: "linear-gradient(90deg, #1e3a8a, #2563eb, #3b82f6)",
                  }}
                  aria-label="Get started with MysteryMessage"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/sign-in" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-black border-black hover:bg-gray-100 dark:text-white dark:border-white dark:hover:bg-gray-800"
                  aria-label="Sign in to MysteryMessage"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </section>


          {/* Features Section */}
          <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4 md:px-0 mx-auto">
            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>100% Anonymous</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                No usernames, emails, or any identifiers. Your messages remain completely private and untraceable.
              </CardContent>
            </Card>

            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Instant Delivery</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Messages are sent and received in real time through our secure channels.
              </CardContent>
            </Card>

            <Card className="bg-gray-100 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Easy Integration</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300">
                Seamlessly integrate with your existing tech stack via API endpoints.
              </CardContent>
            </Card>
          </section>
          <div className="w-full py-4 mx-auto">
            <ScrollVelocity
              texts={[
                <span key="1" className="dark:text-blue-600 text-blue-700">MysteryMessage </span>,
                <span key="2" className="dark:text-blue-300 text-blue-400">Anonymous Feedbacks </span>
              ]}
              velocity={50}
              className="custom-scroll-text"
            />
          </div>



          {/* How It Works Section */}
          <section className="w-full pt-8 max-w-4xl mb-16 px-4 md:px-0 mx-auto">
            <h2 className="text-4xl max-sm:text-2xl font-extrabold mb-8 text-center">How MysteryMessage Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">Send Anonymously</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Write your message without revealing your identity. No usernames or emails are required.
                </p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">Secure & Encrypted</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  All messages are encrypted and transmitted securely to protect your privacy.
                </p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <Users className="mx-auto mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">Receive & Respond</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Receive honest feedback without knowing the sender's identity, fostering trust and openness.
                </p>
              </div>
            </div>
          </section>

          <section className="w-full px-4 py-16 dark:bg-black">

            <div className="mx-auto max-w-4xl space-y-12">
              <h1 className="text-6xl max-sm:text-4xl font-bold dark:text-white">Steps for getting started</h1>
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full mb-4 md:mb-0">
                  1
                </div>
                <div className="md:ml-6">
                  <h4 className="text-xl font-semibold">Install & Signup</h4>
                  <p>Create an account—no personal info required.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full mb-4 md:mb-0">
                  2
                </div>
                <div className="md:ml-6">
                  <h4 className="text-xl font-semibold">Share Your Link</h4>
                  <p>Generate a unique feedback link and send it out.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full mb-4 md:mb-0">
                  3
                </div>
                <div className="md:ml-6">
                  <h4 className="text-xl font-semibold">Collect Responses</h4>
                  <p>Feedback comes in anonymously—honest answers every time.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full mb-4 md:mb-0">
                  4
                </div>
                <div className="md:ml-6">
                  <h4 className="text-xl font-semibold">View Insights</h4>
                  <p>See aggregated feedback in your secure dashboard.</p>
                </div>
              </div>
            </div>
          </section>


          <section className="w-full max-w-4xl mb-16 px-4 md:px-0 mx-auto">
            <h2 className="text-4xl max-sm:text-2xl font-bold mb-8 text-center inline-block">
              What Our Users Say
            </h2>
            <div className="space-y-8">
              {[
                {
                  name: "Alex P.",
                  feedback: "MysteryMessage helped me get honest feedback without any awkwardness. Highly recommend!",
                },
                {
                  name: "Samantha R.",
                  feedback: "The anonymity feature makes it so easy to share my true thoughts. Love this platform!",
                },
                {
                  name: "Jordan K.",
                  feedback: "Secure, simple, and effective. A must-have for anyone wanting honest communication.",
                },
              ].map(({ name, feedback }, idx) => (
                <blockquote
                  key={idx}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md text-gray-700 dark:text-gray-300"
                >
                  <p className="italic mb-4">&quot;{feedback}&quot;</p>
                  <footer className="text-right font-semibold">- {name}</footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section className="w-full px-4 py-22 dark:text-white font-bold  text-center">
            <h2 className="text-4xl max-sm:text-4xl max-sm:py-4 font-semibold mb-4">Ready to get honest feedback?</h2>
            <Button
              size="lg"
              className="text-white font-semibold px-6 py-3 rounded-lg  shadow-lg"
              style={{
                background: "linear-gradient(90deg, #1e3a8a, #2563eb, #3b82f6)",
              }}
              aria-label="Get started with MysteryMessage"
            >
              <Link href={"/sign-up"}>
                Try MysteryMessage
              </Link>
            </Button>
          </section>

        </main>
      </div>
    </>
  );
}
