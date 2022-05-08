import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import SearchField from 'react-search-field';
import debounce from "lodash.debounce";

const getFilteredItems = (query, tasks) => {
  if (!query) {
    return tasks;
  }
  return tasks.filter((user) => user.cidade.toLowerCase().includes(query.toLowerCase()));
};

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [cidade, setCidade] = useState("")
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");


  const filteredItems = getFilteredItems(query, tasks);

  const updateQuery = (e) => setQuery(e?.target?.value);

  const debouncedOnChange = debounce(updateQuery, 200);

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

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.uid })));
  };


  const updatePerfil = async () => {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      cidade: cidade

    });
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    //fetchUserName1()
    getUsers()
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
      Encontre um prestador de serviço      
        <label></label>
      <input type="search" onChange={debouncedOnChange}  autoCapitalize='characters' />   
          {filteredItems.map((user) => (
         <div>
         <div style={{ border: "5px solid", borderColor: "#a36a00" }} />
         <h3>Nome: {user.name}</h3>
         <h3>Cidade: {user.cidade}</h3>
         <h3>Email: {user.email}</h3>
       </div>
        ))}      
        
      </div>
    </div>
  );
}

export default Dashboard;
