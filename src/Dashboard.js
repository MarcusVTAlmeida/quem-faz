import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./App.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import debounce from "lodash.debounce";
import ReactPaginate from "react-paginate";
import { useAuthState } from "react-firebase-hooks/auth";

const getFilteredItems = (Query, tasks) => {
  if (!Query) {
    return tasks;
  }
  return tasks.filter((user) => user.cidade.toLowerCase().includes(Query.toLowerCase()));
};

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [Query, setQuery] = useState("")
  const [user, loading, error] = useAuthState(auth);
  const [nameAtual, setNameAtual] = useState("");
  const [photoAtual, setPhotoAtual] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [cidadeAtual, setCidadeAtual] = useState("");
  const [cidade, setCidade] = useState("")
  const [descricao, setDescricao] = useState("")
  const [descricaoAtual, setDescricaoAtual] = useState("")
  const [whatsappAtual, setWhatsappAtual] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(tasks.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const usersCollectionRef = collection(db, "usersComplete");
  const filteredItems = getFilteredItems(Query, tasks);
  const updateQuery = (e) => setQuery(e?.target?.value);
  const debouncedOnChange = debounce(updateQuery, 200);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.uid })));
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setNameAtual(data.name);
      setCidadeAtual(data.cidade);
      setDescricaoAtual(data.uid)
      setWhatsappAtual(data.whatsapp)
      setPhotoAtual(data.photo)
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    getUsers()
    fetchUserName()
  }, [user, loading]);


  return (
    <div className="App">
      <div className="dashboard__container">
        <div>
          {
            (() => {
              if (user) {
                return (<div>
                  <img src={`${photoAtual}`} width="50" height="50" />
                  <div>{nameAtual}</div>
                  <div>
                    <Link to="/profile">Editar</Link>
                  </div>
                  <button className="dashboard__btn" type="submit" onClick={logout}>
                    Sair
                  </button>
                </div>);
              }

              else
                return (<div>
                  <img src={`https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png`} width="50" height="50" />
                  <div>
                    <Link to="/login">Entrar</Link>
                  </div>
                  <div>
                    <Link to="/register">Registrar</Link>
                  </div>
                </div>);

            })()
          }
        </div>
        <br />
        Encontre um prestador de serviço
        <input placeholder="Encontre um prestador de serviço" type="search" onChange={debouncedOnChange} autoCapitalize='characters' />
        <br />
        {filteredItems.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => (
          <div>
            <div style={{ border: "5px solid", borderColor: "#a36a00" }} />
            <h3>Nome: {user.name}</h3>
            <h3>Cidade: {user.cidade}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Descrição: {user.descricao}</h3>
          </div>
        ))}

        <ReactPaginate
          previousLabel={"Voltar"}
          nextLabel={"Próximo"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}

export default Dashboard;
