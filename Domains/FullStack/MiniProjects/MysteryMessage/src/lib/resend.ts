import { Resend } from "resend";

// Support both formats of the environment variable
const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_APIKEY;

if (!apiKey) {
  console.warn("Warning: Resend API key is not set in environment variables. Email functionality will not work.");
} else {
  console.log(`Resend configured with API key starting with: ${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

export const resend = new Resend(apiKey || "");
