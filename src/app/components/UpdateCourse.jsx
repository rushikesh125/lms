"use client";

import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { updateCourse } from "@/firebase/courses/write";
import { getCourse } from "@/firebase/courses/read.server";
import AddChapter from "./AddChapter";
import EditChapters from "./EditChapters";
import { BrainCircuit } from "lucide-react";
import { generateCourse } from "@/models/generateCourse";

const UpdateCourse = () => {
  const user = useSelector((state) => state.user);
  const [courseChapters, setCourseChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  const [data, setData] = useState({
    courseTitle: "",
    shortDescription: "",
    category: "",
    level: "",
    language: "",
    coursePrice: "",
    description: "",
    posterURL: "",
  });

  // Categories, levels, and languages arrays (consistent with CreateCourse)
  const categoriesList = [
    "Development",
    "Business",
    "IT & Software",
    "Design",
    "Marketing",
    "Personal Development",
    "Photography & Video",
    "Health & Fitness",
    "Music",
    "Teaching & Academics",
    "Lifestyle",
    "Finance & Accounting",
    "Office Productivity",
    "Language Learning",
    "Data Science",
    "Cloud Computing",
    "Cybersecurity",
    "Graphic Design",
    "Web Development",
    "Mobile Development",
    "Game Development",
    "Digital Marketing",
    "Entrepreneurship",
    "Leadership",
    "Project Management",
  ];

  const courseLang = [
    "English",
    "Spanish",
    "French",
    "German",
    "Hindi",
    "Other",
  ];
  const courseLevel = ["Beginner", "Intermediate", "Advanced"];

  // Fetch course data
  const fetchCourse = async () => {
    if (!courseId) return;

    setIsLoading(true);
    try {
      const course = await getCourse({ id: courseId });
      console.log(course)
      if (course) {
        setData({
          courseTitle: course.courseTitle || "",
          shortDescription: course.shortDescription || "",
          category: course.category || "",
          level: course.level || "",
          language: course.language || "",
          coursePrice: course.coursePrice || "",
          description: course.description || "",
          posterURL: course.posterURL || "",
          courseId:courseId
        });
        setCourseChapters(course.courseChapters || []);
      } else {
        throw new Error("Course does not exist");
      }
    } catch (error) {
      toast.error(`Error fetching course: ${error?.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !data?.courseTitle ||
      !data?.shortDescription ||
      !data?.category ||
      !data?.level ||
      !data?.language ||
      !data?.coursePrice ||
      !data?.description ||
      !data?.posterURL
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await updateCourse({
        data: data,
        courseId: courseId,
        courseChapters: courseChapters,
        instructureUid: user?.uid,
        instructureName: user?.displayName,
        instructurePhotoURL: user?.photoURL,
        instructureEmail: user?.email,
      });
      toast.success(`Course updated successfully (ID: ${courseId})`);
      router.push("/my-courses");
    } catch (error) {
      toast.error(error?.message || "Failed to update course");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch course data on component mount or when courseId changes
  useEffect(() => {
    if (courseId) {
      fetchCourse();
    } else {
      toast.error("No course ID provided");
      router.push("/my-courses");
    }
  }, [courseId]);
  const handleGenerateWithAi = async () => {
    setIsLoading(true);
    try {
      const response = await generateCourse(data, aiPrompt);
      const resData = JSON.parse(await response);
      console.log(resData);
      if (resData.course_analysis) {
        const {
          courseTitle,
          shortDescription,
          category,
          level,
          language,
          coursePrice,
          description,
          chapters,
        } = resData.course_analysis;

        setData((prevData) => {
          return {
            ...prevData,
            courseTitle: courseTitle,
            shortDescription: shortDescription,
            category: category,
            level: level,
            language: language,
            coursePrice: coursePrice,
            description: description,
          };
        });
        setCourseChapters(chapters);
        toast.success("Course Generated ");
      }
    } catch (error) {
      toast.error("Error Generating course with Ai");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-md mx-auto md:w-11/12 lg:w-10/12 w-full my-2 py-2 px-2 md:p-6 lg:px-10">
        <div className="w-full flex justify-between items-center">
          <div className="text-xl text-purple-400">Update Course</div>
          <Button
            color="secondary"
            variant="shadow"
            onPress={handleSubmit}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Update
          </Button>
        </div>
        <hr className="my-4" />

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm block mb-1" htmlFor="courseTitle">
              Course Title
            </label>
            <input
              required
              type="text"
              name="courseTitle"
              id="courseTitle"
              placeholder="Course Title"
              value={data.courseTitle}
              onChange={handleInputChange}
              className="p-2 outline-none border border-purple-300 rounded-md w-full"
            />
          </div>

          {data?.posterURL && (
            <div>
              <img
                src={data?.posterURL}
                alt="Poster"
                className="w-40"
                onError={() => toast.error("Invalid poster URL")}
              />
            </div>
          )}
          <div>
            <label className="text-sm block mb-1" htmlFor="posterURL">
              Poster Image URL
            </label>
            <input
              required
              type="text"
              name="posterURL"
              id="posterURL"
              onChange={handleInputChange}
              value={data?.posterURL}
              placeholder="Poster image URL"
              className="p-2 outline-none border border-purple-300 rounded-md w-full"
            />
          </div>

          <div>
            <label className="text-sm block mb-1" htmlFor="shortDescription">
              Short Description
            </label>
            <input
              required
              type="text"
              id="shortDescription"
              name="shortDescription"
              placeholder="Enter Short Description"
              value={data.shortDescription}
              onChange={handleInputChange}
              className="p-2 outline-none border border-purple-300 rounded-md w-full"
            />
          </div>

          <div className="md:flex gap-4 justify-evenly">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm" htmlFor="selectCategory">
                Select Category
              </label>
              <select
                required
                name="category"
                id="selectCategory"
                value={data.category}
                onChange={handleInputChange}
                className="border border-purple-300 rounded-md w-full p-2"
              >
                <option value="">Select Course Category</option>
                {categoriesList.map((cat, ind) => (
                  <option value={cat} key={ind}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm" htmlFor="selectLevel">
                Select Level
              </label>
              <select
                required
                name="level"
                id="selectLevel"
                value={data.level}
                onChange={handleInputChange}
                className="border border-purple-300 rounded-md w-full p-2"
              >
                <option value="">Select Course Level</option>
                {courseLevel.map((level, ind) => (
                  <option value={level} key={ind}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm" htmlFor="selectLang">
                Select Language
              </label>
              <select
                required
                name="language"
                id="selectLang"
                value={data.language}
                onChange={handleInputChange}
                className="border border-purple-300 rounded-md w-full p-2"
              >
                <option value="">Select Course Language</option>
                {courseLang.map((lang, ind) => (
                  <option value={lang} key={ind}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm block mb-1" htmlFor="coursePrice">
              Course Price
            </label>
            <input
              required
              value={data?.coursePrice}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (Number(value) >= 0 && !isNaN(value))) {
                  handleInputChange(e);
                }
              }}
              type="number"
              id="coursePrice"
              name="coursePrice"
              placeholder="Enter price"
              className="p-2 border border-purple-300 rounded-md w-full outline-none"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-900"
            >
              Course Description
            </label>
            <textarea
              required
              id="description"
              rows="6"
              name="description"
              value={data?.description}
              onChange={handleInputChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-purple-300 outline-none"
              placeholder="Write your Course Description here..."
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-purple-500"
            >
              🔮 Generate With Ai
            </label>
            <textarea
              id="aiPrompt"
              rows="2"
              name="aiPrompt"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-purple-300 outline-none"
              placeholder="Write short description of  Course you want to generate "
            />
            <Button
              startContent={<BrainCircuit />}
              color="secondary"
              isLoading={isLoading}
              isDisabled={isLoading}
              variant="ghost"
              className="my-1"
              onPress={handleGenerateWithAi}
            >
              Generate With Ai ✨
            </Button>
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="rounded-md mx-auto md:w-11/12 lg:w-10/12 w-full my-2 p-2">
        {courseChapters.map((chapter, ind) => (
          <EditChapters
            key={ind}
            chapter={chapter}
            ind={ind}
            courseData={data}
            courseChapters={courseChapters}
            setCourseChapters={setCourseChapters}
          />
        ))}
      </div>

      <AddChapter
        courseChapters={courseChapters}
        setCourseChapters={setCourseChapters}
      />
    </>
  );
};

export default UpdateCourse;