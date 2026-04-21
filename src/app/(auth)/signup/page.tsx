"use client";

import { register } from "@/app/actions/register";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useActionState } from "react"; // Next.js 15+ uses useActionState, which is the newer version of useFormState

const initialState = {
    error: null as string | null,
};

export default function SignupPage() {
    // Note: useActionState is the standard in React 19 / Next.js 15
    const [state, formAction] = useActionState(register as any, initialState);

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
                        <h2 className="text-3xl font-bold tracking-tight text-white">Create Account</h2>
                        <p className="text-slate-400">Join EduPortal and start managing</p>
                    </div>

                    {state?.error && (
                        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400 text-center animate-shake">
                            {state.error}
                        </div>
                    )}

                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                            <input 
                                name="name" 
                                type="text" 
                                placeholder="John Doe" 
                                required 
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-slate-600 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                            />
                        </div>

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
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <input 
                                name="password" 
                                type="password" 
                                placeholder="••••••••" 
                                required 
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder:text-slate-600 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">I am a...</label>
                            <select 
                                name="role" 
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="STUDENT" className="bg-[#1a1a1a]">Student</option>
                                <option value="TEACHER" className="bg-[#1a1a1a]">Teacher</option>
                                <option value="ADMIN" className="bg-[#1a1a1a]">Admin</option>
                            </select>
                        </div>

                        <SubmitButton />
                    </form>

                    <p className="text-center text-sm text-slate-400">
                        Already have an account? <Link href="/signin" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Sign in here</Link>
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

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button 
            type="submit" 
            disabled={pending}
            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-500 hover:shadow-blue-500/50 active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? "Creating Account..." : "Create Account"}
        </button>
    );
}