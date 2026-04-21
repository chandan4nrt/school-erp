import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();

  // If already logged in, redirect them to their dashboard immediately
  if (session?.user?.role) {
    redirect(`/${session.user.role.toLowerCase()}`);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>


      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-32">
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Platform Status: Live
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1]">
            Manage school <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Smarter.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed font-medium">
            The next-generation unified platform for Admins, Teachers, and Students. 
            Streamline operations, track growth, and collaborate in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-2xl font-bold hover:bg-slate-200 transition-all shadow-xl shadow-white/10 active:scale-95"
            >
              Start Free Trial
            </Link>
            <Link
              href="/signin"
              className="w-full sm:w-auto px-10 py-4 border border-white/10 bg-white/5 rounded-2xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-40">
          <FeatureCard
            title="Administrators"
            desc="Unmatched oversight. Manage staff, analytics, and infrastructure with precision tools."
            icon={<ShieldIcon />}
          />
          <FeatureCard
            title="Educators"
            desc="Focus on teaching. Automated grading, attendance, and lesson planning at your fingertips."
            icon={<UserIcon />}
          />
          <FeatureCard
            title="Learners"
            desc="Your future, visualized. Access resources and track your academic journey seamlessly."
            icon={<BookIcon />}
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="group p-8 border border-white/5 rounded-3xl bg-white/5 hover:bg-white/[0.08] hover:border-blue-500/30 transition-all duration-500">
      <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm font-medium line-clamp-3">{desc}</p>
    </div>
  );
}

function ShieldIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52.02C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
}

function UserIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}

function BookIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
}