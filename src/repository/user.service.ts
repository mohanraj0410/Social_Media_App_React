import { db } from "@/firebaseConfig";
import { UserProfile } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "user";

export const createUserProfile = (user: UserProfile) => {
  try {
    return addDoc(collection(db, COLLECTION_NAME), user);
  } catch (err) {
    console.log(err);
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId)
    );
    const qSnapShot = await getDocs(q);
    let tempData = {};
    if (qSnapShot.size > 0) {
      qSnapShot.forEach((doc) => {
        const userData = doc.data() as UserProfile;
        tempData = {
          id: doc.id,
          ...userData,
        };
      });
      return tempData;
    } else {
      console.log("no such documents");
    }
    return tempData;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = (id: string, user: UserProfile) => {
  const docRef = doc(db, COLLECTION_NAME, id);

  return updateDoc(docRef, {
    ...user,
  });
};
