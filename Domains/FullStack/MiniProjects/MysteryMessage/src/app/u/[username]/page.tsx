"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { APIResponse } from '@/types/APIResponse';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const UserMessagePage = () => {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [isAcceptingMessages, setIsAcceptingMessages] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);

  // Check user on mount
  useEffect(() => {
    async function checkUser() {
      try {
        const response = await axios.get<APIResponse>(`/api/suggested-messages?username=${username}`);
        setUserExists(true);
        setIsAcceptingMessages(response.data.isAcceptingMessages || false);
      } catch (error) {
        console.error('Error checking user:', error);
        setUserExists(false);
      }
    }
    if (username) checkUser();
  }, [username]);

  const fetchSuggestions = async () => {
    setSuggestLoading(true);
    try {
      const res = await axios.post<APIResponse>('/api/suggested-messages', { username });
      if (res.data.success && typeof res.data.suggestions === 'string') {
        const arr = res.data.suggestions.split('||').map((s: string) => s.trim()).filter(Boolean);
        setSuggestions(arr.slice(0, 3));
      } else {
        toast.error(res.data.message || 'Failed to fetch suggestions');
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      toast.error('Error fetching suggestions');
    } finally {
      setSuggestLoading(false);
    }
  };

  // Auto-fetch suggestions when username is available
  useEffect(() => {
    if (!username) return;
    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleSuggestionClick = (text: string) => {
    setMessage(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return toast.error('Please enter a message');

    setLoading(true);
    try {
      const response = await axios.post<APIResponse>('/api/send-message', { username, content: message });
      if (response.data.success) {
        setSubmitted(true);
        toast.success('Message sent!');
        setMessage('');
      } else {
        toast.error(response.data.message || 'Failed to send message');
      }
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  if (!userExists) return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">User Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300">This user does not exist.</p>
      </div>
    </div>
  );

  if (!isAcceptingMessages) return (
    <>
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Messages Disabled</h1>
        <p className="text-gray-600 dark:text-gray-300">This user is not accepting messages.</p>
      </div>
      </div>
      <section className="w-full px-4 py-8 dark:text-white font-bold  text-center">
        <h2 className="text-4xl max-sm:text-2xl py-2 font-semibold mb-4">Want unfiltered thoughts from your friends?</h2>
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
      </>
  );

  if (submitted) return (
    <div className="container dark:bg-black  mx-auto px-4 py-16 max-w-md">
      <div className="bg-white dark:bg-black rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Your anonymous message has been delivered.</p>
        <Button onClick={() => setSubmitted(false)}>Send Another</Button>
      </div>
    </div>
  );

  return (
    <div className="pt-16 container dark:bg-black mx-auto  px-4 max-sm:px-1 max-sm:py-2 py-8">      
      <div className="flex flex-col pt-14 max-sm:pt-1 md:flex-row gap-8">

        

        {/* Form Section */}
        <div className="md:w-2/3 bg-white dark:bg-black rounded-lg shadow-md p-6">
          <h1 className="text-4xl max-sm:text-3xl font-bold mb-6">Send a message to @{username}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your anonymous message here..."
              className="min-h-32"
              disabled={loading}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Send Message'}
            </Button>
          </form>
        </div>

        {/* Suggestions Section */}
        <div className="md:w-1/3 bg-white dark:bg-black rounded-lg shadow-md p-6">
          <div className="flex justify-between dark:bg-black items-center mb-4">
            <h2 className="text-xl font-semibold">Suggested Messages</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSuggestions}
              disabled={suggestLoading}
              className="flex items-center gap-1"
            >
              {suggestLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
              <span>Refresh</span>
            </Button>
          </div>

          {suggestLoading ? (
            <div className="flex dark:bg-black justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-gray-600 dark:text-gray-300" />
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              {suggestions.map((msg, i) => (
                <div
                  key={i}
                  onClick={() => handleSuggestionClick(msg)}
                  className="p-4 bg-gray-100 dark:bg-gray-900 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  {msg}
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
      <section className="w-full px-4 py-22 dark:text-white font-bold  text-center">
        <h2 className="text-4xl max-sm:text-2xl py-2 max-sm:py-2 font-bold mb-4">Curious what others truly think of you?</h2>
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
    </div>
  );
};

export default UserMessagePage;