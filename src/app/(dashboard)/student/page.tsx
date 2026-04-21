import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
    const session = await auth();

    // Guard clause (Backup for the proxy)
    if (!session || session.user.role !== "STUDENT") {
        redirect("/signin");
    }

    // You can fetch specific student data here using the session ID
    const student = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Welcome back, {student?.name || "Student"}! 🎓
                    </h1>
                    <p className="text-slate-500">Here is what is happening with your studies today.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    Active Term: Spring 2026
                </div>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Attendance" value="94%" color="bg-emerald-500" />
                <StatCard title="Current GPA" value="3.8" color="bg-blue-500" />
                <StatCard title="Assignments" value="4 Pending" color="bg-amber-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content: Schedule */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-semibold text-slate-800">Today's Schedule</h2>
                        <button className="text-sm text-blue-600 hover:underline">View Calendar</button>
                    </div>
                    <div className="p-0">
                        <ScheduleItem subject="Mathematics" time="09:00 AM" room="Room 302" />
                        <ScheduleItem subject="Physics Lab" time="11:30 AM" room="Lab B" />
                        <ScheduleItem subject="English Literature" time="02:00 PM" room="Online" />
                    </div>
                </div>

                {/* Sidebar Content: Notifications */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                    <h2 className="font-semibold text-slate-800 mb-4">Notice Board</h2>
                    <div className="space-y-4">
                        <div className="text-sm p-3 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                            <p className="font-medium text-slate-900">Exam Schedule Released</p>
                            <p className="text-slate-500 text-xs">Final exams start May 15th.</p>
                        </div>
                        <div className="text-sm p-3 bg-slate-50 rounded-lg border-l-4 border-amber-500">
                            <p className="font-medium text-slate-900">Library Book Overdue</p>
                            <p className="text-slate-500 text-xs">Return "Clean Code" by tomorrow.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">{title}</p>
            <div className="flex items-center gap-3 mt-2">
                <div className={`h-2 w-2 rounded-full ${color}`} />
                <span className="text-2xl font-bold text-slate-900">{value}</span>
            </div>
        </div>
    );
}

function ScheduleItem({ subject, time, room }: { subject: string; time: string; room: string }) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
            <div className="flex gap-4 items-center">
                <div className="w-12 text-xs font-bold text-slate-400">{time}</div>
                <div>
                    <p className="font-semibold text-slate-800">{subject}</p>
                    <p className="text-xs text-slate-500">{room}</p>
                </div>
            </div>
            <button className="px-3 py-1 text-xs text-black border border-slate-200 rounded-md hover:bg-white transition-all">
                Details
            </button>
        </div>
    );
}