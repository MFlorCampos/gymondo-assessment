import { Workout } from "../../types";
import WorkoutCard from "../WorkoutCard/WorkoutCard";

/**
 * Component that displays a grid of workout cards with loading states
 * Handles empty states and loading skeletons
 */
interface WorkoutListProps {
  workouts: Workout[];
  isLoading?: boolean;
}

export default function WorkoutList({
  workouts,
  isLoading = false,
}: WorkoutListProps) {
  // Display loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 h-48 rounded-lg"
            data-testid="status"
          ></div>
        ))}
      </div>
    );
  }

  // Display message when no workouts match the current filters
  if (workouts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-500">
          No workouts found matching your criteria
        </p>
        <p className="mt-2 text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
