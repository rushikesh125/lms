"use client";
import React from "react";
import {
  Cloud,
  UserCircle,
  BookOpen,
  TrendingUp,
  DollarSign,
  Globe,
  Blocks,
  Plus,
  Heart,
  GitFork,
  SquareChartGantt,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CourseReviews from "./Review";
import { Avatar, Button } from "@heroui/react";
import CourseButton from "./CourseButton";

const CourseDetailsCard = ({ courseData }) => {
  const { course_id } = useParams();
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="w-full md:w-8/12   p-2 md:p-6 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Course Header with Poster */}
        <div className="relative mb-6">
          <img
            src={courseData.posterURL}
            alt={courseData.courseTitle}
            className="w-full h-48 md:h-64 object-cover rounded-xl filter brightness-75"
          />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
              {courseData.courseTitle}
            </h1>
          </div>
        </div>

        {/* Course Details Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Course Details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-purple-600 mb-3">
                Course Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {courseData.description}
              </p>
            </div>

            {/* Course Metadata */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg">
                <TrendingUp className="text-purple-500" size={24} />
                <div>
                  <p className="text-xs text-gray-500">Level</p>
                  <p className="font-medium text-purple-800">
                    {courseData.level}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg">
                <Blocks className="text-purple-500" size={24} />
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="font-medium text-purple-800">
                    {courseData.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg">
                <Globe className="text-purple-500" size={24} />
                <div>
                  <p className="text-xs text-gray-500">Language</p>
                  <p className="font-medium text-purple-800">
                    {courseData.language}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg">
                <DollarSign className="text-purple-500" size={24} />
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-medium text-purple-800">
                    ${courseData.coursePrice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Instructor */}
          <div className="bg-purple-50 p-6 rounded-xl text-center">
            <div className="flex flex-col items-center">
              <Avatar showFallback  src={courseData.instructurePhotoURL} className="w-24 h-24 border-4 border-purple-400 mb-4 object-cover"/>
              {/* <img
                src={courseData.instructurePhotoURL}
                alt={courseData.instructureName}
                className="w-24 h-24 rounded-full border-4 border-purple-400 mb-4 object-cover"
              /> */}
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                {courseData.instructureName}
              </h3>
              <p className="text-sm text-gray-600 mb-4">Course Instructor</p>
              <p className="text-xs text-gray-500 italic">
                "{courseData.shortDescription}"
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
        <CourseButton instructureUid={courseData.instructureUid} courseId={courseData.courseId} />
        </div>
      </div>
      <div className="flex-1 w-auto p-2 md:p-8 bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="shadow"
              isIconOnly
              className="bg-pink-500 text-white"
            >
              <Heart />
            </Button>
            <span> 3k Likes</span>
          </div>
          <Button
            color="secondary"
            variant="ghost"
            endContent={<GitFork />}
            className="flex items-center "
          >
            180 Forks
          </Button>
        </div>
        <hr className="my-4" />
        {/* <CourseReviews /> */}
        <div>
          {courseData?.courseChapters?.length && (
            <div className="text-purple-500 text-lg font-semibold">
              Chapters
            </div>
          )}
          {courseData?.courseChapters?.length &&
            courseData?.courseChapters.map((chapter, ind) => (
              <div className="p-2 border border-slate-600/[0.20] rounded-md my-1 bg-slate-50 flex items-center gap-2 line-clamp-1" key={ind}>
               <SquareChartGantt size={13} className="text-purple-400"/> {chapter.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
