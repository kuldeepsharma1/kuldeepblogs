import Image from "next/image";
import type { Course } from "@/types/learning";

const courseArt: Record<string, string> = {
  "css-architecture": "/images/courses/css-architecture.svg",
  "linux-fundamentals": "/images/courses/linux-fundamentals.svg",
  "react-fundamentals": "/images/courses/react-fundamentals.svg",
  "typescript-mastery": "/images/courses/typescript-mastery.svg",
};

export function CourseArtwork({
  course,
  className = "",
  priority = false,
}: {
  course: Pick<Course, "slug" | "title" | "cover" | "imageAlt">;
  className?: string;
  priority?: boolean;
}) {
  const src = getCourseArtworkSrc(course);

  return (
    <div className={`relative isolate overflow-hidden bg-muted ${className}`}>
      <Image
        src={src}
        alt={course.imageAlt || `${course.title} course artwork`}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}

export function getCourseArtworkSrc(
  course: Pick<Course, "slug" | "cover">,
) {
  const cover = course.cover;
  if (
    cover?.startsWith("/") ||
    cover?.startsWith("https://images.unsplash.com/")
  ) {
    return cover;
  }

  return courseArt[course.slug] || "/images/courses/linux-fundamentals.svg";
}
