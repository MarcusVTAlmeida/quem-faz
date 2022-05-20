import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./App.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import debounce from "lodash.debounce";
import ReactPaginate from "react-paginate";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./header";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInputGroup, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';

const getFilteredItems = (dados, tasks) => {
  if (!dados) {
    return tasks;
  }
  return tasks.filter((user) => user.cidade.toLowerCase().includes(dados.toLowerCase()));
};

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [dados, setDados] = useState("")
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(tasks.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const usersCollectionRef = collection(db, "usersComplete");
  const filteredItems = getFilteredItems(dados, tasks);
  const updateDados = (e) => setDados(e?.target?.value);
  const debouncedOnChange = debounce(updateDados, 200);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.uid })));
  };


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    getUsers()
  }, [user, loading]);


  return (
    <div>
      <Header />
      <div className="App">
        <br />
        <br />
        <br />
        <h1 style={{ color: 'white' }}>Encontre um prestador de serviço</h1>
        <br />
        <div className="dashboard__container"> 
        <MDBInputGroup textBefore='Cidade ou Serviço'>
          <input placeholder="Nome da cidade" type="search" onChange={debouncedOnChange} autoCapitalize='characters' />
          <input placeholder="Tipo de serviço" type="search" onChange={debouncedOnChange} autoCapitalize='characters' />
        </MDBInputGroup>
        </div>
        <div className="dashboard__container">
          {filteredItems.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => (
            <div>             
              <MDBCard alignment='center' style={{ maxWidth: '22rem' }}>
                <MDBCardHeader>{user.name} - {user.cidade}</MDBCardHeader>
                <MDBCardBody>
                  <img src={`${user.photo}`} width="50" height="50" style={{ borderRadius: '50%'}}/>
                  <MDBCardTitle>Serviço:</MDBCardTitle>
                  <MDBCardText>{user.descricao}</MDBCardText>
                </MDBCardBody>
                <MDBCardFooter className='text-muted'>
                  <MDBBtn onClick={toggleShow}>Contato</MDBBtn>
                  <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                    <MDBModalDialog>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>Contato</MDBModalTitle>
                          <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <h3>{user.email}</h3>
                        <h3>Número:</h3>
                        <MDBModalFooter>
                          <MDBBtn color='secondary' onClick={toggleShow}>
                            Fechar
                          </MDBBtn>
                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                </MDBCardFooter>
              </MDBCard>
              <br />
            </div>
            
          ))}
   <br />
   <br />
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
    </div>
  );
}

export default Dashboard;
