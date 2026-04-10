"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {/* Navbar */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-cyan-300">SMS System</h1>
            <p className="text-xs text-slate-300">School Management System</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 transition text-sm font-medium"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition text-sm font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-indigo-300 mb-4">
              Modern Education Platform
            </p>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Manage Your
              <span className="text-cyan-300"> School </span>
              Smarter
            </h2>

            <p className="mt-6 text-lg text-slate-300 leading-8 max-w-2xl">
              A professional school management system for administrators,
              teachers, students, and parents to manage academics, attendance,
              marks, and announcements in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition"
              >
                Login Now
              </Link>

              <Link
                href="/register"
                className="px-6 py-3 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 font-medium transition"
              >
                Create Account
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-cyan-300">4</p>
                <p className="text-sm text-slate-300 mt-1">User Portals</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-emerald-300">24/7</p>
                <p className="text-sm text-slate-300 mt-1">Access</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-pink-300">100%</p>
                <p className="text-sm text-slate-300 mt-1">Organized</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-violet-300">Easy</p>
                <p className="text-sm text-slate-300 mt-1">Management</p>
              </div>
            </div>
          </div>

          {/* Hero Card */}
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                <h3 className="text-lg font-semibold text-indigo-300">Admin</h3>
                <p className="text-sm text-slate-300 mt-2">
                  Manage students, announcements, and system activities.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                <h3 className="text-lg font-semibold text-emerald-300">Teacher</h3>
                <p className="text-sm text-slate-300 mt-2">
                  Mark attendance, add marks, and track class records.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                <h3 className="text-lg font-semibold text-pink-300">Student</h3>
                <p className="text-sm text-slate-300 mt-2">
                  View attendance, marks, and school announcements.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 p-5">
                <h3 className="text-lg font-semibold text-violet-300">Parent</h3>
                <p className="text-sm text-slate-300 mt-2">
                  Monitor child performance, marks, and updates.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/20 p-5">
              <h3 className="text-xl font-bold">One Platform. Multiple Roles.</h3>
              <p className="text-slate-300 mt-2">
                Secure login and smooth access for every user in the school.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <p className="uppercase tracking-[0.25em] text-sm text-indigo-300">
            Explore Portals
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Access Your Dashboard
          </h2>
          <p className="text-slate-300 mt-3">
            Login based on your role and access the features designed for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Link
            href="/admin"
            className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:bg-white/15 transition"
          >
            <h3 className="text-2xl font-bold text-indigo-300">Admin Portal</h3>
            <p className="mt-3 text-slate-300">
              Student management, announcements, and administration tools.
            </p>
          </Link>

          <Link
            href="/teacher"
            className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:bg-white/15 transition"
          >
            <h3 className="text-2xl font-bold text-emerald-300">
              Teacher Portal
            </h3>
            <p className="mt-3 text-slate-300">
              Attendance, marks, and classroom academic records.
            </p>
          </Link>

          <Link
            href="/student"
            className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:bg-white/15 transition"
          >
            <h3 className="text-2xl font-bold text-pink-300">Student Portal</h3>
            <p className="mt-3 text-slate-300">
              Check your attendance, marks, and latest school updates.
            </p>
          </Link>

          <Link
            href="/parent"
            className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:bg-white/15 transition"
          >
            <h3 className="text-2xl font-bold text-violet-300">Parent Portal</h3>
            <p className="mt-3 text-slate-300">
              Follow your child’s progress and school announcements.
            </p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 md:p-10 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to get started?
          </h2>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
            Login to your existing account or register as a new user and start
            managing your school activities professionally.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition"
            >
              Go to Login
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 font-medium transition"
            >
              Go to Register
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-400 text-sm">
          © 2026 SMS System · School Management System
        </div>
      </footer>
    </div>
  );
}