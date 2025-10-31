"use client";

import MessageCard from '@/app/components/MessageCard';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { Switch } from '@/app/components/ui/switch';
import { toast } from "sonner";
import { Message } from '@/model/User';
import { APIResponse } from '@/types/APIResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { acceptMessagesSchema } from '@/schemas/acceptMessageSchema';

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<APIResponse>('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to fetch message settings');
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<APIResponse>('/api/get-messages');
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.success('Messages refreshed');
        }
      } catch (error) {
        const axiosError = error as AxiosError<APIResponse>;
        toast.error(axiosError.response?.data.message || 'Failed to fetch messages');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<APIResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      toast.error(axiosError.response?.data.message ?? 'Failed to update message settings');
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile URL has been copied to clipboard.');
  };
  const usernameforDashboard = session?.user?.username || session?.user?.email || 'User';

  return (
    <div className="pt-14 max-sm:px-6 w-full px-10 md:mx-8 lg:mx-auto p-6 bg-white dark:bg-black rounded  transition-colors">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Welcome, {usernameforDashboard}
      </h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Copy Your Unique Link
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded transition-colors"
          />
          <Button onClick={copyToClipboard} className="bg-blue-600 dark:text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
            Copy
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
          className="dark:ring-offset-gray-900"
        />
        <span className="ml-2 text-gray-800 dark:text-gray-200 select-none">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator className="border-gray-300 dark:border-gray-700" />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-gray-700 dark:text-gray-300" />
        ) : (
          <RefreshCcw className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id?.toString() || Math.random().toString()}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <div className="col-span-2 text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors">
            <p className="text-gray-500 dark:text-gray-400">No messages to display.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Share your profile link to receive anonymous messages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
