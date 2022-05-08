import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  const fetchUserName2 = async () => {      
    const docRef = doc(db, 'users', user?.uid);
    const payload = {name: 'Black', value:'#000'};
    await setDoc(docRef, payload)
   
    };

    const fetchUserName1 = async () => {      
      const collectionRef = collection(db, 'users')
      const payload = {name: 'Black', value:'#000'};
      await addDoc(collectionRef, payload)
     
      };
      const fetchUserName3 = async () => {      
        const frankDocRef = doc(db, "users", "frank");
        await setDoc(frankDocRef, {
            name: "Frank",
            favorites: { food: "Pizza", color: "Blue", subject: "recess" },
            age: 12
        });
        };
    
 
   useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    //fetchUserName1()
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
        <button className="dashboard__btn" onClick={fetchUserName3}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
