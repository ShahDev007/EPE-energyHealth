import { useState } from "react";
// import { Search } from "lucide-react";

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
    <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-sm">
      {/* Search Box */}
      <div className="flex items-center mb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search assets..."
            className="pl-7 pr-3 py-1.5 border rounded-md w-48 text-sm"
            onChange={(e) => onSearch(e.target.value)}
          />
          {/* <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-gray-400" /> */}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-medium mb-1.5">Asset Type</h3>
          <div className="space-y-1.5">
            {["powerPlant", "solarFarm", "windFarm", "substation"].map(
              (type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={(e) => handleTypeChange(type, e.target.checked)}
                    className="mr-1.5 h-3.5 w-3.5"
                  />
                  <span className="text-xs">{type}</span>
                </label>
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium mb-1.5">Status</h3>
          <div className="space-y-1.5">
            {["operational", "maintenance", "offline"].map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={(e) => handleStatusChange(status, e.target.checked)}
                  className="mr-1.5 h-3.5 w-3.5"
                />
                <span className="text-xs">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapControls;
