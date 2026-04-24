export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-bold">Create Account</h1>

        <div className="mt-6 space-y-4">
          <input
            placeholder="Full Name"
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <input
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-slate-900 border border-white/10"
          />

          <button className="w-full p-3 rounded-xl bg-white text-slate-950 font-bold">
            Register
          </button>
        </div>
      </div>
    </main>
  );
}