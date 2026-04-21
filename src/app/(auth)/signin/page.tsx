import { signIn } from "@/lib/auth";
import Link from "next/link";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa"; // I will assume they might want icons, but for now I'll use standard elements if I can't guarantee icons

export default function SigninPage() {
    return (
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
            <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur transition duration-1000 group-hover:opacity-40" />

                <div className="relative flex flex-col space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="text-center space-y-2">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/50">
                            <span className="text-2xl text-white font-bold">E</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h2>
                        <p className="text-slate-400">Sign in to continue to EduPortal</p>
                    </div>

                    {/* Google Sign In */}
                    <form action={async () => {
                        "use server";
                        await signIn("google");
                    }}>
                        <button type="submit" className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 font-medium text-white transition-all hover:bg-white/10 active:scale-[0.98]">
                            <img src="https://authjs.dev/img/providers/google.svg" width="20" height="20" alt="Google" className="transition-transform group-hover:scale-110" />
                            Continue with Google
                        </button>
                    </form>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="mx-4 text-xs font-medium uppercase tracking-widest text-slate-500">or use email</span>
                        <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    {/* Credentials Sign In */}
                    <form action={async (formData) => {
                        "use server";
                        await signIn("credentials", formData);
                    }} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                            <input 
                                name="email" 
                                type="email" 
                                placeholder="name@example.com" 
                                required 
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-slate-600 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-medium text-slate-300">Password</label>
                                <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot?</a>
                            </div>
                            <input 
                                name="password" 
                                type="password" 
                                placeholder="••••••••" 
                                required 
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-slate-600 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                            />
                        </div>

                        <button type="submit" className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/50 active:scale-[0.98] mt-2">
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-400">
                        Don't have an account? <Link href="/signup" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Create one free</Link>
                    </p>
                </div>
            </div>

            <Link href="/" className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back to Home
            </Link>
        </div>
    );
}