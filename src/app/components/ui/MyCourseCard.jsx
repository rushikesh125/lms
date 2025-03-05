import { deleteCourse } from "@/firebase/courses/delete";
import { Button } from "@heroui/react";
import { Edit2, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const MyCourseCard = ({ courseData }) => {
  const { courseTitle, posterURL, courseId } = courseData;
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteCourse = async () => {
    if (confirm("are you sure ? you want to delete course ?")) {
      setIsLoading(true);
      try {
        await deleteCourse({ id: courseId });
        toast.success("Deleted Successfully");
      } catch (error) {
        toast.error("Error Deleting Course");
      } finally {
        setIsLoading(false);
      }
    } else {
      return;
    }
  };
  return (
    <div className="border border-slate-500/[0.20]  rounded-lg shadow-sm hover:shadow">
      <div>
        <img
          src={posterURL}
          alt="course-banner"
          className="h-48 md:h-40 rounded-t-lg object-cover w-full"
        />
      </div>
      <div className="px-2 py-1">
        <h2 className="font-semibold">{courseTitle}</h2>
        <h3 className="text-xs text-gray-500">5 Students Enrolled</h3>
        <div className="flex gap-1 items-center justify-end">
          <Link
            href={`/my-courses/${courseId}`}
            className="px-3 py-1 rounded-lg text-purple-600 hover:bg-purple-200 flex items-center gap-1"
          >
            <Eye size={13} />
            View
          </Link>
          <Link href={`/my-courses/update-course?id=${courseId}`}>
            <Button
              isIconOnly
              className="bg-transparent hover:bg-purple-200 text-purple-500"
            >
              <Edit2 size={13} />
            </Button>
          </Link>
          <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onPress={handleDeleteCourse}
            isIconOnly
            className="bg-transparent hover:bg-red-100 text-red-500"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
