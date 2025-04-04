"use client"; // ✅ Mark this file as a Client Component

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SessionPage from "./SessionPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookSession />
    </Suspense>
  );
}

function BookSession() {
  const searchParams = useSearchParams(); // ✅ Now inside Suspense
  return <SessionPage />;
}
