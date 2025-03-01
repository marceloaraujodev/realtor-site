"use client";

import { useEffect } from "react";

// Cast the props to `any` to bypass type-checking
export default function ErrorPage({ error, reset }: any) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error?.message || "An unknown error occurred"}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}