import { collection, addDoc,serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
export const AddDocument = async (nameColection, data) => {
  await addDoc(collection(db, nameColection),{
    ...data,
    createdAt: serverTimestamp(),
  });
};
