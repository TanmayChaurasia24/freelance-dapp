import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface FilterSidebarProps {
  locations: string[];
  companies: string[];
  jobTypes: string[];
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  locations: string[];
  companies: string[];
  jobTypes: string[];
}

export function FilterSidebar({
  locations,
  companies,
  jobTypes,
  onFilterChange,
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    locations: [],
    companies: [],
    jobTypes: [],
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFilterChange = (category: keyof FilterState, item: string) => {
    setFilters((prevFilters: any) => {
      const updatedCategory = prevFilters[category].includes(item)
        ? prevFilters[category].filter((i: string) => i !== item)
        : [...prevFilters[category], item];
      return { ...prevFilters, [category]: updatedCategory };
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({ ...prevFilters, search: e.target.value }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="space-y-6 p-4 md:p-7 bg-background md:fixed md:w-[300px] lg:w-[20vw] flex flex-col justify-center md:top-10 md:m-8 transition-all duration-300 ease-in-out">
      <div className="md:hidden flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isSidebarOpen ? "transform rotate-180" : ""
            }`}
          />
        </Button>
      </div>
      <div className={`space-y-6 ${isSidebarOpen ? "block" : "hidden md:block"}`}>
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search jobs..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Location</h3>
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={filters.locations.includes(location)}
                onChange={() => handleFilterChange("locations", location)}
              />
              <Label htmlFor={`location-${location}`}>{location}</Label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Company</h3>
          {companies.map((company) => (
            <div key={company} className="flex items-center space-x-2">
              <Checkbox
                id={`company-${company}`}
                checked={filters.companies.includes(company)}
                onChange={() => handleFilterChange("companies", company)}
              />
              <Label htmlFor={`company-${company}`}>{company}</Label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Job Type</h3>
          {jobTypes.map((jobType) => (
            <div key={jobType} className="flex items-center space-x-2">
              <Checkbox
                id={`jobType-${jobType}`}
                checked={filters.jobTypes.includes(jobType)}
                onChange={() => handleFilterChange("jobTypes", jobType)}
              />
              <Label htmlFor={`jobType-${jobType}`}>{jobType}</Label>
            </div>
          ))}
        </div>
        <Button
          onClick={applyFilters}
          className="w-full md:static fixed bottom-4 left-4 right-4 md:w-auto"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
