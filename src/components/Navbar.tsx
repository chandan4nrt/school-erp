import Link from "next/link";
import { auth } from "@/lib/auth";
import { handleLogout } from "@/app/actions/auth-actions";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="sticky top-0 z-[100] w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-xl font-bold text-white">E</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-300">
                        EduPortal
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    {session ? (
                        <>
                            {/* Links visible only when signed in */}
                            <Link
                                href={`/${session.user.role?.toLowerCase()}`}
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                Dashboard
                            </Link>

                            <div className="flex items-center gap-6 border-l border-white/10 pl-8">
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-bold text-white">{session.user.name}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">
                                        {session.user.role}
                                    </span>
                                </div>

                                {/* Logout Button */}
                                <form action={handleLogout}>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 text-sm font-bold text-red-400 bg-red-400/5 border border-red-400/20 rounded-xl hover:bg-red-400/10 hover:text-red-300 transition-all active:scale-95"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Links visible when signed out */}
                            <Link
                                href="/signin"
                                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/signup"
                                className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}