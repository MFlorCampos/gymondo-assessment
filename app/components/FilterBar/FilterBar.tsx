import { useState, useEffect } from "react";

// Available workout categories for filtering
// TODO: These should ideally come from an API or configuration
const categories = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];

// Utility function to generate a list of the next 12 months
// Returns an array of objects with value (YYYY-MM) and label (Month Year)
function generateMonthOptions() {
  const options = [];
  const today = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(today.getMonth() + i);

    const value = date.toISOString().substring(0, 7);
    const label = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    options.push({ value, label });
  }

  return options;
}

interface FilterBarProps {
  onFilterChange: (filters: {
    startDate?: string;
    categories: string[];
  }) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const monthOptions = generateMonthOptions();

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({
      startDate: selectedMonth,
      categories: selectedCategories,
    });
  }, [selectedMonth, selectedCategories, onFilterChange]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedMonth("");
    setSelectedCategories([]);
  };

  return (
    <div className="border border-[#ff947f] p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Month filter */}
        <div className="flex-1">
          <label
            htmlFor="month"
            className="block text-sm font-medium text-[#ff7f66] mb-1"
          >
            Start Date
          </label>
          <select
            id="month"
            className="w-full rounded-md border border-[#ff947f] py-2 px-3"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div className="flex-1">
          <fieldset>
            <legend className="block text-sm font-medium text-[#ff7f66] mb-1">
              Categories
            </legend>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer
                    ${
                      selectedCategories.includes(category)
                        ? "bg-[#ff7f66] text-white"
                        : "border border-[#ff947f] text-[#ff7f66]"
                    }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Reset button */}
        <div className="self-end">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm bg-[#ff7f66] text-white hover:bg-[#ff947f] rounded-md"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
