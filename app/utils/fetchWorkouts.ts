import { WorkoutResponse, WorkoutFilters, Workout } from "../types";

/**
 * Fetches workouts from Supabase database with pagination and filtering support
 * @param page - Current page number (1-based)
 * @param filters - Object containing filter criteria (startDate, categories)
 * @returns Promise<WorkoutResponse> containing workouts array and pagination info
 */
export async function fetchWorkouts(
  page: number = 1,
  filters?: WorkoutFilters
): Promise<WorkoutResponse> {
  // Build query parameters
  const params = new URLSearchParams();

  // Add page number
  params.append("page", page.toString());

  // Add filters if provided
  if (filters) {
    if (filters.startDate) {
      params.append("startDate", filters.startDate);
    }

    if (filters.categories && filters.categories.length > 0) {
      params.append("category", filters.categories.join(","));
    }
  }

  // Fetch workouts from API
  const response = await fetch(`/api/workouts?${params.toString()}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching workouts: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetches a single workout by ID
 */
export async function fetchWorkoutById(id: string): Promise<Workout> {
  const response = await fetch(`/api/workouts/${id}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching workout: ${response.status}`);
  }

  return response.json();
}
