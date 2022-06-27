import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { IoAddCircleSharp } from 'react-icons/io5'

import { db } from '../../firebase'
import { format, getTime } from 'date-fns'

function AddMulticam(props) {

    const navigate = useNavigate()

    const [camCount, setCamCount] = useState(['cam'])
    const [form, setForm] = useState({
        titre: '',
        date: '',
        timestamp: '',
        source: []
    })
    const [cam, setCam] = useState({
        auteur: '',
        lien: ''
    })

    const multiForm = () => {

        return Object.keys( camCount ).map( key =>
            
            <div id="multi-form" key={key}>

                <div className="form-group">
                    <label htmlFor={`auteur-${Number(key)+1}`}>{`Auteur ${Number(key)+1}`}</label>
                    <input 
                        type="text" 
                        id={`auteur-${Number(key)+1}`}
                        onChange={ e => { changeCam(e, 'auteur') } }
                        disabled={ Number(key)+1 === camCount.length ? null :'disabled' }
                    />
                </div>

                <div className="form-group">
                    <label htmlFor={`lien-${Number(key)+1}`}>{`Lien ${Number(key)+1}`}</label>
                    <input 
                        type="text" 
                        id={`lien-${Number(key)+1}`} 
                        onChange={ e => { changeCam(e, 'lien') } }
                        disabled={ Number(key)+1 === camCount.length ? null :'disabled' }
                    />
                </div>

            </div>
            
        )

    }

    const addCam = () => {
        let newCamCount = [...camCount]
        newCamCount.push('cam')

        const newForm = {...form}
        form.source.push(cam)

        setForm( newForm )
        setCamCount( newCamCount )
        setCam({
            auteur: '',
            lien: ''
        })
    }

    const changeTitre = e => {
        let newForm = {...form}
        newForm.titre = e.target.value
        setForm( newForm )
    }

    const changeCam = (e, target) => {
        let newCam = {...cam}
        newCam[target] = e.target.value
        setCam( newCam)      
    }

    const submitMultiCam = e => {
        e.preventDefault()

        let newForm = {...form}
        const now = new Date()
        const date = format(now, 'dd/MM/yyyy')
        const timestamp = getTime(now)

        newForm.date = date
        newForm.timestamp = timestamp
        newForm.source.push(cam)

        if ( newForm.titre !== '' ) {
            db.collection('studio').add( newForm )
            navigate('/studio')
        } else {
            props.sendToast('danger', 'Le champ "Titre" est vide.', 'Donnez un titre à la vidéo.')
        }

    }

    return (
        <main id="multi-cam">

            <div className="roster-header admin">
                <h1>Video multi cam</h1>
            </div>

            <form onSubmit={submitMultiCam}>

                <div className="form-group" id="multi-cam-titre">
                    <label htmlFor="titre">Titre</label>
                    <input type="text" id="titre" onChange={changeTitre} />
                </div>

                { multiForm() }

                <div className="form-group button-group" id="add-cam">
                    <IoAddCircleSharp onClick={addCam} />
                    <Link to="/studio" className="button invert">Annuler</Link>
                    <button type="submit">Valider</button>
                </div>

            </form>

        </main>
    );
}

export default AddMulticam