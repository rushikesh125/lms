import { db } from "@/firebase/config";
import { generateRandomId } from "@/firebase/utils"
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const createNewChapter = async ({courseId,data})=>{
    const chatperId = generateRandomId(16);

    if(!courseId || !data){
        throw new Error("Invalid Data , {createNewCourse}")
    }
    const chatperRef = doc(db,`courses/${courseId}/chapters/${chatperId}`);

    await setDoc(chatperRef,{
        ...data,
        courseId:courseId,
        chatperId:chatperId,
        createdAt:Timestamp.now()
    })
}