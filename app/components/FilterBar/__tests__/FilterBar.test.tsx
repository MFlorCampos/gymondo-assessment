import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../FilterBar";

describe("FilterBar", () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter options", () => {
    render(<FilterBar onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();

    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
    expect(screen.getByText(/c1/i)).toBeInTheDocument();
    expect(screen.getByText(/c2/i)).toBeInTheDocument();
    expect(screen.getByText(/c3/i)).toBeInTheDocument();
    expect(screen.getByText(/c4/i)).toBeInTheDocument();
    expect(screen.getByText(/c5/i)).toBeInTheDocument();
    expect(screen.getByText(/c6/i)).toBeInTheDocument();
    expect(screen.getByText(/c7/i)).toBeInTheDocument();
  });

  it("calls onFilterChange when filters are changed", () => {
    render(<FilterBar onFilterChange={mockOnFilterChange} />);

    const monthSelect = screen.getByLabelText(/Start Date/i);
    fireEvent.change(monthSelect, { target: { value: "2025-03" } });

    const categoryCheckboxC1 = screen.getByLabelText(/c1/i);
    fireEvent.click(categoryCheckboxC1);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      startDate: "2025-03",
      categories: ["c1"],
    });
  });

  it("calls onFilterChange with multiple categories selected", () => {
    render(<FilterBar onFilterChange={mockOnFilterChange} />);

    const monthSelect = screen.getByLabelText(/Start Date/i);
    fireEvent.change(monthSelect, { target: { value: "2025-05" } });

    const categoryCheckboxC1 = screen.getByLabelText(/c1/i);
    const categoryCheckboxC3 = screen.getByLabelText(/c3/i);
    fireEvent.click(categoryCheckboxC1);
    fireEvent.click(categoryCheckboxC3);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      startDate: "2025-05",
      categories: ["c1", "c3"],
    });
  });

  it("resets filters when reset button is clicked", () => {
    render(<FilterBar onFilterChange={mockOnFilterChange} />);

    const monthSelect = screen.getByLabelText(/Start Date/i);
    fireEvent.change(monthSelect, { target: { value: "2025-04" } });

    const categoryCheckboxC2 = screen.getByLabelText(/c2/i);
    fireEvent.click(categoryCheckboxC2);

    expect(monthSelect.value).toBe("2025-04");
    expect(categoryCheckboxC2).toBeChecked();

    const resetButton = screen.getByText(/Reset Filters/i);
    fireEvent.click(resetButton);

    expect(monthSelect.value).toBe("");
    expect(categoryCheckboxC2).not.toBeChecked();
  });
});
