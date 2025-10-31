"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { signinSchema } from "@/schemas/signinSchema";
import { signIn } from "next-auth/react";
import { Loader2, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);  const [mounted, setMounted] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Check for error parameters in URL
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error) {
      switch(error) {
        case 'CredentialsSignin':
          setAuthError('Invalid username/email or password');
          break;
        case 'OAuthAccountNotLinked':
          setAuthError('Email already used with different provider');
          break;
        case 'OAuthSignin':
        case 'OAuthCallback':
          setAuthError('Error signing in with Google');
          break;
        case 'AccessDenied':
          setAuthError('Account not verified');
          break;
        default:
          setAuthError('An error occurred during sign in');
      }
      toast.error(authError || 'Authentication failed');
    }
  }, [authError]);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { identifier: "", password: "" }
  });  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Log environment info
      console.log("Sign-in attempt environment:", {
        hostname: window.location.hostname,
        origin: window.location.origin,
        href: window.location.href
      });
      
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
        callbackUrl: '/dashboard'
      });

      if (result?.error) {
        console.error("Authentication error:", {
          error: result.error,
          status: result.status,
          ok: result.ok,
          url: result.url
        });
        toast.error(result.error || "Incorrect username or password");
        return;
      }

      if (!result?.ok) {
        console.error("Sign-in not OK:", result);
        toast.error("Failed to sign in. Please try again.");
        return;
      }

      toast.success("Login successful!");
      
      // More verbose redirection with fallbacks
      console.log("Successful sign-in, redirecting with:", result);
      
      // Always use the URL from result when available
      if (result.url) {
        console.log("Redirecting to:", result.url);
        window.location.href = result.url;
      } else {
        console.log("No URL in result, using router");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };  const handleGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      
      // Determine the correct callback URL based on hostname
      const hostname = window.location.hostname;
      
      // Add callback URL based on current hostname
      const callbackUrl = "/dashboard";
      
      // Log sign-in attempt with environment details
      console.log("Starting Google sign-in:", {
        callbackUrl,
        hostname,
        origin: window.location.origin,
        href: window.location.href
      });
      
      await signIn("google", { 
        callbackUrl,
        redirect: true
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Error signing in with Google. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex w-full justify-center items-center min-h-screen py-8 px-4 bg-white text-black dark:bg-black dark:text-white transition-colors">
      <div className="w-full max-w-md p-6 md:p-8 pb-12 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-blue-900/10">
        <div className="text-center py-4 space-y-2">
          <h1 className="text-4xl font-extrabold ">MysteryMessage</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">Email or Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email or username"
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
                      placeholder="Enter your password"
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
              disabled={isSubmitting}
              className="w-full h-11 dark:text-white font-medium transition-all"
              style={{
                background: "linear-gradient(90deg, #1e3a8a, #2563eb, #3b82f6)",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-1" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="px-2 text-gray-500 dark:text-gray-400">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>

        <Button
          variant="outline"
          disabled={isGoogleLoading}
          onClick={handleGoogle}
          className="w-full h-11 font-medium transition-all"
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <FcGoogle className="h-5 w-5 mr-2" />
          )}
          <span className="flex items-center justify-center">
            {isGoogleLoading ? `Signing in with Google...` : `Sign in with Google`}
          </span>
        </Button>

        <div className="pt-4 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            New to MysteryMessage?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
