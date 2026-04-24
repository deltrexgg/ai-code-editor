export default function DashboardPage(){
  const projects = [
    {name:'School Website', stack:'HTML/CSS/JS', updated:'2h ago'},
    {name:'Portfolio App', stack:'Next.js', updated:'Yesterday'},
    {name:'Blog Platform', stack:'Go + React', updated:'3 days ago'},
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold">New Project</button>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">D</div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto p-8 grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 rounded-3xl border border-white/10 bg-white/5 p-6 h-fit">
          <div className="w-16 h-16 rounded-full bg-cyan-400 text-slate-950 font-bold flex items-center justify-center text-2xl">D</div>
          <h2 className="mt-4 text-xl font-bold">Deltrex</h2>
          <p className="text-slate-400">Full Stack Builder</p>
          <div className="mt-6 space-y-2 text-sm text-slate-300">
            <p>Projects: 12</p>
            <p>Deployments: 5</p>
            <p>Member Since: 2026</p>
          </div>
        </aside>

        <div className="md:col-span-3 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-slate-400 text-sm">Total Projects</p>
              <h3 className="text-3xl font-bold mt-2">12</h3>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-slate-400 text-sm">AI Generations</p>
              <h3 className="text-3xl font-bold mt-2">48</h3>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-slate-400 text-sm">Deployments</p>
              <h3 className="text-3xl font-bold mt-2">5</h3>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold mb-5">My Projects</h2>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.name} className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-slate-400">{p.stack} • Updated {p.updated}</p>
                  </div>
                  <a href="/code" className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold">Open</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
