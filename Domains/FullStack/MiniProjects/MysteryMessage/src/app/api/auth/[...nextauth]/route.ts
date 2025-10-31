import NextAuth from "next-auth";
import { authOptions } from "./options";

// This is a dynamic route handler for NextAuth.js
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };