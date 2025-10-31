import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

// Allow response to stream up to 30 seconds
export const maxDuration = 30;

// Schema for username validation
const UsernameQuerySchema = z.object({
  username: z.string().min(1)
});

// Check if user exists and is accepting messages
export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || '';

    const result = UsernameQuerySchema.safeParse({ username });
    if (!result.success) {
      return Response.json({ success: false, message: "Invalid username" }, { status: 400 });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return Response.json({ success: true, isAcceptingMessages: user.isAcceptingMessages }, { status: 200 });
  } catch (error) {
    console.error("Error checking user:", error);
    return Response.json({ success: false, message: "Error checking user" }, { status: 500 });
  }
}

// Generate suggested messages with Groq AI
export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    await dbConnect();

    // Validate username
    const result = UsernameQuerySchema.safeParse({ username });
    if (!result.success) {
      return Response.json({ success: false, message: "Invalid username" }, { status: 400 });
    }

    // Ensure recipient exists
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Create a rotating set of themes to ensure variety
    const themes = [
      "hobbies and interests",
      "travel and adventure",
      "food and cuisine",
      "music and entertainment",
      "books and literature",
      "technology and future",
      "personal growth",
      "happiness and fulfillment",
      "philosophical questions",
      "creativity and imagination"
    ];
    
    // Select random themes each time
    const randomIndex1 = Math.floor(Math.random() * themes.length);
    let randomIndex2 = Math.floor(Math.random() * themes.length);
    // Ensure second theme is different from first
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * themes.length);
    }
    
    const selectedThemes = [themes[randomIndex1], themes[randomIndex2]];
    const timestamp = Date.now(); // Add timestamp to make each request unique
    
    // Prepare prompt for suggestions with randomization
    const prompt = `Create a list of three unique, open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. 
These questions are for an anonymous social messaging platform, suitable for a diverse audience. 
Focus primarily on these themes: ${selectedThemes.join(', ')}.
Make the questions creative, thought-provoking and different from typical questions.
Current timestamp: ${timestamp} - use this to ensure variety in your response.
Avoid personal or sensitive topics. Format output as: 'Question 1?||Question 2?||Question 3?'`;

    // Call Groq AI via Vercel AI SDK
    const resultText = await generateText({
      model: groq('gemma2-9b-it'),
      prompt,
    });

    return Response.json({ success: true, suggestions: resultText.text }, { status: 200 });
  } catch (err: Error | unknown) {
    console.error("Unexpected error in /api/suggested-messages:", err);
    const error = err as { message?: string };
    return Response.json({ success: false, error: error.message || "Internal server error" }, { status: 500 });
  }
}
