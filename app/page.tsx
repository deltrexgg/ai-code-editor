import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-tight">AICode Studio</h1>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold hover:opacity-90 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left */}
        <div>
          <p className="inline-block px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-sm mb-5">
            AI Powered Project Builder
          </p>

          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Build Apps From Ideas, Not Boilerplate.
          </h2>

          <p className="mt-6 text-slate-300 text-lg leading-8">
            Describe your app idea, choose a tech stack, and generate a ready-to-edit project instantly.
            Code with AI assistance, live preview, and smart file management.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-2xl bg-cyan-400 text-slate-950 font-bold hover:opacity-90 transition"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition"
            >
              Login Now
            </Link>
          </div>
        </div>

        {/* Right Preview */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-2xl">
          <div className="rounded-2xl bg-slate-950 p-4 font-mono text-sm space-y-2">
            <p className="text-cyan-300">
              &gt; Build a school website using HTML CSS JS
            </p>

            <p className="text-slate-400">Generating structure...</p>

            <p>📁 pages</p>
            <p> ┣ 📄 index.html</p>
            <p> ┣ 📄 about.html</p>
            <p> ┗ 📄 contact.html</p>
            <p>📄 style.css</p>
            <p>📄 script.js</p>

            <p className="text-emerald-300">✓ Ready to edit</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 pb-20 grid md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-3xl border border-white/10 bg-white/5">
          <h3 className="font-bold text-xl">AI Project Generator</h3>
          <p className="mt-3 text-slate-300">
            Create folders, pages and starter code instantly.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/5">
          <h3 className="font-bold text-xl">Smart Code Assistant</h3>
          <p className="mt-3 text-slate-300">
            Ask questions about your existing codebase.
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/5">
          <h3 className="font-bold text-xl">Run & Preview</h3>
          <p className="mt-3 text-slate-300">
            Launch projects with one click preview.
          </p>
        </div>

      </section>
    </main>
  );
}