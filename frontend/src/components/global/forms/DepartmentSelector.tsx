import React, { useEffect, useMemo } from "react";
import { Building2, User, MapPin } from "lucide-react";
import { useDepartmentStore } from "../../../stores/workforce/department/department.store";
import { useUserStore } from "../../../stores/workforce/user/user.store";
import { DepartmentDoc } from "../../../types/workforce/department/department.type";

interface DepartmentSelectorProps {
  value?: string;
  onChange: (departmentId: string) => void;
  required?: boolean;
}

export const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({
  value = "",
  onChange,
  required = false,
}) => {
  const { departments, fetchAllDepartments, fetchAllLoading } = useDepartmentStore();
  const { otherUsers, user: currentUser, fetchOtherUsers } = useUserStore();

  useEffect(() => {
    fetchAllDepartments();
    fetchOtherUsers();
  }, [fetchAllDepartments, fetchOtherUsers]);

  const allUsers = useMemo(() => {
    const list = [...(otherUsers ?? [])];
    if (currentUser && !list.some((u) => u._id === currentUser._id)) {
      list.push(currentUser);
    }
    return list;
  }, [otherUsers, currentUser]);

  const usersMap = useMemo(() => {
    const map = new Map<string, any>();
    allUsers.forEach((u) => {
      if (u?._id) map.set(String(u._id), u);
    });
    return map;
  }, [allUsers]);

  const departmentList: DepartmentDoc[] = useMemo(() => {
    const raw: any = departments as any;
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.departments)) return raw.departments;
    if (Array.isArray(raw?.items)) return raw.items;
    return [];
  }, [departments]);

  const selectedDept = useMemo(() => {
    if (!value) return null;
    return departmentList.find((d) => String(d._id) === String(value)) || null;
  }, [value, departmentList]);

  const getHeadName = (dept: DepartmentDoc | null): string => {
    if (!dept) return "None";
    if (dept.headUser && (dept.headUser.firstName || dept.headUser.lastName)) {
      return `${dept.headUser.firstName} ${dept.headUser.lastName}`.trim();
    }
    if (dept.head) {
      const u = usersMap.get(String(dept.head));
      if (u) {
        return `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || "Assigned Head";
      }
      return "Head Assigned";
    }
    return "Not Assigned";
  };

  // Group departments by sector / type
  const groupedDepartments = useMemo(() => {
    const groups: Record<string, DepartmentDoc[]> = {};
    departmentList.forEach((d) => {
      const type = d.type || "General";
      if (!groups[type]) groups[type] = [];
      groups[type].push(d);
    });
    return groups;
  }, [departmentList]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Department & Organization Unit</span>
          {required && <span className="text-red-500">*</span>}
        </label>
        {fetchAllLoading && (
          <span className="text-[11px] text-gray-400">Loading departments...</span>
        )}
      </div>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-colors"
        >
          <option value="">-- Select Department --</option>
          {Object.entries(groupedDepartments).map(([groupName, depts]) => (
            <optgroup key={groupName} label={`${groupName} Sector`}>
              {depts.map((d) => {
                const headStr = getHeadName(d);
                return (
                  <option key={String(d._id)} value={String(d._id)}>
                    {d.name} (Head: {headStr})
                  </option>
                );
              })}
            </optgroup>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Selected Department Card Details */}
      {selectedDept && (
        <div className="p-3 bg-blue-50/70 border border-blue-200/90 rounded-lg text-xs space-y-1.5 animate-fadeIn">
          <div className="flex items-center justify-between font-semibold text-blue-900">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              {selectedDept.name}
            </span>
            <span className="text-[10px] bg-blue-200/70 text-blue-800 px-2 py-0.5 rounded-full font-medium">
              {selectedDept.type || "General"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 pt-1 border-t border-blue-200/60">
            <div className="flex items-center gap-1.5 text-gray-700">
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>
                <strong>Department Head:</strong>{" "}
                <span className="text-gray-900 font-medium">
                  {getHeadName(selectedDept)}
                </span>
              </span>
            </div>

            {selectedDept.location && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  <strong>Location:</strong> {selectedDept.location}
                </span>
              </div>
            )}
          </div>

          {selectedDept.description && (
            <p className="text-[11px] text-gray-500 italic line-clamp-1 pt-0.5">
              "{selectedDept.description}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};
