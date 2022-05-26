import React from 'react';
import {auth} from '../../firebase'
import {db} from '../../firebase';

import { IoClose } from 'react-icons/io5'

class LoginForm extends React.Component {

    state = {
        signinPseudo: "",
        signinMail: "",
        signinPass: "",
        loginMail: "",
        loginPass: "",
    }

    hideForm = () => {
        this.props.hideForm();
    }

    stopPropagation = e => {
        e.stopPropagation();
    }

    signinPseudo = (e) => {
        this.setState({ signinPseudo: e.target.value })
    }

    signinMail = (e) => {
        this.setState({ signinMail: e.target.value })
    }

    signinPass = (e) => {
        this.setState({ signinPass: e.target.value })
    }

    loginMail = (e) => {
        this.setState({ loginMail: e.target.value })
    }

    loginPass = (e) => {
        this.setState({ loginPass: e.target.value })
    }

    submitSignin = e => {
        e.preventDefault();

        db.collection('admins').get().then(doc => {

            let admins = [];

            doc.docs.forEach( key => {
                admins.push(key.id)
            } )

            if ( admins.includes( this.state.signinPseudo.toLowerCase() ) ) {
                
                auth.createUserWithEmailAndPassword(this.state.signinMail, this.state.signinPass)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        this.props.confirmLogin(user.email)
                        db.collection('admins').doc( this.state.signinPseudo.toLowerCase() ).set({
                            email: this.state.signinMail
                        }, {merge: true})
                    })
                    .catch((error) => {
                        this.props.refuseLogin(error.code)
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode);
                        console.log(errorMessage);
                    });

            } else {
                this.props.refuseLogin('auth/pseudo-not-allowed')
            }
        })

    }

    submitLogin = e => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(this.state.loginMail, this.state.loginPass)
            .then((userCredential) => {
                const user = userCredential.user;
                this.props.confirmLogin(user.email)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);

                this.props.refuseLogin(error.code)
            });
    }

    render(){
        return (
            <div className={`overlay ${this.props.isClosing}`} id="auth" onClick={this.hideForm}>

                <IoClose onClick={this.hideForm} id="close-auth" />

                <div id="auth-box" onClick={this.stopPropagation}>

                    <div className="auth-section" id="inscription">

                        <div className="auth-header">
                            <h3>Inscription</h3>
                        </div>

                        <form className="auth-body" onSubmit={this.submitSignin}>

                            <div className="form-group">
                                <label htmlFor="signin-pseudo">
                                    Pseudo
                                </label>
                                <input 
                                    type="text" 
                                    name="signin-pseudo" 
                                    id="signin-pseudo"
                                    value={this.state.signinPseudo}
                                    onChange={this.signinPseudo}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signin-mail">
                                    E-mail
                                </label>
                                <input 
                                    type="email" 
                                    name="signin-mail" 
                                    id="signin-mail"
                                    value={this.state.signinMail}
                                    onChange={this.signinMail}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="signin-pass">
                                    Mot de passe
                                </label>
                                <input 
                                    type="password" 
                                    name="signin-pass" 
                                    id="signin-pass"
                                    value={this.state.signinPass}
                                    onChange={this.signinPass}
                                />
                            </div>
                            
                            <button type="submit" className="form-submit">
                                Inscription
                            </button>
                            
                        </form>
                    </div>

                    <div className="auth-section" id="connection">
                        <div className="auth-header">
                            <h3>connexion</h3>
                        </div>
                        <form className="auth-body" onSubmit={this.submitLogin}>

                            <div className="form-group">
                                <label htmlFor="login-mail">
                                    E-mail
                                </label>
                                <input 
                                    type="email" 
                                    name="login-mail" 
                                    id="login-mail"
                                    value={this.state.loginMail}
                                    onChange={this.loginMail}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="login-pass">
                                    Mot de passe
                                </label>
                                <input 
                                    type="password" 
                                    name="login-pass" 
                                    id="login-pass"
                                    value={this.state.loginPass}
                                    onChange={this.loginPass}
                                />
                            </div>
                            
                            <button type="sublit" className="form-submit">
                                Connexion
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default LoginForm