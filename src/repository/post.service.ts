import { db } from "@/firebaseConfig";
import { Post, DocumentResponse, ProfileInfo } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "posts";

export const createPost = (post: Post) => {
  return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    const qSnapShot = await getDocs(q);
    const tempArr: DocumentResponse[] = [];
    if (qSnapShot.size > 0) {
      qSnapShot.forEach((doc) => {
        const data = doc.data() as Post;
        const resObj: DocumentResponse = {
          id: doc.id,
          ...data,
        };
        tempArr.push(resObj);
      });
      return tempArr;
    } else {
      console.log("no such documents");
    }
    return getDocs(q);
  } catch (err) {
    console.log(err);
  }
};

export const getPostByUserId = (id: string) => {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));
  return getDocs(q);
};

export const getPost = (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return getDoc(docRef);
};

export const deletePost = (id: string) => {
  return deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const updateLikesPostData = (
  id: string,
  userlikes: string[],
  likes: number
) => {
  const docRef = doc(db, COLLECTION_NAME, id);

  return updateDoc(docRef, {
    likes: likes,
    userlikes: userlikes,
  });
};

export const updateUserInfoOnPost = async (profileInfo: ProfileInfo) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", profileInfo.user?.uid)
  );
  const qSnapShot = await getDocs(q);
  if (qSnapShot.size > 0) {
    qSnapShot.forEach((document) => {
      const docRef = doc(db, COLLECTION_NAME, document.id);
      updateDoc(docRef, {
        username: profileInfo.displayName,
        photoURL: profileInfo.photoURL,
      });
    });
  } else {
    console.log("error");
  }
};
