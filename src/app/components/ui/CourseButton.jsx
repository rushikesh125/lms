"use client";
import { Edit} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const CourseButton = ({ instructureUid, courseId }) => {
  const user = useSelector((state) => state?.user);
  if (user?.uid == instructureUid) {
    return (
      <Link href={`/my-courses/update-course?id=${courseId}`} className="w-full flex gap-2 items-center justify-center mt-1 bg-black text-white px-2 py-1 rounded-md">
        <Edit />
        <p>Edit</p>
      </Link>
    );
  }
  return (
    <button className="w-full mt-1 px-2 py-1 rounded-md bg-purple-600 text-white">
      Enroll Now
    </button>
  );
};

export default CourseButton;
