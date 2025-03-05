import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Pagination parameters
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 20;

  // Filter parameters
  const startDateFilter = searchParams.get("startDate");
  const categoryFilter = searchParams.get("category")?.split(",");

  // Prepare query to Supabase
  let query = supabase
    .from("workouts")
    .select("*", { count: "exact" })
    .range((page - 1) * pageSize, page * pageSize - 1);

  // Apply startDate filter (month matching)
  if (startDateFilter) {
    const filterDate = new Date(startDateFilter);
    const startOfMonth = new Date(
      filterDate.getFullYear(),
      filterDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      filterDate.getFullYear(),
      filterDate.getMonth() + 1,
      0
    );
    query = query
      .gte("startdate", startOfMonth.toISOString())
      .lte("startdate", endOfMonth.toISOString());
  }

  // Apply category filter
  if (categoryFilter && categoryFilter.length > 0) {
    query = query.in("category", categoryFilter);
  }

  const { data: workouts, error, count } = await query;

  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los workouts" },
      { status: 500 }
    );
  }

  const totalWorkouts = count || 0;
  const totalPages = Math.ceil(totalWorkouts / pageSize);

  return NextResponse.json({
    workouts:
      workouts?.map((workout) => ({
        id: workout.id,
        name: workout.name,
        category: workout.category,
        startDate: workout.startdate,
        description: workout.description.substring(0, 100) + "...",
      })) || [],
    pagination: {
      page,
      pageSize,
      totalWorkouts,
      totalPages,
    },
  });
}

export async function HEAD() {
  return NextResponse.json({ status: "ok" });
}
