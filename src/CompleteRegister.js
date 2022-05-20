import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";


function CompleteRegister() {
    const [user, loading, error] = useAuthState(auth);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [cidade, setCidade] = useState("")
    const [descricao, setDescricao] = useState("")
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
        } catch (err) {
            console.error(err);
            // alert("An error occured while fetching user data");
        }
    };



    const updatePerfil = async () => {
        const docRef = doc(db, "usersComplete", user.uid);
        await setDoc(docRef, {
            cidade: cidade,
            descricao: descricao,
            whatsapp: whatsapp,
            name: name,
            email: user?.email,
            authProvider: "google",
            photo: photo,
        });
        const docRef1 = doc(db, "users", user.uid);
        await updateDoc(docRef1, {
            cidade: cidade,
            descricao: descricao,
            whatsapp: whatsapp,
            name: name,
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
        <div className="dashboard">
            <div className="dashboard__container">
                Bem vindo
                <img src={`${photo}`} width="50" height="50" />
                <div>{name}</div>
                <div>{cidade}</div>
                <div>{descricao}</div>
                <div>{whatsapp}</div>
                <div>{user?.email}</div>


                <input placeholder="Mude seu nome" type='text' name='name' required onChange={(e) => setName(e.target.value)} />
                <input placeholder="Informe sua cidade" type='text' name='cidade' required onChange={(e) => setCidade(e.target.value)} />
                <input placeholder="Informe seu whatsapp" type='text' name='whatsapp' required onChange={(e) => setWhatsapp(e.target.value)} />
                <input placeholder="Informe sua descricao" type='text' name='descricao' required onChange={(e) => setDescricao(e.target.value)} />
                <button className="dashboard__btn" onClick={updatePerfil}>Adicionar dados</button>
                <button className="dashboard__btn" onClick={logout}>
                    Sair
                </button>
                <div>
                    <Link to="/">Voltar ao inicio</Link>
                </div>


            </div>
        </div>
    );
}

export default CompleteRegister;
