import { auth } from "@/lib/auth";

export default async function TeacherDashboard() {
    const session = await auth();

    return (
        <div className="p-8 space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Teacher's Desk</h1>
                    <p className="text-slate-500">Managing Class 10-A | Mathematics</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700">
                    Mark Attendance
                </button>
            </header>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Class Roster */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700">Student Roster</div>
                    <div className="divide-y divide-slate-100">
                        {["Rahul Kumar", "Anjali Singh", "Vikram Das", "Sita Murmu"].map((name) => (
                            <div key={name} className="p-4 flex justify-between items-center hover:bg-blue-50/30 transition-colors">
                                <span className="font-medium text-slate-800">{name}</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 text-xs bg-white border border-slate-200 rounded hover:border-blue-400 text-black">View Grades</button>
                                    <button className="px-3 py-1 text-xs bg-white border border-slate-200 rounded hover:border-red-400 text-black">Add Remark</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lesson Planner */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="font-bold text-slate-800 mb-4">Today's Lessons</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
                                <div className="font-bold text-amber-600">09:00</div>
                                <div>
                                    <p className="font-bold text-amber-900">Algebra Basics</p>
                                    <p className="text-sm text-amber-700">Topic: Linear Equations</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-xl bg-purple-50 border border-purple-100">
                                <div className="font-bold text-purple-600">11:30</div>
                                <div>
                                    <p className="font-bold text-purple-900">Geometry Prep</p>
                                    <p className="text-sm text-purple-700">Topic: Pythogoras Theorem</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}