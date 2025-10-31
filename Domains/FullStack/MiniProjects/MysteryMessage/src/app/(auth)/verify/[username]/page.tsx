"use client";
import { Button } from "@/app/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { verifySchema } from '@/schemas/verifySchema'
import { APIResponse } from '@/types/APIResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from "sonner"
import * as z from 'zod'
import { Loader2, AlertCircle, KeyRound, RefreshCw } from 'lucide-react'

const VerifyAccount = () => {
    const router = useRouter()
    const params = useParams<{ username: string }>()
    const username = params.username || ''
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [devVerificationCode, setDevVerificationCode] = useState<string | null>(null)
    const [isDevMode, setIsDevMode] = useState(false)
    const [mounted, setMounted] = useState(false)

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: ''
        }
    })

    useEffect(() => setMounted(true), []);

    // Check local storage for saved verification code
    useEffect(() => {
        try {
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                setIsDevMode(true);
                const storedCode = localStorage.getItem(`verification_${username}`);
                if (storedCode) {
                    setDevVerificationCode(storedCode);
                    form.setValue('code', storedCode);
                }
            }
        } catch (e) {
            console.error("Error accessing localStorage:", e);
        }
    }, [username, form]);

    const onSubmit = async (values: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true)
        try {
            const decodedUsername = decodeURIComponent(username)
            const response = await axios.post<APIResponse>('/api/verify-code', {
                username: decodedUsername,
                code: values.code
            })

            if (response.data.success) {
                toast.success("Account verified successfully!")
                try {
                    localStorage.removeItem(`verification_${username}`);
                } catch (e) {
                    console.error("Could not clear localStorage", e);
                }
                router.push('/sign-in')
            } else {
                toast.error(response.data.message || "Verification failed")
            }
        } catch (error) {
            const axiosError = error as AxiosError<APIResponse>
            toast.error(axiosError.response?.data.message || "Verification failed")
        } finally {
            setIsSubmitting(false)
        }
    }

    const resendVerificationCode = async () => {
        try {
            setIsResending(true)
            const response = await axios.post<APIResponse>('/api/sign-up', {
                username: decodeURIComponent(username),
                resendCode: true
            })
            if (response.data.success) {
                if (response.data.verificationCode) {
                    setDevVerificationCode(response.data.verificationCode);
                    form.setValue('code', response.data.verificationCode);
                    try {
                        localStorage.setItem(`verification_${username}`, response.data.verificationCode);
                    } catch (e) {
                        console.error("Could not store in localStorage", e);
                    }
                }
                toast.success(response.data.message || "Verification code resent. Please check your email.")
            } else {
                toast.error(response.data.message || "Failed to resend verification code")
            }
        } catch (error) {
            const axiosError = error as AxiosError<APIResponse>
            toast.error(axiosError.response?.data.message || "Failed to resend verification code")
        } finally {
            setIsResending(false)
        }
    }

    if (!mounted) return null;

    return (
        <div className="flex justify-center items-center min-h-screen py-8 px-4 bg-white text-black dark:bg-black dark:text-white transition-colors">
            <div className="w-full max-w-md p-6 md:p-8 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-blue-900/10">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                        Verify Your Account
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Please enter the verification code sent to your email
                    </p>
                </div>

                {devVerificationCode && (
                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-md p-4 transition-colors">
                        <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Development Mode</h3>
                                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                    Verification code: <span className="font-mono font-semibold">{devVerificationCode}</span>
                                </p>
                                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                    This code is being displayed due to free tier limitations or development mode
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Verification Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter 6-digit code"
                                            {...field}
                                            className="placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600 dark:text-red-400" />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-11 font-medium transition-all"
                                style={{
                                    background: "linear-gradient(90deg, #1e3a8a, #2563eb, #3b82f6)",
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        <KeyRound className="h-5 w-5 mr-1" />
                                        Verify Account
                                    </>
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resendVerificationCode}
                                disabled={isResending}
                                className="w-full h-11 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {isResending ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Resending...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw className="h-5 w-5 mr-1" />
                                        Resend Verification Code
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default VerifyAccount
