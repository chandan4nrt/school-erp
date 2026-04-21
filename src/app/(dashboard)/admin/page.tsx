import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
    const session = await auth();

    return (
        <div className="p-8 space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Admin Command Center</h1>
                <p className="text-slate-500 text-lg">System-wide overview and institutional controls.</p>
            </header>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AdminStat icon="💰" title="Total Revenue" value="₹4.2L" detail="+12% this month" />
                <AdminStat icon="👥" title="Total Staff" value="48" detail="3 on leave" />
                <AdminStat icon="🎓" title="Active Students" value="1,240" detail="24 new admissions" />
                <AdminStat icon="⚠️" title="Pending Actions" value="14" detail="Requires approval" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Joint Transaction Report Preview */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Joint Transaction Report</h2>
                        <button className="text-blue-600 font-semibold text-sm hover:underline">Download PDF</button>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 text-sm border-b border-slate-100">
                                <th className="pb-3 font-medium">Date</th>
                                <th className="pb-3 font-medium">Category</th>
                                <th className="pb-3 font-medium">Status</th>
                                <th className="pb-3 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700">
                            <TransactionRow date="Apr 20, 2026" cat="Tuition Fees" status="Completed" amt="₹85,000" />
                            <TransactionRow date="Apr 19, 2026" cat="Lab Equipment" status="Pending" amt="₹12,400" />
                            <TransactionRow date="Apr 18, 2026" cat="Staff Payroll" status="Processing" amt="₹2,10,000" />
                        </tbody>
                    </table>
                </div>

                {/* Quick Access Sidebar */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl">
                    <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-left px-4 transition-all">Add New Teacher</button>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-left px-4 transition-all">Manage Credentials</button>
                        <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all">Generate Yearly Audit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdminStat({ icon, title, value, detail }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">{icon}</div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            <p className="text-xs text-emerald-600 mt-1 font-semibold">{detail}</p>
        </div>
    );
}

function TransactionRow({ date, cat, status, amt }: any) {
    return (
        <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
            <td className="py-4 text-sm">{date}</td>
            <td className="py-4 text-sm font-medium">{cat}</td>
            <td className="py-4 text-xs font-bold uppercase tracking-wider text-slate-400">{status}</td>
            <td className="py-4 text-right font-bold">{amt}</td>
        </tr>
    );
}