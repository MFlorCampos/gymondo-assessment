export interface Workout {
  id: number;
  name: string;
  description: string;
  startDate: string;
  category: string;
}

export interface PaginationData {
  page: number;
  pageSize: number;
  totalWorkouts: number;
  totalPages: number;
}

export interface WorkoutResponse {
  workouts: Workout[];
  pagination: PaginationData;
}

export interface WorkoutFilters {
  startDate?: string;
  categories: string[];
}