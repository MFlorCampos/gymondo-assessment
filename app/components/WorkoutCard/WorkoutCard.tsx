"use client";

import Link from "next/link";
import Image from "next/image";
import { Workout } from "../../types";
import { formatDate } from "../../utils/formatters";
import { useState, useEffect } from "react";
import ChevronRight from "@geist-ui/icons/chevronRight";

interface WorkoutCardProps {
  workout: Workout;
}

const images = ["/image-1.webp", "/image-2.webp", "/image-3.webp"];
const colors = ["#FFB3A7", "#A7D8FF", "#FFB3E6"];
const borderColors = [
  "rgb(103, 124, 199)",
  "rgb(217, 153, 132)",
  "rgb(79, 184, 173)",
];

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const [overlayColor, setOverlayColor] = useState<string>("rgba(0,0,0,0.3)");
  const [borderColor, setBorderColor] = useState<string>("rgb(103, 124, 199)");

  useEffect(() => {
    setOverlayColor(colors[Math.floor(Math.random() * colors.length)]);
    setBorderColor(
      borderColors[Math.floor(Math.random() * borderColors.length)]
    );
  }, []);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block relative shadow-sm hover:shadow-md transition-all rounded-lg overflow-hidden group"
      data-testid="article"
      style={{ borderBottom: `5px solid ${borderColor}` }}
    >
      <div className="relative h-64">
        <Image
          src={images[Math.floor(Math.random() * images.length)]}
          alt={workout.name}
          fill
          className="object-cover transition-all"
        />
        <div
          className="absolute inset-0 transition-all duration-300 group-hover:opacity-0"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            backgroundColor: overlayColor,
          }}
        />

        <div className="p-4 relative z-10 h-full flex flex-col text-white">
          <div className="absolute top-0 right-0 m-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border text-white bg-[#ff7f66] border-[#ff7f66]">
              {workout.category}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-xl font-bold text-white mb-10 text-center px-4">
              {workout.name}
            </h3>
            <p className="text-sm text-white/90 mb-3">
              {formatDate(workout.startDate)}
            </p>
          </div>

          <div className="absolute bottom-4 right-4 text-sm text-white transition-colors hover:text-[#ff7f66]">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
