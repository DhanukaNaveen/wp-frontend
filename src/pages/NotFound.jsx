// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full py-20 bg-gray-50 flex flex-col items-center justify-center text-center">
      <div className="max-w-md p-8 bg-white rounded-xl shadow-2xl border-t-4 border-accent">
        <h1 className="text-8xl font-extrabold text-accent mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition shadow-md"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
}