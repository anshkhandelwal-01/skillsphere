import React from 'react';

export default function ErrorPage() {
  return (
    <div className="p-6 text-center">
      <h1>Oops! Page not found.</h1>
      <p>Try going back to <a href="/home">Home</a>.</p>
    </div>
  );
}