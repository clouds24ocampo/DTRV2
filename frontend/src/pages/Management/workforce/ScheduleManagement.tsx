/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays, CalendarRange, Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDepartmentStore } from "../../../stores/workforce/department/department.store";
import EmployeesPanel, {
  EmployeeLite,
} from "../../../components/workforce/dtr/EmployeesPanel";
import BreakdownEditModal from "../../../components/workforce/schedule/BreakdownEditModal";
import ScheduleDetails from "../../../components/workforce/schedule/ScheduleDetails";
import SessionEditModal from "../../../components/workforce/schedule/SessionEditModal";
import MasterScheduleTimeline from "../../../components/workforce/schedule/MasterScheduleTimeline";
import { useScheduleStore } from "../../../stores/global/schedule/schedule.store";
import { useUserStore } from "../../../stores/workforce/user/user.store";
import { DepartmentDoc } from "../../../types/workforce/department/department.type";
import { ISession } from "../../../types/global/schedule/schedule.type";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "../../../utils/global/pageMotion";
import Chatbot from "../../../components/common/ChatBot";
import PageHeader from "../../../components/ui/PageHeader";

export default function ScheduleManagement() {
  const { user, otherUsers, fetchOtherUsers } = useUserStore();
  const {
    schedules,
    allSchedules,
    fetchAllSchedules,
    fetchAllLoading,
    editSingleSession,
    fetchSchedulesFiltered,
    fetchFilteredLoading,
  } = useScheduleStore();

  const { departments, fetchAllDepartments } = useDepartmentStore();

  const [activeTab, setActiveTab] = useState<"timeline" | "daily">("timeline");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [showSessionEdit, setShowSessionEdit] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState<{
    scheduleId: string;
    session: ISession & { _id?: string };
  } | null>(null);

  const [showBreakdownEdit, setShowBreakdownEdit] = useState(false);
  const [breakdownToEdit, setBreakdownToEdit] = useState<{
    scheduleId: string;
    session: ISession & {
      _id?: string;
      fullSched?: {
        type: "work" | "break" | "meal";
        start: string;
        end: string;
      }[];
    };
    index: number;
  } | null>(null);

  useEffect(() => {
    fetchOtherUsers();
    fetchAllDepartments();
    fetchAllSchedules().catch((err) => console.error("Error loading all schedules:", err));
  }, [fetchOtherUsers, fetchAllDepartments, fetchAllSchedules]);

  const employeesToShow = useMemo(() => {
    const list = [...(otherUsers ?? [])].filter((u) => !u.archived);
    if (user && !list.some((u) => u._id === user._id)) list.unshift(user);
    return list;
  }, [user, otherUsers]);

  type DepartmentLite = {
    _id: string;
    name: string;
    head: string | null;
    members: string[];
  };
  const safeDepartments: DepartmentLite[] = useMemo(() => {
    const raw: any = departments as any;
    const list: DepartmentDoc[] = Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.departments)
        ? raw.departments
        : Array.isArray(raw?.items)
          ? raw.items
          : [];
    return list.map((d) => ({
      _id: String(d._id),
      name: String(d.name),
      head: d.head ? String(d.head) : null,
      members: Array.isArray(d.members) ? d.members.map(String) : [],
    }));
  }, [departments]);

  const employeeLites = useMemo<EmployeeLite[]>(
    () =>
      (employeesToShow || []).map((e: any) => ({
        _id: e._id,
        firstName: e.firstName,
        lastName: e.lastName,
        position: e.position,
      })),
    [employeesToShow]
  );

  useEffect(() => {
    if (!selectedEmployee && employeesToShow.length > 0) {
      setSelectedEmployee(employeesToShow[0]._id);
    }
  }, [employeesToShow, selectedEmployee]);

  const selectedEmp = useMemo(
    () => employeesToShow.find((emp) => emp._id === selectedEmployee),
    [employeesToShow, selectedEmployee]
  );

  useEffect(() => {
    if (selectedEmployee && selectedDate) {
      fetchSchedulesFiltered({
        userId: selectedEmployee,
        date: selectedDate,
      }).catch((err) => console.error("Error fetching schedules:", err));
    }
  }, [selectedEmployee, selectedDate, fetchSchedulesFiltered]);

  const handleOpenBreakdownEdit = (
    scheduleId: string,
    session: ISession & { _id?: string },
    index: number
  ) => {
    setBreakdownToEdit({ scheduleId, session, index });
    setShowBreakdownEdit(true);
  };

  const handleSaveBreakdownPatch = async (patch: Partial<ISession>) => {
    if (!breakdownToEdit?.session?._id) return;
    await editSingleSession(
      breakdownToEdit.scheduleId,
      breakdownToEdit.session._id,
      patch,
      `Edited breakdown #${breakdownToEdit.index + 1} from Schedule UI`
    );
    setShowBreakdownEdit(false);
  };

  const handleOpenSessionEdit = (
    scheduleId: string,
    session: ISession & { _id?: string }
  ) => {
    setSessionToEdit({ scheduleId, session });
    setShowSessionEdit(true);
  };

  const handleSaveSingleSession = async (patch: Partial<ISession>) => {
    if (!sessionToEdit?.session?._id) return;
    await editSingleSession(
      sessionToEdit.scheduleId,
      sessionToEdit.session._id,
      patch,
      "Edited from Schedule UI"
    );
    setShowSessionEdit(false);
  };

  const handleSelectEmployeeAndDateFromTimeline = (userId: string, dateStr: string) => {
    setSelectedEmployee(userId);
    setSelectedDate(dateStr);
    setActiveTab("daily");
  };

  return (
    <motion.div
      className="w-full space-y-4 sm:space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page header */}
      <motion.div variants={itemVariants}>
        <PageHeader
          icon={CalendarDays}
          eyebrow="Workforce"
          title="Schedule Management"
          subtitle="View previous, present, and future work schedules across all personnel"
        />
      </motion.div>

      {/* View Switcher Tabs */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
        <div className="inline-flex rounded-xl bg-muted/60 p-1 border border-border/40 shadow-inner">
          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "timeline"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <CalendarRange className="h-4 w-4" />
            <span>All Personnel Timeline (Past, Present & Future)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("daily")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === "daily"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Clock3 className="h-4 w-4" />
            <span>Single-Day Inspector</span>
          </button>
        </div>

        <div className="text-xs text-muted-foreground hidden sm:block">
          {activeTab === "timeline"
            ? "Comprehensive chronological schedule roster"
            : `Inspecting ${selectedEmp ? `${selectedEmp.firstName} ${selectedEmp.lastName}` : "Personnel"} for ${selectedDate}`}
        </div>
      </motion.div>

      {/* Main content based on activeTab */}
      {activeTab === "timeline" ? (
        <motion.div variants={itemVariants}>
          <MasterScheduleTimeline
            schedules={allSchedules.length > 0 ? allSchedules : schedules}
            employees={employeesToShow}
            departments={safeDepartments}
            loading={fetchAllLoading}
            onSelectEmployeeAndDate={handleSelectEmployeeAndDateFromTimeline}
            onRefresh={fetchAllSchedules}
          />
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col lg:flex-row gap-4 sm:gap-6 min-h-0"
          variants={itemVariants}
        >
          {/* Left Panel */}
          <motion.div className="w-full lg:w-1/4 lg:min-w-[280px] lg:max-w-[320px]" variants={itemVariants}>
            <EmployeesPanel
              employees={employeeLites}
              selectedEmployee={selectedEmployee ?? ""}
              onSelect={(id) => setSelectedEmployee(id)}
              departments={safeDepartments}
            />
          </motion.div>

          {/* Right Panel */}
          <motion.div className="flex-1 min-w-0 overflow-hidden" variants={itemVariants}>
            <ScheduleDetails
              selectedEmployee={selectedEmployee}
              selectedEmp={selectedEmp}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              schedules={schedules as any}
              loading={fetchFilteredLoading}
              onOpenSessionEdit={handleOpenSessionEdit}
              onOpenBreakdownEdit={handleOpenBreakdownEdit}
              canEdit
            />
          </motion.div>
        </motion.div>
      )}

      {/* Modals */}
      {showSessionEdit && sessionToEdit && (
        <SessionEditModal
          scheduleId={sessionToEdit.scheduleId}
          session={sessionToEdit.session}
          onClose={() => setShowSessionEdit(false)}
          onSave={handleSaveSingleSession}
        />
      )}

      {showBreakdownEdit && breakdownToEdit && (
        <BreakdownEditModal
          isOpen={showBreakdownEdit}
          scheduleId={breakdownToEdit.scheduleId}
          session={breakdownToEdit.session}
          breakdownIndex={breakdownToEdit.index}
          onClose={() => setShowBreakdownEdit(false)}
          onSave={handleSaveBreakdownPatch}
        />
      )}
      <Chatbot />
    </motion.div>
  );
}
