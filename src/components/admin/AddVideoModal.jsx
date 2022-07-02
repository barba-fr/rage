import { useState } from 'react'
import { getTime, format } from 'date-fns'

import { db } from '../../firebase';

import Toast from './Toast'

function AddVideoModal(props) {

    const [form, setForm] = useState({
        auteur: '',
        timestamp: null,
        date: '',
        titre: '',
        source: ''
    })

    const [toast, setToast] = useState({
        display: false,
        type: "",
        header: "",
        message: "",
    })

    const closeModal = () => {
        props.closeModal()
    }

    const changeInput = (e, id) => {
        
        let newForm = {...form}
        if ( id !== 'source' ) {
            newForm[id] = e.target.value
        } else {
            newForm.source = e.target.value
        }
        setForm( newForm )

    }

    const submitForm = () => {
        
        const newForm = {...form}

        if (newForm.titre !== '' && newForm.auteur !== '' && newForm.source.length > 0 ) {
            
            setToast({
                display: false,
                type: '',
                header: '',
                message: ''
            })

            const submitForm = {...form}
            const dateObj = new Date()
            const date = format( dateObj, 'dd/MM/yyyy' )
            const timestamp = getTime( dateObj )
            
            submitForm.date = date
            submitForm.timestamp = timestamp

            db.collection('studio')
                .add(submitForm)
                .then( () => {
                    props.updatePosts(submitForm);
                    closeModal()
                } )


        } else {
            
            const submitToast = {
                display: true,
                type: 'danger',
                header: 'Certains champs sont vides',
                message: 'Verifiez le formulaire'
            }

            setToast( submitToast )

        }

    }

    return (
        <div className={`overlay ${props.isClosing}`} id="add-video-modal" onClick={props.closeClassEditor}>
            <div className="box card">
                
                <div className="roster-header">
                    <h1>Ajouter une vidéo</h1>
                </div>

                <div className="box-content">

                    <div className="form-group">
                        <label htmlFor="titre">Titre</label>
                        <input 
                            type="text" 
                            id="titre" 
                            onChange={ e => { changeInput(e, 'titre') } }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="auteur">Auteur</label>
                        <input 
                            type="text" 
                            id="auteur" 
                            onChange={ e => { changeInput(e, 'auteur') } }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="source">Collez votre lien ici</label>
                        <input 
                            type="text" 
                            id="source" 
                            onChange={ e => { changeInput(e, 'source') } }
                        />
                    </div>

                    <div className="form-group button-group">
                        <button type="button" className="invert" onClick={closeModal}>Annuler</button>
                        <button type="submit" onClick={submitForm}>Valider</button>
                    </div>

                </div>

            </div>

            { toast.display === true ? <Toast type={toast.type} header={toast.header} message={toast.message} /> : null  }

        </div>
    );
}

export default AddVideoModal