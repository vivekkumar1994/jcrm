import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "vivek-ai", // Unique app ID
  name: "vivek-ai",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});