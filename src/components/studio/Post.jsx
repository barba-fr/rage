import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from '../header/Header'
import LoginForm from "../admin/LoginForm";
import AdminConnected from "../admin/AdminConnected";
import Toast from '../admin/Toast';

import SimpleVideo from './SimpleVideo'

import {db} from "../../firebase";

function Post(props) {

    const [admin, setAdmin] = useState(false)
    const [loginForm, setLoginForm] = useState(false)
    const [toast, setToast] = useState({
        display: false,
        type: "",
        header: "",
        message: "",
    })
    const [post, setPost] = useState({})

    const params = useParams()
    const id = params.id

    useEffect(() => {
        
        const admin = localStorage.getItem('user')
        if (admin) {
            setAdmin(true)
        }
        
        db.collection('studio').where('timestamp', '==', Number(id)).get()
            .then( docs => {
                docs.forEach( doc => {
                    setPost(doc.data())
                } )
            } )

    }, [admin, id])

    const showForm = () => {
        if (admin === false) {
            setLoginForm(true)
        }
    }

    const hideForm = () => {
        setLoginForm('closing')
        setTimeout(() => {
            setLoginForm(false)
        }, 150)
    }

    const confirmLogin = user => {
        localStorage.setItem('user', user);
        hideForm();
        setAdmin(true)
        sendToast('success', 'Connexion réussie', 'Vous pouvez modifier le site.')
    }

    const refuseLogin = errorCode => {

        const errorType = "danger";
        let header = "Erreur", message = "Une Erreur s'est produite.";

        switch (errorCode) {
            case "auth/email-already-in-use":
                message = "Cette adresse e-mail est déjà utilisée.";
                break;

            case "auth/pseudo-not-allowed":
                header = "Compte refusé";
                message = "Vous n'êtes pas éligible à l'administration du site";
                break;

            case "auth/weak-password":
                header = "Mot de passe faible";
                message = "Le mot de passe doit contenit au moins 6 caractères";
                break;

            case "auth/wrong-password":
                message = "Mot de passe incorrect";
                break;

            case "auth/user-not-found":
                message = "Utilisateur introuvable";
                break;

            default:
                break;
        }

        sendToast(errorType, header, message);

    }

    const logout = () => {
        localStorage.removeItem('user');
        setAdmin(false)
        sendToast('success', 'Déconnecté(e)', 'Vous ne pouvez plus faire de modification.')
    }

    const sendToast = (type, header, message) => {
        const toast = {
            display: true,
            type: type,
            header: header,
            message: message
        }

        const clearToast = {
            display: false,
            type: "",
            header: "",
            message: ""
        }

        setToast(toast)
        setTimeout(() => {
            setToast(clearToast)
        }, 4000);

    }

    return (
        <div className="container" id="app">

            {admin === true ? <AdminConnected logout={logout} /> : null}

            <Header showForm={showForm} />

            <main id="rosters">

                <div className="post card">

                    <div className="post-header roster-header">
                        <h1>{ post.titre }</h1>
                        <p>{ post.auteur }, le {post.date}</p>
                    </div>

                    <div className="post-content">
                        { post.source && post.source.length === 1 ? <SimpleVideo source={post.source} /> : null}
                    </div>

                </div>

            </main>

            {loginForm !== false ? <LoginForm hideForm={hideForm} confirmLogin={confirmLogin} refuseLogin={refuseLogin} isClosing={loginForm} /> : null}
            {toast.display === true ? <Toast type={toast.type} header={toast.header} message={toast.message} /> : null}

        </div>
    );

}

export default Post;
