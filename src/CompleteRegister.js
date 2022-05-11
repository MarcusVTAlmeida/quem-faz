import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where, doc, addDoc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";


function CompleteRegister() {
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

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setNameAtual(data.name);
            setCidadeAtual(data.cidade);
            setDescricaoAtual(data.descricao)
            setWhatsappAtual(data.whatsapp)
            setPhotoAtual(data.photo)
        } catch (err) {
            console.error(err);
            // alert("An error occured while fetching user data");
        }
    };

    const updatePerfil = async () => {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
            cidade: cidade,
            descricao: descricao,
            whatsapp: whatsapp
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
                <img src={`${photoAtual}`} />
                <div>{nameAtual}</div>
                <div>{cidadeAtual}</div>
                <div>{descricaoAtual}</div>
                <div>{whatsappAtual}</div>
                <div>{user?.email}</div>

                <form onSubmit={updatePerfil}><br />
                    <input placeholder="Informe sua cidade" type='text' name='cidade' required onChange={(e) => setCidade(e.target.value)} /><br />
                    <input placeholder="Informe seu whatsapp" type='text' name='whatsapp' required onChange={(e) => setWhatsapp(e.target.value)} /><br />
                    <input placeholder="Informe sua descricao" type='text' name='descricao' required onChange={(e) => setDescricao(e.target.value)} /><br />
                    <button className="dashboard__btn" type="submit">Adicionar dados</button><br />
                </form>
                <button className="dashboard__btn" onClick={logout}>
                    Deslogar
                </button>
                <div>
                    <Link to="/">Voltar ao inicio</Link>
                </div>
            </div>
        </div>
    );
}

export default CompleteRegister;
