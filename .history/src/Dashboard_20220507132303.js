import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import debounce from "lodash.debounce";
import api from "../../services/api";

import {
  Container,
  PTable,
  Pagination,
  PaginationButton,
  PaginationItem,
} from "./styles";

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
