import React, { useState, useMemo } from "react";
import {
  Calendar,
  Search,
  CalendarDays,
  ArrowRight,
  MapPin,
  CheckCircle2,
  CalendarClock,
  History,
  RotateCcw,
} from "lucide-react";
import { IScheduleDoc } from "../../../types/global/schedule/schedule.type";
import { formatTime } from "../../../utils/global/timeDateFormat";

interface MasterScheduleTimelineProps {
  schedules: IScheduleDoc[];
  employees: any[];
  departments: any[];
  loading: boolean;
  onSelectEmployeeAndDate: (employeeId: string, date: string) => void;
  onRefresh: () => void;
}

type PeriodFilter = "all" | "past" | "today" | "future";

export const MasterScheduleTimeline: React.FC<MasterScheduleTimelineProps> = ({
  schedules,
  employees,
  departments,
  loading,
  onSelectEmployeeAndDate,
  onRefresh,
}) => {
  const [period, setPeriod] = useState<PeriodFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState("all");
  const [selectedUserId, setSelectedUserId] = useState("all");
  const [customDate, setCustomDate] = useState("");

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const employeeMap = useMemo(() => {
    const map = new Map<string, any>();
    employees.forEach((emp) => {
      if (emp?._id) map.set(String(emp._id), emp);
      if (emp?.idNumber) map.set(String(emp.idNumber), emp);
    });
    return map;
  }, [employees]);

  const departmentMap = useMemo(() => {
    const map = new Map<string, any>();
    departments.forEach((d) => {
      if (d?._id) map.set(String(d._id), d);
      if (d?.name) map.set(String(d.name).toLowerCase(), d);
    });
    return map;
  }, [departments]);

  // Enriched schedule records
  const enrichedSchedules = useMemo(() => {
    return (schedules || []).map((sched: any) => {
      const emp = employeeMap.get(String(sched.userId)) || null;
      let deptName = sched.teamName || "";
      let headName = "Not Assigned";

      if (emp?.department) {
        if (typeof emp.department === "object") {
          deptName = emp.department.name || deptName;
          if (emp.department.head) {
            headName =
              typeof emp.department.head === "object"
                ? `${emp.department.head.firstName ?? ""} ${emp.department.head.lastName ?? ""}`.trim()
                : String(emp.department.head);
          }
        } else {
          const foundDept = departmentMap.get(String(emp.department));
          if (foundDept) {
            deptName = foundDept.name;
            if (foundDept.headUser) {
              headName = `${foundDept.headUser.firstName ?? ""} ${foundDept.headUser.lastName ?? ""}`.trim();
            }
          }
        }
      }

      const scheduleDate = String(sched.date || "").slice(0, 10);
      let timelineStatus: "past" | "today" | "future" = "today";
      if (scheduleDate < todayStr) timelineStatus = "past";
      else if (scheduleDate > todayStr) timelineStatus = "future";

      return {
        ...sched,
        scheduleDate,
        timelineStatus,
        employee: emp,
        departmentName: deptName || "General Operations",
        departmentHead: headName,
      };
    });
  }, [schedules, employeeMap, departmentMap, todayStr]);

  // Statistics
  const stats = useMemo(() => {
    const total = enrichedSchedules.length;
    const pastCount = enrichedSchedules.filter((s) => s.timelineStatus === "past").length;
    const todayCount = enrichedSchedules.filter((s) => s.timelineStatus === "today").length;
    const futureCount = enrichedSchedules.filter((s) => s.timelineStatus === "future").length;
    const uniquePersonnel = new Set(enrichedSchedules.map((s) => s.userId)).size;

    return { total, pastCount, todayCount, futureCount, uniquePersonnel };
  }, [enrichedSchedules]);

  // Filtered list
  const filteredList = useMemo(() => {
    return enrichedSchedules.filter((item) => {
      // Period filter
      if (period !== "all" && item.timelineStatus !== period) {
        return false;
      }

      // Custom date filter if provided
      if (customDate && item.scheduleDate !== customDate) {
        return false;
      }

      // Employee filter
      if (selectedUserId !== "all" && String(item.userId) !== selectedUserId) {
        return false;
      }

      // Department filter
      if (selectedDeptId !== "all") {
        const empDept = item.employee?.department;
        const empDeptId = typeof empDept === "object" ? String(empDept._id) : String(empDept || "");
        if (empDeptId !== selectedDeptId && item.departmentName !== selectedDeptId) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const empName = item.employee
          ? `${item.employee.firstName || ""} ${item.employee.lastName || ""}`.toLowerCase()
          : "";
        const idNum = (item.employee?.idNumber || "").toLowerCase();
        const dept = item.departmentName.toLowerCase();
        const sessionsStr = (item.sessions || [])
          .map((s: any) => `${s.label || ""} ${s.scheduledStartTime || ""} ${s.scheduledEndTime || ""}`)
          .join(" ")
          .toLowerCase();

        return (
          empName.includes(q) ||
          idNum.includes(q) ||
          dept.includes(q) ||
          item.scheduleDate.includes(q) ||
          sessionsStr.includes(q)
        );
      }

      return true;
    });
  }, [enrichedSchedules, period, customDate, selectedUserId, selectedDeptId, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setPeriod("all")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            period === "all"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-800 border-slate-200 hover:border-blue-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-90">All Schedules</span>
            <CalendarDays className="w-4 h-4 opacity-75" />
          </div>
          <div className="text-2xl font-bold mt-1.5">{stats.total}</div>
          <span className="text-[11px] opacity-80">{stats.uniquePersonnel} Personnel</span>
        </div>

        <div
          onClick={() => setPeriod("past")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            period === "past"
              ? "bg-slate-700 text-white border-slate-700 shadow-md"
              : "bg-white text-slate-800 border-slate-200 hover:border-slate-400"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-90">Previous / Past</span>
            <History className="w-4 h-4 opacity-75" />
          </div>
          <div className="text-2xl font-bold mt-1.5">{stats.pastCount}</div>
          <span className="text-[11px] opacity-80">Historical Records</span>
        </div>

        <div
          onClick={() => setPeriod("today")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            period === "today"
              ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
              : "bg-white text-slate-800 border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-90">Present / Today</span>
            <CheckCircle2 className="w-4 h-4 opacity-75" />
          </div>
          <div className="text-2xl font-bold mt-1.5">{stats.todayCount}</div>
          <span className="text-[11px] opacity-80">{todayStr}</span>
        </div>

        <div
          onClick={() => setPeriod("future")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            period === "future"
              ? "bg-purple-600 text-white border-purple-600 shadow-md"
              : "bg-white text-slate-800 border-slate-200 hover:border-purple-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-90">Future / Upcoming</span>
            <CalendarClock className="w-4 h-4 opacity-75" />
          </div>
          <div className="text-2xl font-bold mt-1.5">{stats.futureCount}</div>
          <span className="text-[11px] opacity-80">Upcoming Shifts</span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Period Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setPeriod("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                period === "all"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Records
            </button>
            <button
              type="button"
              onClick={() => setPeriod("past")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                period === "past"
                  ? "bg-white text-slate-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Previous / Past
            </button>
            <button
              type="button"
              onClick={() => setPeriod("today")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                period === "today"
                  ? "bg-white text-emerald-700 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Present (Today)
            </button>
            <button
              type="button"
              onClick={() => setPeriod("future")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                period === "future"
                  ? "bg-white text-purple-700 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Future / Upcoming
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 flex items-center gap-1.5 text-xs font-medium"
              title="Refresh all schedules"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Dropdowns & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search personnel, shift, ID..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Personnel ({employees.length})</option>
              {employees.map((emp) => (
                <option key={String(emp._id)} value={String(emp._id)}>
                  {emp.firstName} {emp.lastName} ({emp.idNumber || "No ID"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Departments ({departments.length})</option>
              {departments.map((d) => (
                <option key={String(d._id)} value={String(d._id)}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500"
              title="Filter by exact date"
            />
            {customDate && (
              <button
                type="button"
                onClick={() => setCustomDate("")}
                className="px-2 py-1.5 text-xs text-slate-500 hover:text-red-600 bg-slate-100 rounded-lg"
                title="Clear date"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Schedules Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Found {filteredList.length} Schedule Records</span>
          <span className="text-[11px] text-slate-500 font-normal">
            Click "Inspect / Edit" on any row to open full session details
          </span>
        </div>

        {filteredList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/40 text-slate-500 font-medium">
                  <th className="py-2.5 px-4">Period & Date</th>
                  <th className="py-2.5 px-4">Personnel</th>
                  <th className="py-2.5 px-4">Department & Head</th>
                  <th className="py-2.5 px-4">Shift Sessions</th>
                  <th className="py-2.5 px-4">Workstation</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map((sched: any) => {
                  const emp = sched.employee;
                  const fullName = emp
                    ? `${emp.firstName || ""} ${emp.lastName || ""}`.trim() || emp.username
                    : `User ${sched.userId.slice(-6)}`;
                  const idNumber = emp?.idNumber || "—";
                  const primaryPosition = Array.isArray(emp?.position)
                    ? emp.position[0]
                    : emp?.position || "Employee";

                  return (
                    <tr
                      key={String(sched._id || `${sched.userId}-${sched.date}`)}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => onSelectEmployeeAndDate(sched.userId, sched.scheduleDate)}
                    >
                      {/* Period & Date */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {sched.timelineStatus === "today" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Today
                            </span>
                          ) : sched.timelineStatus === "future" ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                              Future
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              Past
                            </span>
                          )}
                          <span className="font-semibold text-slate-800 font-mono">
                            {sched.scheduleDate}
                          </span>
                        </div>
                      </td>

                      {/* Personnel */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                            {fullName.charAt(0) || "U"}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{fullName}</p>
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <span className="font-mono text-slate-600">{idNumber}</span>
                              <span>•</span>
                              <span className="truncate max-w-[130px]">{primaryPosition}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Department & Head */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5 max-w-[200px]">
                          <p className="font-medium text-slate-800 truncate" title={sched.departmentName}>
                            {sched.departmentName}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate" title={`Head: ${sched.departmentHead}`}>
                            Head: <span className="text-slate-700 font-medium">{sched.departmentHead}</span>
                          </p>
                        </div>
                      </td>

                      {/* Shift Sessions */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          {(sched.sessions || []).map((session: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-[11px]">
                              <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 font-medium rounded border border-blue-200 shrink-0">
                                {session.label || "Shift"}
                              </span>
                              <span className="font-mono font-medium text-slate-800">
                                {formatTime(session.scheduledStartTime)} - {formatTime(session.scheduledEndTime)}
                              </span>
                              {session.workCredits && (
                                <span className="text-slate-400 text-[10px]">
                                  ({session.workCredits} hrs)
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Workstation */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[130px]">
                            {sched.workstationId ? `Station ${sched.workstationId.slice(-4)}` : "Unassigned"}
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectEmployeeAndDate(sched.userId, sched.scheduleDate);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center space-y-2">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-medium text-slate-700">No schedules found</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No previous, present, or future schedule records match the selected filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setPeriod("all");
                setSearchQuery("");
                setSelectedDeptId("all");
                setSelectedUserId("all");
                setCustomDate("");
              }}
              className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasterScheduleTimeline;
