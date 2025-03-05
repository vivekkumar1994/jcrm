"use client";

import HomePage from "./components/Home";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
 

      {/* Main Content (Pushes footer to bottom when content is short) */}
      <main className="flex-1 flex flex-col items-center justify-center mt-8 sm:mt-16">
        <HomePage />
      </main>
    </div>
  );
}
