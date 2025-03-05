import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();

  it("renders pagination correctly", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByTestId("next-page-button");
    expect(prevButton).toBeInTheDocument();

    const nextButton = screen.getByTestId("previous-page-button");
    expect(nextButton).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onPageChange when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const page3Button = screen.getByText("3");
    fireEvent.click(page3Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("disables previous button on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText("Previous page");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText("Next page");
    expect(nextButton).toBeDisabled();
  });
});
