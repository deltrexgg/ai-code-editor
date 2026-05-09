"use client";
import { useEffect, useState } from "react";
import { useAuthRedirectToRoot } from "../lib/auth_middleware";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";


export default function DashboardPage() {

  const router = useRouter();

  useAuthRedirectToRoot()

  const [chatOpen, setChatOpen] = useState(false);
  const [files, setFiles] = useState([])

  const [currentFile, setCurrentFile] = useState("")
  const [fileText, setFileText] = useState("")

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {

    getProjectFiles()
  }, [])

  useEffect(() => {
    
  },[currentFile])

async function getProjectFiles() {

   const projectID = sessionStorage.getItem("projectid");

  if (!projectID) {
    router.push("/dashboard");
    return;
  }

  const rawUser = sessionStorage.getItem("user");

  if (!rawUser) {
    router.push("/dashboard");
    return;
  }

  const user = JSON.parse(rawUser);

  const data = await api(
    `/project/file/get?user_id=${user.id}&project_id=${projectID}`,
    {
      method: "GET",
    }
  );

  setFiles(data.data || [])
  console.log("Files :", data);
}

async function deleteFile(filename:any) {

   if (confirm("Are you sure") == false){ 
    return
  }

  const projectID = sessionStorage.getItem("projectid");

  if (!projectID) {
    router.push("/dashboard");
    return;
  }

  const rawUser = sessionStorage.getItem("user");

  if (!rawUser) {
    router.push("/dashboard");
    return;
  }

  const user = JSON.parse(rawUser);

  await api(
    `/project/file/delete`,
    {
      method: "DELETE",
      body: {
        user_id: user.id,
        project_id: projectID,
        file_name: filename
      }
    }
  );

  getProjectFiles()

}

async function fileData(filename: any){
  console.log("Triggered getfile")

  if (!filename) {
    console.log(currentFile)
    return
  }

  const projectID = sessionStorage.getItem("projectid");

  if (!projectID) {
    router.push("/dashboard");
    return;
  }

  const rawUser = sessionStorage.getItem("user");

  if (!rawUser) {
    router.push("/dashboard");
    return;
  }

  const user = JSON.parse(rawUser);

  const data = await api(
    `/project/file/read?user_id=${user.id}&project_id=${projectID}&file=${filename}`,
    {
      method: "GET",
    }
  );

  setFileText(data.data || "")
  setCurrentFile(filename)
}


async function addFile() {

  const filename = prompt("Enter File Name")

  if (!filename) {
    return
  }

  const projectID = sessionStorage.getItem("projectid");

  if (!projectID) {
    router.push("/dashboard");
    return;
  }

  const rawUser = sessionStorage.getItem("user");

  if (!rawUser) {
    router.push("/dashboard");
    return;
  }

  const user = JSON.parse(rawUser);

  await api(
    `/project/file/add`,
    {
      method: "POST",
      body: {
        user_id: user.id,
        project_id: projectID,
        file_name: filename
      }
    }
  );

  getProjectFiles()

}

const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);

    }, 1500);
  };

async function saveFile() {
  const projectID = sessionStorage.getItem("projectid");

  if (!projectID) {
    router.push("/dashboard");
    return;
  }

  const rawUser = sessionStorage.getItem("user");

  if (!rawUser) {
    router.push("/dashboard");
    return;
  }

  const user = JSON.parse(rawUser);
  await api("/project/file/write", {
    method: "POST",
    body: {
      user_id : user.id,
      project_id: projectID,
      file_name: currentFile,
      content: fileText,
    },
  });

  showToast(`File Saved : ${currentFile}`,"success")
  
}



  return (
    <main className="h-screen bg-slate-950 text-white flex flex-col overflow-hidden">
      {/* 🔔 Toast */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-xl shadow-lg border 
          ${
            toast.type === "success"
              ? "bg-green-500/90 border-green-300"
              : "bg-red-500/90 border-red-300"
          }`}
        >
          {toast.message}
        </div>
      )}
      {/* Header */}
      <header className="h-14 border-b border-white/10 px-6 flex items-center justify-between shrink-0">
        <a href="/dashboard"><h1 className="font-bold text-xl">AI Agent Code Studio</h1></a>

        <button className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-semibold">
          Publish
        </button>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <aside className="w-64 border-r border-white/10 bg-slate-900 p-4 overflow-y-auto shrink-0">
          <h2 className="font-semibold mb-4">Files</h2> 
          <button
  onClick={addFile}
  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-400 text-slate-950 text-xs font-semibold hover:bg-cyan-300 transition"
>
  ➕ Add
</button>

          <div className="space-y-2 text-sm text-slate-300">
  {files.map((p: any) => (
    <div
    key={p}
    onClick={() => fileData(p)}
    className="flex items-center justify-between bg-slate-800/60 border border-white/5 rounded-xl px-4 py-3"
    >
      <p
        title={p}
        className="truncate max-w-[220px] cursor-default"
      >
        📄 {p}
      </p>

      <button
        onClick={() => deleteFile(p)}
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-250/20 hover:bg-red-250 transition shrink-0"
      >
        <img
          src="/delete-icon.png"
          alt="delete"
          className="w-4 h-4"
        />
      </button>
    </div>
  ))}
</div>
        </aside>

        {/* Editor + Terminal */}
        <section className="flex-1 flex flex-col min-w-0">

          {/* Editor Header */}
          <div className="h-10 border-b border-white/10 px-4 flex items-center text-sm text-slate-300 shrink-0">
            {currentFile} 
            <button
  onClick={saveFile}
  className="px-4 text-slate-200 hover:text-white hover:scale-105 transition"
>
  save
</button>
          </div>

          {/* Editor */}
          <div className="flex-1 bg-slate-950 overflow-hidden">
  <textarea
    value={fileText}
    onChange={(e) => setFileText(e.target.value)}
    spellCheck={false}
    className="w-full h-full resize-none bg-slate-950 text-slate-100 p-4 outline-none font-mono text-sm"
  />
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
              ? "w-125 opacity-100"
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
          AI Agent
        </button>
      )}
    </main>
  );
}

function setToast(arg0: null) {
  throw new Error("Function not implemented.");
}
