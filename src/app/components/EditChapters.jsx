// EditChapters.jsx
import React, { useState } from "react";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { BrainCircuit, Trash } from "lucide-react";
import MdEditor from "./Md";
import toast from "react-hot-toast";
import { generateChapterContent } from "@/models/generateChapterContent";

const EditChapters = ({courseData, chapter,courseChapters,ind, setCourseChapters }) => {
    const [chapterAiPrompt,setChapterAiPrompt] = useState("")
    const [isLoading,setIsLoading] = useState(false);
  // Function to update chapter content
  const updateChapterContent = (index, content) => {
    setCourseChapters((prevChapters) => {
      const updatedChapters = [...prevChapters];
      updatedChapters[index] = {
        ...updatedChapters[index],
        chapterContent: content
      };
      return updatedChapters;
    });
  };

  const handleGenerateContentWithAi = async()=>{
    setIsLoading(true)
    try {
        const response = await generateChapterContent(courseData,chapter.title,chapter.description,chapterAiPrompt)
        const chapterCon = JSON.parse(await response)
        console.log(chapterCon)
        if(chapterCon.chapterContent){
           updateChapterContent(ind,chapterCon.chapterContent)
        }
    } catch (error) {
        console.log(error)
        toast.error("Faied to Generate Content for Chapter")
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <>
     
        <div  className="relative">
          <Button
            isIconOnly
            className="absolute right-0 text-red-500 bg-red-200"
            onPress={() =>
              setCourseChapters((prevData) =>
                prevData.filter((item) => item !== chapter)
              )
            }
          >
            <Trash size={13} />
          </Button>
          <Accordion variant="splitted" className="">
            <AccordionItem
              key={ind}
              className="my-2"
              aria-label="Accordion 1"
              subtitle={chapter?.description ?? ""}
              title={ind + 1 + "]" + chapter?.title ?? ""}
            >
                <div>
                    <label htmlFor="chaptetAiPrompt">🔮 Generate Chapter Contents with Ai</label>
                    <textarea
              id="chaptetAiPrompt"
              rows="2"
              
              value={chapterAiPrompt}
              onChange={(e) => setChapterAiPrompt(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-purple-300 outline-none"
              placeholder="Write short description of  chapter you want to generate "
            />
            <Button
              startContent={<BrainCircuit />}
              color="secondary"
              isLoading={isLoading}
              isDisabled={isLoading}
              variant="ghost"
              className="my-1"
              onPress={handleGenerateContentWithAi}
            >
              Generate With Ai ✨
            </Button>
                </div>
              <MdEditor 
                chapterContent={chapter?.chapterContent || ""} 
                setChapterContent={(content) => updateChapterContent(ind, content)} 
              />
            </AccordionItem>
          </Accordion>
        </div>
      
    </>
  );
};

export default EditChapters;