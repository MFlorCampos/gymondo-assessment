import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.log("Workout not found"); // Debugging
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: data.id,
      name: data.name,
      description: data.description,
      startDate: data.startdate,
      category: data.category,
    });
  } catch (error) {
    console.error("Error fetching workout:", error); // Debugging
    return NextResponse.json(
      { error: "Error retrieving the workout" },
      { status: 500 }
    );
  }
}
