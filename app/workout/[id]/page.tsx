"use client";

import { useState, useEffect } from "react";
import { ChevronLeft } from "@geist-ui/icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchWorkoutById } from "../../utils/fetchWorkouts";
import { formatDate } from "../../utils/formatters";
import { Workout } from "../../types";
import Image from "next/image";

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWorkout() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchWorkoutById(id);
        setWorkout(data);
      } catch (err) {
        console.error("Error loading workout:", err);
        setError("Failed to load workout details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        {error || "Workout not found"}
        <div className="mt-4">
          <Link href="/" className="text-red-700 font-medium underline">
            Return to workout list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/" className="text-[#ff7f66] hover:text-[#ff947f]">
          <span className="flex items-center">
            <ChevronLeft size={20} /> Back to all workouts
          </span>
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{workout.name}</h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium  border border-[#ff947f] text-[#ff7f66]">
            {workout.category}
          </span>
        </div>

        <div className="mb-6">
          <p className="text-gray-500">
            <strong>Start Date:</strong> {formatDate(workout.startDate)}
          </p>
        </div>
        <div className="relative w-full h-64 mb-6">
          <Image
            src="/placeholder.svg"
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Description
        </h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-line">
            {workout.description}
          </p>
        </div>
      </div>
    </div>
  );
}
