import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./App.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import Header from "./header";
import { MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

function ProfileEdit() {
    const [user, loading, error] = useAuthState(auth);

    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cidade, setCidade] = useState("")
    const [descricao, setDescricao] = useState("")
    const [serviço, setServiço] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const navigate = useNavigate();

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
            setTelefone(data.telefone)
            setServiço(data.serviço)
        } catch (err) {
            console.error(err);
            // alert("An error occured while fetching user data");
        }
    };

    const updatePerfil = async () => {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
            cidade: cidade,
            name: name,
            descricao: descricao,
            whatsapp: whatsapp,
            telefone: telefone,
            serviço: serviço
        });

        const docRef1 = doc(db, "usersComplete", user.uid);
        await setDoc(docRef1, {
            cidade: cidade,
            descricao: descricao,
            whatsapp: whatsapp,
            name: name,
            email: user?.email,
            authProvider: "google",
            photo: photo,
            telefone: telefone,
            serviço: serviço
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
        fetchUserName();
    }, [user, loading]);

    return (
        <div>
            <Header />
            <div className="App">
                <div className="dashboard__container">
                <br/>
                    <h1 style={{ color: 'white' }}>Meu perfil</h1>
                    <div>
                        <Link to="/">Voltar ao inicio</Link>
                    </div>
                    <br/>
                    <br/>
                    <img src={`${photo}`} width="175" height="175" style={{ borderRadius: '50%', alignSelf: 'center'}}/>
                    <h1 style={{ color: 'white' }}>{name}</h1>
                    <div style={{ color: 'white' }}>{cidade}</div>
                    <div style={{ color: 'white' }}>{descricao}</div>
                    <div style={{ color: 'white' }}>{whatsapp}</div>
                    <div style={{ color: 'white' }}>{user?.email}</div>
                    <div style={{ color: 'white' }}>{telefone}</div>
                    <div style={{ color: 'white' }}>{serviço}</div>
                    <br/>
                    <br/>
                    <input placeholder="Insira seu nome" type='text' name='name' required onChange={(e) => setName(e.target.value)} style={{borderRadius: '10px', height:'40px', width:'500px'}}/>
                    <br/>
                    <input placeholder="Insira sua cidade" type='text' name='cidade' required onChange={(e) => setCidade(e.target.value)} style={{borderRadius: '10px', height:'40px', width:'500px'}}/>
                    <br/>
                    <input placeholder="Insira seu whatsapp" type='text' name='whatsapp' required onChange={(e) => setWhatsapp(e.target.value)} style={{borderRadius: '10px', height:'40px', width:'500px'}}/>
                    <br/>
                    <input placeholder="Insira seu telefone" type='text' name='telefone' required onChange={(e) => setTelefone(e.target.value)} style={{borderRadius: '10px', height:'40px', width:'500px'}}/>
                    <br/>
                    <input placeholder="Insira seu serviço" type='text' name='serviço' required onChange={(e) => setServiço(e.target.value)} style={{borderRadius: '10px', height:'40px', width:'500px'}}/>
                    <br/>
                    <textarea placeholder="Insira sua descricao" type='text' name='descricao' required onChange={(e) => setDescricao(e.target.value)} style={{borderRadius: '10px', height:'40px', width:'500px'}}/>
                    <br/>
                    <button className="dashboard__btn" onClick={updatePerfil}>Salvar alterações</button>
                    <button className="dashboard__btn" onClick={logout}>
                        Sair
                    </button>                  
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;
