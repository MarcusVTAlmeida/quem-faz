import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import debounce from "lodash.debounce";
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
const posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' },
  { id: 6, title: 'Post 6' },
  { id: 7, title: 'Post 7' },
  { id: 8, title: 'Post 8' },
  { id: 9, title: 'Post 9' },
  { id: 10, title: 'Post 10' },
  { id: 11, title: 'Post 11' },
  { id: 12, title: 'Post 12' },
];
const getFilteredItems = (query, tasks) => {
  if (!query) {
    return tasks;
  }
  return tasks.filter((user) => user.cidade.toLowerCase().includes(query.toLowerCase()));
};

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 3;
  const usersCollectionRef = collection(db, "users");
  const filteredItems = getFilteredItems(query, tasks);
  const updateQuery = (e) => setQuery(e?.target?.value);
  const debouncedOnChange = debounce(updateQuery, 200);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.uid })));
  };


  useEffect(() => {
    getUsers()

  }, []);

  return (
    <div className="App">
      <div  className="dashboard__container">
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/resgister">Registrar</Link>
        </div>
        Encontre um prestador de serviço
        <input type="search" onChange={debouncedOnChange} autoCapitalize='characters' />
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
