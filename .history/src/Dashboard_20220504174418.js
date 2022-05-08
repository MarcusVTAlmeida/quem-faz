import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import SearchField from 'react-search-field';
import BookData from "./Data.json";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [cidade, setCidade] = useState('')
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setCidade(data.cidade);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
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
    getUsers()
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
        <input placeholder="Mude seu nome" type='text' name='name' onChange={(e) => setName(e.target.value)} />
        <input placeholder="Mude sua cidade" type='text' name='cidade' onChange={(e) => setCidade(e.target.value)} />
        
        <div>
        <SearchField
        placeholder='Search item'
        onChange={event => setQuery(event.target.value)}
        />
      {tasks.filter(user => {
    if (query === 'a') {
      return user;
    } else if (user.cidade.toLowerCase().includes(query.toLowerCase())) {
      return user;
    }
  }).map(filteredPerson => (
        <li>
          {filteredPerson.name}
        </li>
      ))}
    </div>
     
        {/* {tasks.map((user) => {
          return (
            <div>
              <div style={{ border: "5px solid", borderColor: "#a36a00" }} />
              <h3>Nome: {user.name}</h3>
              <h3>Cidade: {user.cidade}</h3>
              <h3>Email: {user.email}</h3>
            </div>
          );
        })} */}

{/* <SearchField
        placeholder='Search item'
        onChange={event => setQuery(event.target.value)}
        />
         <input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
         {
  BookData.filter(user => {
    if (query === '') {
      return user;
    } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
      return user;
    }
  }).map((user, index) => (
    <div className="box" key={index}>
      <p>{user.link}</p>
      <p>{user.cidade}</p>
    </div>
  ))
} */}
      </div>
    </div>
  );
}

export default Dashboard;
