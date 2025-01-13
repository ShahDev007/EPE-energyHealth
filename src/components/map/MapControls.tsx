// src/components/map/MapControls.tsx
import { useState } from "react";
import { Search } from "lucide-react";

interface MapControlsProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: { types: string[]; statuses: string[] }) => void;
}

const MapControls = ({ onSearch, onFilterChange }: MapControlsProps) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "powerPlant",
    "solarFarm",
    "windFarm",
    "substation",
  ]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "operational",
    "maintenance",
    "offline",
  ]);

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...selectedTypes, type]
      : selectedTypes.filter((t) => t !== type);
    setSelectedTypes(newTypes);
    onFilterChange({ types: newTypes, statuses: selectedStatuses });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...selectedStatuses, status]
      : selectedStatuses.filter((s) => s !== status);
    setSelectedStatuses(newStatuses);
    onFilterChange({ types: selectedTypes, statuses: newStatuses });
  };
  return (
    <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      {/* Search Box */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search assets..."
            className="pl-8 pr-4 py-2 border rounded-md w-64"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Asset Type</h3>
          <div className="space-y-2">
            {["powerPlant", "solarFarm", "windFarm", "substation"].map(
              (type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={(e) => handleTypeChange(type, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">{type}</span>
                </label>
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Status</h3>
          <div className="space-y-2">
            {["operational", "maintenance", "offline"].map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={(e) => handleStatusChange(status, e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapControls;
