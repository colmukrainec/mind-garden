import { login, signup } from "./login/actions";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>MindGarden</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-green-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-700 mb-2">MindGarden</h1>
            <p className="text-gray-500">Cultivate Your Mental Wellness</p>
          </div>
          <form className="space-y-6">
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

            <div className="flex space-x-4">
              <button
                type="submit"
                formAction={login}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out"
              >
                Log in
              </button>
              <button
                type="submit"
                formAction={signup}
                className="flex-1 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors duration-300 ease-in-out"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}