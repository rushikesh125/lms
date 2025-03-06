import { Button } from "@heroui/react";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const AddChapter = ({ courseChapters, setCourseChapters }) => {
  const [chapter, setChapter] = useState({
    title: "",
    description: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setChapter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <div className="bg-white rounded-md mx-auto md:w-11/12 lg:w-10/12 w-full my-2  py-2 px-2 md:p-6 lg:px-10 flex flex-col gap-2 relative">
        <input
          type="text"
          name="title"
          value={chapter.title}
          onChange={handleOnChange}
          placeholder="Chapter Title"
          className="p-2 w-full border border-purple-400 rounded-md outline-none"
        />
        <input
          type="text"
          name="description"
          value={chapter.description}
          onChange={handleOnChange}
          placeholder="chapter description"
          className="p-2 w-full border border-purple-400 rounded-md outline-none"
        />
        <Button
          startContent={<Plus />}
          className=""
          color="secondary"
          onPress={() => {
            setCourseChapters((prevChapters) => {
              return [...prevChapters, chapter];
            });
            setChapter({
              title: "",
              description: "",
            });
          }}
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default AddChapter;
