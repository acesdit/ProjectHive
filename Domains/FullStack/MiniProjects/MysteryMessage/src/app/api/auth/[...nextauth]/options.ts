// /pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Types } from "mongoose";
import { debugConfig } from "../debug-config";

// Define a user type for MongoDB user
interface UserDocument {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
}

export const generateUsernameFromEmail = async (email: string): Promise<string> => {
  // 1. Get the part before '@' and strip out everything except A–Z / a–z
  const localPart = email.split('@')[0]
  const baseUsername = localPart.replace(/[^a-zA-Z]/g, '')

  // 2. Start with the base; if empty (e.g. '123@…'), you might fall back to something else
  let username = baseUsername || 'user'
  let counter = 1

  // 3. Check uniqueness
  let existing = await UserModel.findOne({ username }).lean().exec()

  // 4. If taken, append an increasing counter
  while (existing) {
    username = `${baseUsername}${counter}`
    counter++
    existing = await UserModel.findOne({ username }).lean().exec()
  }

  return username
}


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password:   { label: "Password",          type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials) throw new Error("Credentials are missing");

        const user = await UserModel.findOne({
          $or: [
            { email: credentials.identifier },
            { username: credentials.identifier }
          ]
        }) as UserDocument;
        if (!user) throw new Error("User not found");
        if (!user.isVerified) throw new Error("Please verify your account");

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error("Incorrect Password");

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          isVerified: Boolean(user.isVerified),
          isAcceptingMessages: Boolean(user.isAcceptingMessages),
        };
      }
    })
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Only handle Google sign-ins
      if (account?.provider === 'google') {
        await dbConnect();
        
        // Check if user exists in our database
        const existingUser = await UserModel.findOne({ email: user.email });
        
        if (existingUser) {
          // User exists, ensure they have a username
          if (!existingUser.username) {
            // Generate a username if they don't have one
            const username = await generateUsernameFromEmail(user.email as string);
            await UserModel.findByIdAndUpdate(existingUser._id, { 
              username,
              isVerified: true
            });
            user.username = username;
          } else {
            user.username = existingUser.username;
          }
        } else {
          // Create a new user with Google info
          const username = await generateUsernameFromEmail(user.email as string);
          const randomPassword = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(randomPassword, 10);
          
          const newUser = new UserModel({
            email: user.email,
            username: username,
            password: hashedPassword,
            isVerified: true,
            verifyCode: "google-auth",
            verifyCodeExpired: new Date(),
            isAcceptingMessages: true
          });
          
          await newUser.save();
          user.username = username;
        }
      }
      return true;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.isVerified = user.isVerified || true; // Google users are pre-verified
        token.isAcceptingMessages = user.isAcceptingMessages || true;
      }
      return token;
    },
    
    async session({ session, token }) {
      session.user._id = token.id as string;
      session.user.email = token.email as string;
      session.user.username = token.username as string;
      session.user.isVerified = token.isVerified as boolean;
      session.user.isAcceptingMessages = token.isAcceptingMessages as boolean;
      return session;
    }
  },  pages: {
    signIn: "/sign-in",
    error: "/auth-error" // Redirect to custom error page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  // Use the imported debug configuration
  ...debugConfig,
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
};

export default NextAuth(authOptions);