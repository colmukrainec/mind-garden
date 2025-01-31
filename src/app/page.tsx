'use client'

import React, { useState } from 'react';
import { login, signup } from "./login/actions";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(/gradient.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-green-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-700 mb-2">MindGarden</h1>
            <p className="text-gray-500">Cultivate Your Mental Wellness</p>
          </div>
          
          <form className="space-y-6">
            {!isLogin && (
              <>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out text-black"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out text-black"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out text-black"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out text-black"
              />
            </div>

            <button
              type="submit"
              formAction={isLogin ? login : signup}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out"
            >
              {isLogin ? "Log in" : "Sign up"}
            </button>

            <p className="text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-600 hover:text-green-700 font-medium focus:outline-none"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}