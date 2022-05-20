import React, { useEffect, useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header() {
  const [tasks, setTasks] = useState([])
  const [dados, setDados] = useState("")
  const [user, loading, error] = useAuthState(auth);
  const [uid, setUid] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [cidade, setCidade] = useState("")
  const [descricao, setDescricao] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setCidade(data.cidade);
      setDescricao(data.descricao)
      setWhatsapp(data.whatsapp)
      setPhoto(data.photo)
      setUid(data.uid)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName()
  }, [user, loading]);
  return (
    <header>
      <div>
        {
          (() => {
            if (uid && cidade === "") {
              return (<MDBNavbar expand='lg' light bgColor='white'>
                <img style={{ borderRadius: '50%'}} src={`${photo}`} width="50" height="50" />
                <MDBContainer fluid>
                  <MDBNavbarToggler
                    aria-controls='navbarExample01'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <MDBIcon fas icon='bars' />
                  </MDBNavbarToggler>
                  <div className='collapse navbar-collapse' id='navbarExample01'>
                    <MDBNavbarNav right className='mb-2 mb-lg-0'>
                      <MDBNavbarItem active>
                        <MDBNavbarLink href='/quem-faz/'>
                          Quem faz?
                        </MDBNavbarLink>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                        <MDBNavbarLink href='/quem-faz/profile'>Editar perfil</MDBNavbarLink>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                        <MDBNavbarLink onClick={logout}>Sair</MDBNavbarLink>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                        <MDBNavbarLink>Complete seu cadastro para que as pessoas entre em contato com você</MDBNavbarLink>
                      </MDBNavbarItem>
                    </MDBNavbarNav>
                  </div>
                </MDBContainer>
              </MDBNavbar>);
            }
            else if (uid) {
              return (<div>
                <MDBNavbar expand='lg' light bgColor='white'>
                  <img style={{ borderRadius: '50%'}} src={`${photo}`} width="50" height="50" />
                  <MDBContainer fluid>
                    <MDBNavbarToggler
                      aria-controls='navbarExample01'
                      aria-expanded='false'
                      aria-label='Toggle navigation'>
                      <MDBIcon fas icon='bars' />
                    </MDBNavbarToggler>
                    <div className='collapse navbar-collapse' id='navbarExample01'>
                      <MDBNavbarNav right className='mb-2 mb-lg-0'>
                        <MDBNavbarItem active>
                          <MDBNavbarLink>
                            Quem faz?
                          </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                          <MDBNavbarLink href='/quem-faz/profile'>Editar perfil</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                          <MDBNavbarLink onClick={logout}>Sair</MDBNavbarLink>
                        </MDBNavbarItem>
                      </MDBNavbarNav>
                    </div>
                  </MDBContainer>
                </MDBNavbar>
              </div>);
            }
            else
              return (<div>
                <MDBNavbar expand='lg' light bgColor='white'>
                  <img style={{ borderRadius: '50%'}} src={`https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png`} width="50" height="50" />
                  <MDBContainer fluid>
                    <MDBNavbarToggler
                      aria-controls='navbarExample01'
                      aria-expanded='false'
                      aria-label='Toggle navigation'>
                      <MDBIcon fas icon='bars' />
                    </MDBNavbarToggler>
                    <div className='collapse navbar-collapse' id='navbarExample01'>
                      <MDBNavbarNav right className='mb-2 mb-lg-0'>
                        <MDBNavbarItem active>
                          <MDBNavbarLink>
                            Quem faz?
                          </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                          <MDBNavbarLink href='/quem-faz/login'>Entrar</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                          <MDBNavbarLink href='/quem-faz/register'>Registrar-se</MDBNavbarLink>
                        </MDBNavbarItem>
                      </MDBNavbarNav>
                    </div>
                  </MDBContainer>
                </MDBNavbar>
              </div>);
          })()
        }
      </div>
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: 250 }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Quem faz o trabalho que você precisa?</h1>
              <h4 className='mb-3'>Aqui você encontra!</h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}