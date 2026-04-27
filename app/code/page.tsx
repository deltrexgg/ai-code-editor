"use client";
import { useState } from "react";

export default function DashboardPage() {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <main className="h-screen bg-slate-950 text-white flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="h-14 border-b border-white/10 px-6 flex items-center justify-between shrink-0">
        <h1 className="font-bold text-xl">AICode Studio</h1>

        <button className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-semibold">
          Publish
        </button>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* File Explorer */}
        <aside className="w-64 border-r border-white/10 bg-slate-900 p-4 overflow-y-auto shrink-0">
          <h2 className="font-semibold mb-4">Files</h2>

          <div className="space-y-2 text-sm text-slate-300">
            <p>📁 src</p>
            <p className="ml-4">📄 page.tsx</p>
            <p className="ml-4">📄 layout.tsx</p>

            <p>📁 components</p>
            <p className="ml-4">📄 Navbar.tsx</p>

            <p>📄 styles.css</p>
          </div>
        </aside>

        {/* Editor + Terminal */}
        <section className="flex-1 flex flex-col min-w-0">

          {/* Editor Header */}
          <div className="h-10 border-b border-white/10 px-4 flex items-center text-sm text-slate-300 shrink-0">
            page.tsx
          </div>

          {/* Editor */}
          <div className="flex-1 p-4 bg-slate-950 font-mono text-sm overflow-auto">
            <pre>{`export default function Home() {
  return (
    <div>Hello World</div>
  )
}`}</pre>
          </div>

          {/* Terminal */}
          <div className="h-52 border-t border-white/10 bg-black p-4 font-mono text-sm overflow-auto shrink-0">
            <p className="text-green-400">$ npm run dev</p>
            <p>Starting development server...</p>
            <p className="text-cyan-400">Ready on http://localhost:3000</p>
          </div>
        </section>

        {/* AI Chat Sidebar (always mounted) */}
        <aside
          className={`border-l border-white/10 bg-slate-900 flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
            chatOpen
              ? "w-[500px] opacity-100"
              : "w-0 opacity-0 overflow-hidden border-l-0"
          }`}
        >
          {/* Chat Header */}
          <div className="h-12 px-4 border-b border-white/10 flex items-center justify-between shrink-0">
            <h2 className="font-semibold whitespace-nowrap">AI Assistant</h2>

            <button
              onClick={() => setChatOpen(false)}
              className="text-slate-400 hover:text-white text-lg"
            >
              ✕
            </button>
          </div>

          {/* Embedded Chat App */}
          <div className="flex-1 p-3 min-h-0">
            <iframe
              src="http://192.168.29.200:8080"
              className="w-full h-full rounded-2xl bg-white"
            />
          </div>
        </aside>
      </div>

      {/* Floating Open Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed right-6 top-20 px-4 py-3 rounded-2xl bg-cyan-400 text-slate-950 font-bold shadow-xl hover:scale-105 transition"
        >
          Open AI Chat
        </button>
      )}
    </main>
  );
}