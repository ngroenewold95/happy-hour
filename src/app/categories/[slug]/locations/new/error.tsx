"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <div>
      <h1>An error occurred</h1>
      <p>Error message: {error.message}</p>
    </div>
  );
}
