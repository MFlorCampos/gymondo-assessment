import { render, screen } from "@testing-library/react";
import WorkoutList from "../WorkoutList";
import { Workout } from "../../../types";

describe("WorkoutList", () => {
  const mockWorkouts: Workout[] = [
    {
      id: 1,
      name: "Workout 1",
      description: "Description 1",
      startDate: "",
      category: "c1",
    },
    {
      id: 2,
      name: "Workout 2",
      description: "Description 2",
      startDate: "",
      category: "c2",
    },
  ];

  it("displays loading skeleton when isLoading is true", () => {
    render(<WorkoutList workouts={[]} isLoading={true} />);

    const skeletons = screen.getAllByTestId("status");
    expect(skeletons.length).toBe(6);
    skeletons.forEach((skeleton) => {
      expect(skeleton).toHaveClass("animate-pulse");
      expect(skeleton).toHaveClass("bg-gray-200");
    });
  });

  it("displays no workouts found message when workouts array is empty", () => {
    render(<WorkoutList workouts={[]} isLoading={false} />);

    expect(
      screen.getByText(/No workouts found matching your criteria/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your filters/i)).toBeInTheDocument();
  });

  it("displays workout cards when workouts are available", () => {
    render(<WorkoutList workouts={mockWorkouts} isLoading={false} />);

    const workoutCards = screen.getAllByTestId("article");
    expect(workoutCards.length).toBe(mockWorkouts.length);

    mockWorkouts.forEach((workout, index) => {
      expect(workoutCards[index]).toHaveTextContent(workout.name);
    });
  });
});
