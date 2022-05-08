import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";


function ProfileEdit() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [cidade, setCidade] = useState("")
  const navigate = useNavigate(); 

 
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setCidade(data.cidade);
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  }; 


  const updatePerfil = async () => {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      cidade: cidade

    });
  }

  //   const addCidade = async () => {      
  //     const docRef = doc(db, "users", user.uid); //substitui informações do perfil
  //   await setDoc(docRef, {
  //    cidade: cidade
  //   });
  // }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    //fetchUserName1()
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Bem vindo
        <div>{name}</div>
        <div>{cidade}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
        <button className="dashboard__btn" onClick={updatePerfil}>Atualizar dados</button>
        <input placeholder="Mude seu nome" type='text' name='name' onChange={(e) => setName(e.target.value)} autoCapitalize='characters'/>
        <input placeholder="Mude sua cidade" type='text' name='cidade' onChange={(e) => setCidade(e.target.value)} />       
      </div>
    </div>
  );
}

export default ProfileEdit;
