"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useDebounceCallback } from 'usehooks-ts'
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signupSchema"
import axios, { AxiosError } from 'axios'
import { APIResponse } from "@/types/APIResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Loader2, UserPlus, Check, X } from "lucide-react"

const Page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setusernameMessage] = useState('')
  const [ischeckingUserName, setischeckingUserName] = useState(false)
  const [isSubmiting, setisSubmiting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const debounced = useDebounceCallback(setUsername, 300)

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setisSubmiting(true);

      const usernameResponse = await axios.get<APIResponse>(`/api/check-username-unique?username=${data.username}`);
      if (!usernameResponse.data.success) {
        toast.error(usernameResponse.data.message || "Username is already taken or invalid");
        setisSubmiting(false);
        return;
      }

      const response = await axios.post<APIResponse>('/api/sign-up', data);

      if (response.data.success) {
        toast.success(
          "Account created successfully! Check your email for a verification code.",
          { duration: 5000 }
        );
        router.push(`/verify/${encodeURIComponent(data.username)}`);
      } else {
        toast.error(
          Array.isArray(response.data.message)
            ? response.data.message.join(", ")
            : response.data.message || "Failed to create account"
        );
      }
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      const errorMessage = axiosError.response?.data.message || "Something went wrong";
      toast.error(Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage);
      console.error("Sign up error:", error);
    } finally {
      setisSubmiting(false);
    }
  };

  useEffect(() => {
    const checkUserNameUnique = async () => {
      if (username) {
        setischeckingUserName(true);
        setusernameMessage('');
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`);
          setusernameMessage(response.data.message);

          if (response.data.success && response.data.message === "Username is unique") {
            form.clearErrors("username");
          } else {
            form.setError("username", {
              type: "manual",
              message: "Username already taken"
            });
          }
        } catch (error) {
          const axiosError = error as AxiosError<APIResponse>;
          setusernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
          form.setError("username", {
            type: "manual",
            message: axiosError.response?.data.message ?? "Username validation failed"
          });
        } finally {
          setischeckingUserName(false);
        }
      }
    };

    checkUserNameUnique();
  }, [username, form]);

  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center min-h-screen py-8 px-4 bg-white text-black dark:bg-black dark:text-white transition-colors">
      <div className="w-full max-w-md p-6 md:p-8 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-blue-900/10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold ">
            MysteryMessage
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Create your account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Choose a unique username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                      className="placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800"
                    />
                  </FormControl>
                  <div className="flex items-center h-6">
                    {ischeckingUserName ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2 text-gray-500 dark:text-gray-400" />
                    ) : username ? (
                      usernameMessage === "Username is unique" ? (
                        <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Username available
                        </p>
                      ) : (
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
                          <X className="h-4 w-4 mr-1" />
                          {usernameMessage}
                        </p>
                      )
                    ) : null}
                  </div>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      {...field}
                      className="placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create a secure password"
                      {...field}
                      className="placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 dark:text-red-400" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmiting}
              className="w-full h-11 dark:text-white font-medium transition-all"
              style={{
                background: "linear-gradient(90deg, #1e3a8a, #2563eb, #3b82f6)",
              }}
            >
              {isSubmiting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-1" />
                  Sign Up
                </>
              )}
            </Button>
            <div className="pt-4 text-center border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Page;
