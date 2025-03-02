"use client";

import { Button } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { createCourse } from "@/firebase/courses/write";
import { useSelector } from "react-redux";
import CustomBtn from "./CustomBtn";

const CreateCourse = () => {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    courseTitle: "Mastering Digital Illustration",
    shortDescription:
      "Learn the art of digital illustration with hands-on projects and expert guidance.",
    category: "",
    level: "",
    language: "",
    coursePrice: "89",
    description: "",
    posterURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_dRff492oCHFGTkpxrKGghoE5MxfrLpDPEw&s",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if(!data?.courseTitle || !data?.shortDescription || !data?.category || !data?.level || !data?.language || !data?.coursePrice || !data?.description || !data?.posterURL){
        toast.error("Please Fill Form Completely , there are missing Feilds")
        return ;
    }

    setIsLoading(true);
    try {
      console.log("Form Data:", data);
      const courseId = await createCourse({
        data: data,
        instructureUid: user?.uid,
        instructureName: user?.displayName,
        instructurePhotoURL: user?.photoURL,
      });
      toast.success(`Course Created Successfully (ID: ${courseId})`);
      // Reset form after successful submission (optional)
      setData({
        courseTitle: "",
        shortDescription: "",
        category: "",
        level: "",
        language: "",
        coursePrice: "",
        description: "",
        posterURL: "",
      });
    } catch (error) {
      toast.error(error?.message || "Failed to create course");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const courseLang = ["English", "Hindi"]; // Removed duplicate "English"
  const courseLevel = ["Beginner", "Intermediate", "Advanced"]; // Fixed typo "Intermidiate" to "Intermediate"

  return (
    <div className="bg-white rounded-md mx-auto md:w-11/12 lg:w-10/12 w-full py-2 px-2 md:p-6 lg:px-10">
      <div className="w-full flex justify-between items-center">
        <div className="text-xl text-purple-400">Create Course</div>
        <Button
          color="secondary"
          variant="shadow"
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading} // Disable button while loading
        >
          Create
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
            <img src={data?.posterURL} alt="Poster" className="w-40" onError={() => toast.error("Invalid poster URL")} />
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
              <option value={""}>Select Course Category</option>
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
            rows="4"
            name="description"
            value={data?.description}
            onChange={handleInputChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-purple-300 outline-none"
            placeholder="Write your Course Description here..."
          />
        </div>
      </div>
    </div>
    
  );
};

export default CreateCourse;