import React from 'react';

export default function SplashLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center z-50">
      <div className="text-center">

        {/* Logo */}
        <img
          src="/Restro-icon.svg"
          alt="Restaurant Logo"
          className="w-28 h-28 mx-auto animate-pulse"
        />

        {/* App Name */}
        <h1 className="text-3xl font-bold text-gray-800 mt-5">
          Restro
        </h1>

        <p className="text-gray-500 mt-2">
          Delicious food delivered fast
        </p>

        {/* Loading Spinner */}
        <div className="flex justify-center mt-8">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="mt-5 text-gray-600 font-medium">
          Preparing your restaurant...
        </p>

        <p className="text-sm text-gray-400 mt-1">
          The server may take a few seconds to wake up.
        </p>

      </div>
    </div>
  );
}