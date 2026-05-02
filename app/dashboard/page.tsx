"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";
import { getUserSession, clearUserSession } from "../lib/session";

type FileItem = {
  name: string;
  description?: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [openModal, setOpenModal] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileItem[]>([]);

  const [projectName, setProjectName] = useState("Untitled Project");
  const [techStack, setTechStack] = useState("Not Provided");
  const [version, setVersion] = useState("1.0.0");
  const [status, setStatus] = useState("Draft");
  const [loadingStep, setLoadingStep] = useState("Initializing AI...");

  useEffect(() => {
    const sessionUser = getUserSession();

    if (!sessionUser) {
      router.push("/");
      return;
    }

    setUser(sessionUser);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    clearUserSession();
    router.push("/");
  };

  const projects = [
    { name: "School Website", stack: "HTML/CSS/JS", updated: "2h ago" },
    { name: "Portfolio App", stack: "Next.js", updated: "Yesterday" },
    { name: "Blog Platform", stack: "Go + React", updated: "3 days ago" },
  ];

  const updateFile = (index: number, value: string) => {
    const updated = [...files];
    updated[index].name = value;
    setFiles(updated);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const addFile = () => {
    setFiles([
      ...files,
      {
        name: "newfile.txt",
        description: "Custom file added manually.",
      },
    ]);
  };

  const generateFiles = async () => {
    try {
      setLoading(true);
      setLoadingStep("Initializing AI...");

      const loadingTexts = [
        "Initializing AI...",
        "Reading your project idea...",
        "Preparing file structure...",
        "Designing folders...",
        "Generating smart files...",
        "Finalizing project...",
      ];

      let index = 0;

      const interval = setInterval(() => {
        index++;
        if (index < loadingTexts.length) {
          setLoadingStep(loadingTexts[index]);
        }
      }, 1200);

      const data = await api("/genfiles", {
        method: "POST",
        body: { content: description },
      });

      clearInterval(interval);

      const raw = data?.choices?.[0]?.message?.content || "";

      const cleaned = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      let extractedFiles = [];

      if (Array.isArray(parsed.files)) {
        extractedFiles = parsed.files.map((item: any) => ({
          name: item?.name || "unknown.txt",
          description: item?.purpose || "No description provided.",
        }));
      } else if (Array.isArray(parsed.project_structure)) {
        extractedFiles = parsed.project_structure.map((item: any) => ({
          name: item?.file_name || "unknown.txt",
          description: item?.description || "No description provided.",
        }));
      } else {
        extractedFiles = [
          { name: "index.html", description: "Starter file" },
        ];
      }

      setFiles(extractedFiles);
      setProjectName(parsed.project_name || "Untitled Project");

      if (typeof parsed.tech_stack === "string") {
        setTechStack(parsed.tech_stack);
      } else {
        setTechStack(JSON.stringify(parsed.tech_stack || {}));
      }

      setVersion(parsed.version || "1.0.0");
      setStatus(parsed.status || "Draft");

      setOpenModal(false);
      setShowFilesModal(true);
    } catch (error) {
      console.error(error);
      alert("Failed to generate files");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold"
        >
          New Project
        </button>
      </header>

      <section className="max-w-7xl mx-auto p-8 grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
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

          <h2 className="mt-4 text-xl font-bold">
            {user?.name || "User"}
          </h2>

          <p className="text-slate-400 text-sm">
            {user?.email}
          </p>

          <p className="text-slate-500 text-sm">
            {user?.designation || "No designation"}
          </p>

          <button
            onClick={handleLogout}
            className="mt-4 w-full p-2 rounded-xl bg-red-500/20 hover:bg-red-500 text-sm"
          >
            Logout
          </button>
        </aside>

        {/* Projects */}
        <div className="md:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold mb-5">My Projects</h2>

          <div className="space-y-4">
            {projects.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-slate-400">
                    {p.stack} • {p.updated}
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

      {/* ✅ Create Project Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-white/10 p-8">

            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Create New Project</h2>
              <button onClick={() => setOpenModal(false)}>✕</button>
            </div>

            <input
              type="text"
              placeholder="Project Name"
              className="w-full p-4 rounded-xl bg-slate-950 border border-white/10"
            />

            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your app idea..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-white/10 resize-none mt-4"
            />

            <button
              onClick={generateFiles}
              disabled={loading}
              className="mt-4 w-full p-3 rounded-xl bg-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-3"
            >
              {loading ? loadingStep : "Generate Project"}
            </button>
          </div>
        </div>
      )}
 {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-white/10 p-8">

            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Create New Project</h2>
              <button onClick={() => setOpenModal(false)}>✕</button>
            </div>

            <input
  type="text"
  placeholder="Project Name"
  className="w-full p-4 rounded-xl bg-slate-950 border border-white/10 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition placeholder:text-slate-500"
/>
            
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your app idea..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-white/10 resize-none"
            />

            <button
  onClick={generateFiles}
  disabled={loading}
  className="mt-4 w-full p-3 rounded-xl bg-cyan-400 text-slate-950 font-bold flex items-center justify-center gap-3"
>
  {loading ? (
    <>
      <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
      <span>{loadingStep}</span>
    </>
  ) : (
    "Generate Project"
  )}
</button>
          </div>
        </div>
      )}

      {showFilesModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-slate-900 border border-white/10 p-8">

            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{projectName}</h2>
                <p className="text-slate-400 text-sm mt-1">{techStack}</p>
                <p className="text-slate-500 text-xs mt-1">
                  Version {version} • {status}
                </p>
              </div>

              <button onClick={() => setShowFilesModal(false)}>✕</button>
            </div>

            <div className="space-y-3 max-h-[430px] overflow-auto">

              {files.map((file, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-slate-950 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div>📄</div>

                    <input
                      value={file.name}
                      onChange={(e) => updateFile(index, e.target.value)}
                      className="flex-1 bg-transparent outline-none font-medium"
                    />

                    <button
                      onClick={() => removeFile(index)}
                      className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500"
                    >
                      ❌
                    </button>
                  </div>

                  <p className="text-sm text-slate-400 mt-2 ml-8">
                    {file.description || "No description available."}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={addFile}
                className="w-full p-3 rounded-xl border border-white/10 hover:bg-white/5"
              >
                + Add File
              </button>

              <button
                onClick={() => (window.location.href = "/code")}
                className="w-full p-3 rounded-xl bg-cyan-400 text-slate-950 font-bold"
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