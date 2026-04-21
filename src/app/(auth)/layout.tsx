// src/app/(auth)/signup/layout.tsx

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a]">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
            
            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                {children}
            </div>
        </main>
    );
}