import React from "react";

function Home() {
  return (
    <main>
      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-blue-50">
        <div className="hero-text md:w-1/2">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Daily Reports Made Simple
          </h2>
          <p className="text-gray-700 mb-6">
            Track, create, and manage your reports efficiently.
          </p>
          <div className="space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Register
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
              Login
            </button>
          </div>
        </div>

        <div className="hero-image md:w-1/2 mt-8 md:mt-0">
          {/* SVG Hero Illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-64 md:h-80"
            viewBox="0 0 500 500"
          >
            <circle cx="250" cy="250" r="250" fill="#2563EB" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              fontSize="32"
              fontFamily="Arial"
            >
              Daily Reports
            </text>
          </svg>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="px-8 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <article className="text-center p-6 rounded-lg shadow hover:shadow-lg transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4 w-16 h-16 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h4 className="text-xl font-semibold mb-2">Create Reports</h4>
            <p className="text-gray-600">Easily create new reports in minutes.</p>
          </article>

          {/* Feature 2 */}
          <article className="text-center p-6 rounded-lg shadow hover:shadow-lg transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4 w-16 h-16 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
              />
            </svg>
            <h4 className="text-xl font-semibold mb-2">Edit Reports</h4>
            <p className="text-gray-600">Edit and manage your reports seamlessly.</p>
          </article>

          {/* Feature 3 */}
          <article className="text-center p-6 rounded-lg shadow hover:shadow-lg transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-4 w-16 h-16 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h18v18H3V3zm4 4v10h10V7H7z"
              />
            </svg>
            <h4 className="text-xl font-semibold mb-2">Dashboard</h4>
            <p className="text-gray-600">Get an overview of your reports in real time.</p>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="px-8 py-16 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <article className="step p-6">
            <div className="text-blue-600 text-2xl font-bold mb-2">1</div>
            <h4 className="text-xl font-semibold mb-2">Register / Login</h4>
            <p className="text-gray-600">
              Access your account to start managing reports.
            </p>
          </article>
          <article className="step p-6">
            <div className="text-blue-600 text-2xl font-bold mb-2">2</div>
            <h4 className="text-xl font-semibold mb-2">Create / Edit Reports</h4>
            <p className="text-gray-600">
              Easily create or modify your daily reports.
            </p>
          </article>
          <article className="step p-6">
            <div className="text-blue-600 text-2xl font-bold mb-2">3</div>
            <h4 className="text-xl font-semibold mb-2">Dashboard & Tracking</h4>
            <p className="text-gray-600">
              Monitor your progress and report history efficiently.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;
