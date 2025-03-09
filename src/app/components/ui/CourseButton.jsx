"use client";
import { useEnrolledCourse } from "@/firebase/enrollcourse/read";
import { enrollToCourse } from "@/firebase/enrollcourse/write";
import { Button } from "@heroui/react";
import { Edit, Play } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CourseButton = ({ courseId,instructureUid }) => {
  const user = useSelector((state) => state?.user);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useEnrolledCourse({
    uid: user?.uid,
    courseId: courseId,
  });
  const handleEnrollNow = async () => {
    if (!user) {
      toast.error("Please Login First");
      return;
    }
    try {
      setIsLoading(true);
      await enrollToCourse({ courseId: courseId, uid: user.uid });
      toast.success("Enrolled to course");
    } catch (error) {
      console.log(error);
      toast.error("Error in Enrolling to Course");
    } finally {
      setIsLoading(false);
    }
  };
  if (user?.uid == instructureUid) {
    return (
      <Link
        href={`/my-courses/update-course?id=${courseId}`}
        className="w-full flex gap-2 items-center justify-center mt-1 bg-black text-white px-2 py-1 rounded-md"
      >
        <Edit />
        <p>Edit</p>
      </Link>
    );
  }
  if (data) {
    return <Link
      href={`/enrolled-courses/${courseId}`}
      className="w-full flex gap-2 items-center justify-center mt-1 bg-black text-white px-2 py-1 rounded-md"
    >
      <Play />
      <p>Learn</p>
    </Link>;
  }
  return (
    <Button
      className="w-full mt-1 px-2 py-1 rounded-md bg-purple-600 text-white"
      onPress={handleEnrollNow}
    >
      Enroll Now
    </Button>
  );
};

export default CourseButton;
