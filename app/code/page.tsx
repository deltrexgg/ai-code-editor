"use client";
import { useState } from "react";

export default function DashboardPage() {
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <main className="h-screen bg-slate-950 text-white flex flex-col">
      <header className="h-14 border-b border-white/10 px-6 flex items-center justify-between">
        <h1 className="font-bold text-xl">AICode Studio</h1>
        <button className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-semibold">New Project</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-white/10 bg-slate-900 p-4 overflow-y-auto">
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

        <section className="flex-1 flex flex-col">
          <div className="h-10 border-b border-white/10 px-4 flex items-center text-sm text-slate-300">page.tsx</div>
          <div className="flex-1 p-4 bg-slate-950 font-mono text-sm overflow-auto">
            <pre>{`export default function Home(){\n  return (\n    <div>Hello World</div>\n  )\n}`}</pre>
          </div>

          <div className="h-52 border-t border-white/10 bg-black p-4 font-mono text-sm overflow-auto">
            <p className="text-green-400">$ npm run dev</p>
            <p>Starting development server...</p>
            <p className="text-cyan-400">Ready on http://localhost:3000</p>
          </div>
        </section>

        {chatOpen && (
          <aside className="w-96 border-l border-white/10 bg-slate-900 flex flex-col">
            <div className="h-12 px-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-semibold">AI Assistant</h2>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-auto text-sm">
              <div className="bg-white/5 rounded-2xl p-3">How can I help with your project?</div>
              <div className="bg-cyan-500/20 rounded-2xl p-3">Create responsive navbar</div>
              <div className="bg-white/5 rounded-2xl p-3">Navbar code generated successfully.</div>
            </div>

            <div className="p-4 border-t border-white/10">
              <input placeholder="Ask AI anything..." className="w-full p-3 rounded-xl bg-slate-950 border border-white/10" />
            </div>
          </aside>
        )}
      </div>

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed right-6 top-20 px-4 py-3 rounded-2xl bg-cyan-400 text-slate-950 font-bold shadow-xl"
        >
          Open AI Chat
        </button>
      )}
    </main>
  );
}
