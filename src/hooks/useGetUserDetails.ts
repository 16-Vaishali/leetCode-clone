import { auth, firestore } from "@/firebase/firebase";
import { useEffect,useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {  doc, getDoc} from "firebase/firestore";


function useGetUserDetails() {
    const [data, setData] = useState({
      liked: [],
      disliked: [],
      starred: [],updatedAt:0,comments:[],
      solved: [], premium:false, createdAt:0,email:'',displayName:'',solvedDates:[]
    });
    const [user] = useAuthState(auth);
    useEffect(() => {
      const getUserData = async () => {
        const userRef = doc(firestore, "users", user!.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          const {
            solvedProblems,
            likedProblems,
            dislikedProblems, solvedDates,comments,
            starredProblems, premium,createdAt,email,displayName,updatedAt
          } = data;
          setData({
            liked: likedProblems,
            disliked: dislikedProblems,
            starred: starredProblems, solvedDates:solvedDates,
            solved: solvedProblems, updatedAt:updatedAt,comments:comments,
            premium:premium,createdAt:createdAt,email:email,displayName:displayName
          });
        }
      };
      if (user) getUserData();
      return () =>
        setData({ liked: [], disliked: [], starred: [], solved: [],premium:false,createdAt:0,email:'',
        displayName:'',updatedAt:0,solvedDates:[],comments:[] });
    }, [ user]);
    return { ...data, setData };
    
  }

  export default useGetUserDetails