import { getAllCourses } from "@/firebase/courses/read.server";
import React from "react";
import CourseCard from "./ui/CourseCard";

const CoursesGridView = async () => {
  const courses = await getAllCourses();

  const formattedCourses = courses.map((course) => ({
    ...course,
    createdAt: course.createdAt?.seconds
      ? new Date(course.createdAt.seconds * 1000).toISOString()
      : null, // Convert Firestore Timestamp to a string
  }));

  return (
    <>
      <section className="flex flex-col gap-4 md:p-10">
        <h1 className="text-center text-2xl font-semibold text-purple-500">
          Explore All Courses
        </h1>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
          {formattedCourses.length > 0 ? (
            formattedCourses.map((course) => (
              <CourseCard {...course} key={course.courseId} />
            ))
          ) : (
            <div className="text-red-400 font-xl font-semibold text-center my-2 w-full">
              There Must be Error OR No Course available
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CoursesGridView;
