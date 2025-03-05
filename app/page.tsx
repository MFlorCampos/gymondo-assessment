"use client";

import { useState, useEffect, useCallback } from "react";
import FilterBar from "./components/FilterBar/FilterBar";
import WorkoutList from "./components/WorkoutList/WorkoutList";
import Pagination from "./components/Pagination/Pagination";
import { WorkoutFilters, WorkoutResponse, Workout } from "./types";
import { fetchWorkouts } from "./utils/fetchWorkouts";

export default function Home() {
  // Main state management for workouts data and pagination
  // workouts: Array of workout objects from Supabase
  // currentPage: Current page number for pagination
  // totalPages: Total number of available pages
  // totalWorkouts: Total count of workouts in the database
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);

  // UI state management
  // filters: Current active filters for workouts
  // isLoading: Loading state indicator
  // error: Error state management
  const [filters, setFilters] = useState<WorkoutFilters>({ categories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load workouts with current filters and pagination
  const loadWorkouts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response: WorkoutResponse = await fetchWorkouts(
        currentPage,
        filters
      );

      setWorkouts(response.workouts);
      setTotalPages(response.pagination.totalPages);
      setTotalWorkouts(response.pagination.totalWorkouts);
    } catch (err) {
      console.error("Error loading workouts:", err);
      setError("Failed to load workouts. Please try again later.");
      setWorkouts([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, filters]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters: WorkoutFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Handle page changes
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Load workouts on mount and when dependencies change
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workouts</h1>
        <p className="text-gray-600">
          Browse through our collection of workouts and find the perfect one for
          you.
        </p>
      </div>

      {/* Filters */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats */}
      {!isLoading && !error && (
        <div className="text-sm text-gray-500 mb-4">
          Showing {workouts.length} of {totalWorkouts} workouts
          {filters.startDate ||
          (filters.categories && filters.categories.length > 0)
            ? " (filtered)"
            : ""}
        </div>
      )}

      {/* Workout list */}
      <WorkoutList workouts={workouts} isLoading={isLoading} />

      {/* Pagination */}
      {!isLoading && !error && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
