"use client";

import { useCourses } from "@/firebase/courses/read";
import React from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";
import MyCourseCard from "./ui/MyCourseCard";

const MyCoursesDisplay = () => {
  const user = useSelector((state) => state?.user);
  const { data, error, isLoading } = useCourses({ uid: user?.uid });
  if (error) {
    return <div className="p-2 text-red-400">{error}</div>;
  }
  if (isLoading) {
    return <Loading />;
  }
  // console.log("data", data);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {data?.length &&
          data?.map((course) => (
            <MyCourseCard key={course?.courseId} courseData={course} />
          ))}
      </div>
    </>
  );
};

export default MyCoursesDisplay;
