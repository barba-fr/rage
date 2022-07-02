import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate  } from 'react-router-dom'

import { db } from '../../firebase'
import fr from '../../lang-fr'

function RosterAdd(props) {
    
    const params = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        class: '',
        name: '',
        role: '',
        spe: '',
    })
    const [classesOfRole, setClassesOfRole] = useState([])

    useEffect( () => {

        const newForm = {...form}
        newForm.role = params.role
        newForm.class = allRoles[params.role][0].class

        let allClasses = allRoles[params.role]
        allClasses = allClasses.filter( i => i.class === allRoles[params.role][0].class )
        const spe = allClasses[0].spe
        newForm.spe = spe[0]

        setForm( newForm )

        let classes = allRoles[params.role]
        setClassesOfRole(classes);

    }, [form] )

    const allRoles = {
        tank: [
            {
                class: 'warrior',
                spe: ['protection'],
            },
            {
                class: 'paladin',
                spe: ['protection'],
            },
            {
                class: 'druid',
                spe: ['féral'],
            }
        ],
        heal: [
            {
                class: 'priest',
                spe: ['sacré', 'discipline'],
            },
            {
                class: 'shaman',
                spe: ['restauration'],
            },
            {
                class: 'druid',
                spe: ['restauration'],
            },
            {
                class : 'paladin',
                spe: ['sacré']
            }
        ],
        cac : [
            {
                class: 'shaman',
                spe: ['amelioration']
            },
            {
                class: 'druid',
                spe: ['féral']
            },
            {
                class: 'warrior',
                spe: ['amelioration', 'fureur']
            },
            {
                class: 'paladin',
                spe: ['vindicte']
            },
            {
                class: 'rogue',
                spe: ['assassinat', 'combat', 'finesse']
            },
        ],
        range : [
            {
                class: 'shaman',
                spe: ['élémentaire']
            },
            {
                class: 'hunter',
                spe: ['BM', 'précision', 'survie']
            },
            {
                class: 'warlock',
                spe: ['affliction', 'démonologie', 'destruction']
            },
            {
                class: 'druid',
                spe: ['équilibre']
            },
            {
                class: 'mage',
                spe: ['arcane', 'feu', 'givre']
            },
            {
                class: 'priest',
                spe: ['ombre']
            },
            
        ]
    }

    const changeName = e => {
        let newForm = {...form}
        newForm.name = e.target.value
        setForm( newForm )
    }

    const changeClass = e => {
        let newForm = {...form}
        newForm.class = e.target.value

        let allClasses = allRoles[params.role]
        allClasses = allClasses.filter( i => i.class === e.target.value )
        const spe = allClasses[0].spe
        newForm.spe = spe[0]

        setForm( newForm )
    }

    const changeSpe = e => {
        let newForm = {...form}
        newForm.spe = e.target.value
        setForm( newForm )
    }

    const optionsClass = () => {
        return Object.keys( classesOfRole ).map( key => <option key={key} value={classesOfRole[key].class}>{fr[classesOfRole[key].class]}</option> )
    }

    const optionsSpe = () => {
        let allClasses = allRoles[params.role]
        if ( form.class !== '' ) {
            allClasses = allClasses.filter( i => i.class === form.class )
            const spe = allClasses[0].spe
            return Object.keys( spe ).map( key => <option key={key} value={spe[key]} >{spe[key]}</option> )
        }
    }

    const submitPlayer = e => {
        e.preventDefault()

        const newPlayer = {...form}
        if ( newPlayer.name !== '' ) {

            db.collection('roster').add(newPlayer)
            navigate('/roster', {replace: true})

        } else {

            props.sendToast('danger', 'Erreur', 'Le champ "Nom" est vide.')

        }
    }

    return (
        <main id="roster">

            <div className="roster-header admin">
                <h1>Ajouter un { params.role }</h1>
            </div>

           <form id="add-player" onSubmit={submitPlayer}>

                <div className="form-group">
                    <label htmlFor="player-name">Nom</label>
                    <input type="text" id="player-name" onChange={changeName} />
                </div>

                <div className="form-group">
                    <label htmlFor="player-class">Classe</label>
                    <select id="player-class" onChange={changeClass}>
                        { optionsClass() }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="player-spe">Spécialisation</label>
                    <select id="player-spe" onChange={changeSpe}>
                        { optionsSpe() }
                    </select>
                </div>

                <div className="form-group button-group">
                    <Link to="/roster" className='button invert'>Annuler</Link>
                    <button className='primary' type="submit">Valider</button>
                </div>

           </form>

        </main>
    );
}

export default RosterAdd