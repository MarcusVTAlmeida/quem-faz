import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc } from "firebase/firestore";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState('')
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

      const updatePerfil = async () => {      
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          name: name       
      });
    }

    const addCidade = async () => {      
      const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
     cidade: cidade
    });
  }
    
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
        <input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <button className="dashboard__btn" onClick={updatePerfil}>Atualizar dados</button>    
      </div>
    </div>
  );
}

export default Dashboard;
