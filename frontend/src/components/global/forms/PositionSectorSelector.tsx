import React, { useState, useMemo } from "react";
import { Search, X, Check, Building, Landmark, Shield, Sparkles } from "lucide-react";
import {
  ALL_POSITIONS_DATA,
  SECTOR_TABS,
  SectorType,
  PositionItem,
} from "../../../data/positionsAndDepartments";

interface PositionSectorSelectorProps {
  selectedPositions: string[];
  onChange: (positions: string[]) => void;
  required?: boolean;
}

export const PositionSectorSelector: React.FC<PositionSectorSelectorProps> = ({
  selectedPositions,
  onChange,
  required = true,
}) => {
  const [activeSector, setActiveSector] = useState<SectorType>("Private");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPositions = useMemo(() => {
    return ALL_POSITIONS_DATA.filter((item: PositionItem) => {
      const matchesSector =
        activeSector === "All" || item.sector === activeSector;
      const matchesSearch =
        !searchQuery.trim() ||
        item.label.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesSector && matchesSearch;
    });
  }, [activeSector, searchQuery]);

  const handleToggle = (posValue: string) => {
    if (selectedPositions.includes(posValue)) {
      onChange(selectedPositions.filter((p) => p !== posValue));
    } else {
      onChange([...selectedPositions, posValue]);
    }
  };

  const handleRemove = (posValue: string) => {
    onChange(selectedPositions.filter((p) => p !== posValue));
  };

  const getSectorIcon = (sectorId: string) => {
    switch (sectorId) {
      case "Private":
        return <Building className="w-4 h-4" />;
      case "Public":
        return <Landmark className="w-4 h-4" />;
      case "Government / LGU":
        return <Shield className="w-4 h-4" />;
      case "Core":
        return <Sparkles className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
          <span>Position & Role Assignment</span>
          {required && <span className="text-red-500">*</span>}
        </label>
        <span className="text-xs text-gray-500">
          {selectedPositions.length} selected
        </span>
      </div>

      {/* Selected badges chips */}
      {selectedPositions.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 p-2.5 bg-blue-50/60 border border-blue-200/80 rounded-lg min-h-[38px] items-center">
          {selectedPositions.map((pos) => (
            <span
              key={pos}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-blue-300 text-blue-800 text-xs font-medium rounded-md shadow-xs"
            >
              <span>{pos}</span>
              <button
                type="button"
                onClick={() => handleRemove(pos)}
                className="text-blue-500 hover:text-red-600 focus:outline-hidden ml-0.5"
                title="Remove position"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs text-gray-500 hover:text-red-600 underline ml-auto px-1"
          >
            Clear all
          </button>
        </div>
      ) : (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200/70 p-2.5 rounded-lg flex items-center gap-2">
          <span>⚠️ Please select at least one position for this employee below.</span>
        </div>
      )}

      {/* Sector Tabs (Isolated Option) */}
      <div className="flex flex-wrap gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200">
        {SECTOR_TABS.map((tab) => {
          const isActive = activeSector === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSector(tab.id as SectorType)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? "bg-white text-blue-700 shadow-xs border border-gray-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
              }`}
            >
              {getSectorIcon(tab.id)}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input within Sector */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${activeSector} positions...`}
          className="w-full pl-9 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-xs placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Positions Grid */}
      <div className="max-h-56 overflow-y-auto p-2 bg-gray-50 rounded-lg border border-gray-200 space-y-1 divide-y divide-gray-100">
        {filteredPositions.length > 0 ? (
          filteredPositions.map((pos) => {
            const isSelected = selectedPositions.includes(pos.value);
            return (
              <label
                key={pos.value}
                className={`flex items-start gap-2.5 p-2 rounded-md cursor-pointer transition-colors pt-2 first:pt-2 ${
                  isSelected
                    ? "bg-blue-50/80 border border-blue-200"
                    : "hover:bg-white border border-transparent"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggle(pos.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-medium truncate ${isSelected ? "text-blue-900" : "text-gray-800"}`}>
                      {pos.label}
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400 bg-gray-200/70 px-1.5 py-0.5 rounded-sm shrink-0">
                      {pos.sector}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">{pos.category}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
              </label>
            );
          })
        ) : (
          <div className="text-center py-6 text-xs text-gray-500">
            No positions found matching "{searchQuery}" in {activeSector}.
          </div>
        )}
      </div>
    </div>
  );
};
