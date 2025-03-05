import { render, screen } from "@testing-library/react";
import WorkoutCard from "../WorkoutCard";

const mockWorkout = {
  id: 1,
  name: "Test Workout",
  description: "Test Description",
  startDate: "",
  category: "c1",
};

describe("WorkoutCard", () => {
  it("renders workout information correctly", () => {
    render(<WorkoutCard workout={mockWorkout} />);

    expect(screen.getByText("Test Workout")).toBeInTheDocument();
    expect(screen.getByText("c1")).toBeInTheDocument();
  });
});
