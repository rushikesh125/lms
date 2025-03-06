import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const courseContentSchema = {
    type: "object",
    properties: {
      chapterContent: {
        description: "Explained chapter completely and strongly, providing code in Markdown format.",
        type: SchemaType.STRING,
      },
    },
    required: ["chapterContent"],
  };
  
// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: courseContentSchema,
  },
});

// Example usage
const generateChapterContent = async (courseData, chapterName,chapterDescription, prompt) => {
  const cData = JSON.stringify(courseData);
  //   console.log(resData);

  try {
    const result = await model.generateContent(
      `course := ${cData} understand given course , and generate Chapter contents which explained chapter:=${chapterName},${chapterDescription} with all necessary and strongly give in markdown format, include references , links for detail explanation of given Chapter, a strongly keep explaination as large & detailed as possible   ${prompt}`
    );
    return result.response.text();
  } catch (error) {
    console.error("Error Generating resume review:", error);
    throw error;
  }
};

export { generateChapterContent, courseContentSchema };
