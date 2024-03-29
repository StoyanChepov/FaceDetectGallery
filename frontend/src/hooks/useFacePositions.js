import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { onSnapshot, collection, query, where } from "firebase/firestore";

const useFacePositions = (imageId) => {
  const [faces, setfacePos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'facePositions'), where('imageId', '==', imageId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setfacePos(documents);
      });
  
      return () => unsubscribe();
    }, [imageId]);
  return { faces };
};

export default useFacePositions;
