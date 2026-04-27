"use client";

import { useState } from "react";
import Image from "next/image";

export default function DashboardPage() {
  const [openModal, setOpenModal] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);

  const [files, setFiles] = useState([
    "index.html",
    "about.html",
    "contact.html",
    "style.css",
    "script.js",
  ]);

  const projects = [
    { name: "School Website", stack: "HTML/CSS/JS", updated: "2h ago" },
    { name: "Portfolio App", stack: "Next.js", updated: "Yesterday" },
    { name: "Blog Platform", stack: "Go + React", updated: "3 days ago" },
  ];

  const updateFile = (index: number, value: string) => {
    const updated = [...files];
    updated[index] = value;
    setFiles(updated);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const addFile = () => {
    setFiles([...files, "newfile.txt"]);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      {/* Header */}
      <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold"
          >
            New Project
          </button>
        </div>
      </header>

      {/* Main */}
      <section className="max-w-7xl mx-auto p-8 grid md:grid-cols-4 gap-8">

        {/* Profile */}
        <aside className="md:col-span-1 rounded-3xl border border-white/10 bg-white/5 p-6 h-fit">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
            <Image
              src="/profile.svg"
              alt="Profile"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
        </div>

          <h2 className="mt-4 text-xl font-bold">Deltrex</h2>
          <p className="text-slate-400">Full Stack Builder</p>

          <div className="mt-6 space-y-2 text-sm text-slate-300">
            <p>Projects: 12</p>
            <p>Deployments: 5</p>
            <p>Member Since: 2026</p>
          </div>
        </aside>

        {/* Projects */}
        <div className="md:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold mb-5">My Projects</h2>

          <div className="space-y-4">
            {projects.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-slate-400">
                    {p.stack} • Updated {p.updated}
                  </p>
                </div>

                <a
                  href="/code"
                  className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold"
                >
                  Open
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal 1 - New Project */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-white/10 p-8">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Create New Project</h2>

              <button
                onClick={() => setOpenModal(false)}
                className="text-slate-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Project Name"
                className="w-full p-3 rounded-xl bg-slate-950 border border-white/10"
              />

              <textarea
                rows={4}
                placeholder="Project Description"
                className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 resize-none"
              />

              <select className="w-full p-3 rounded-xl bg-slate-950 border border-white/10">
                <option>Choose Tech Stack</option>
                <option>HTML / CSS / JS</option>
                <option>Next.js</option>
                <option>React</option>
                <option>Go</option>
              </select>

              <button
                onClick={() => {
                  setOpenModal(false);
                  setShowFilesModal(true);
                }}
                className="w-full p-3 rounded-xl bg-cyan-400 text-slate-950 font-bold"
              >
                Generate Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2 - AI File Structure */}
      {showFilesModal && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    
    <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">AI Generated File Structure</h2>
          <p className="text-slate-400 text-sm mt-1">
            Review, rename, remove or add files before coding.
          </p>
        </div>

        <button
          onClick={() => setShowFilesModal(false)}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-xl"
        >
          ✕
        </button>
      </div>

      {/* File List */}
      <div className="space-y-3 max-h-105 overflow-auto pr-1">

        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-white/10"
          >
            {/* File Icon */}
            <div className="text-xl">📄</div>

            {/* Input */}
            <input
              value={file}
              onChange={(e) => updateFile(index, e.target.value)}
              className="flex-1 bg-transparent outline-none text-white"
            />

            {/* Delete */}
            <button
              onClick={() => removeFile(index)}
              className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500 text-lg"
            >
              ❌
            </button>
          </div>
        ))}

      </div>

      {/* Bottom Actions */}
      <div className="mt-6 space-y-3">

        <button
          onClick={addFile}
          className="w-full p-3 rounded-2xl border border-white/10 hover:bg-white/5 font-medium"
        >
          + Add New File
        </button>

        <button
          onClick={() => window.location.href = "/code"}
          className="w-full p-3 rounded-2xl bg-cyan-400 text-slate-950 font-bold hover:scale-[1.02] transition"
        >
          Start Coding →
        </button>

      </div>
    </div>
  </div>
)}
    </main>
  );
}