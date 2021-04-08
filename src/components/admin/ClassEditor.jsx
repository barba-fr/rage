import React from 'react';
import { IoCheckbox, IoSquare, IoClose } from 'react-icons/io5';
import { db } from '../../firebase';

class ClassEditor extends React.Component {

    state = {
        recruitment: {}
    }

    _isMounted = false;

    componentDidMount(){

        this._isMounted = true;

        db.collection( this.props.data.roster ).doc('recruitment').collection(this.props.data.wowClass).doc('spe').onSnapshot( doc => {
            if ( this._isMounted ) {
                this.setState({ recruitment: doc.data() })
            }
        } )

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleAllClass = () => {
        const toggle = this.state.recruitment.allClass === true ? false : true;
        db.collection( this.props.data.roster ).doc('recruitment').collection(this.props.data.wowClass).doc('spe').set({
            allClass: toggle
        }, {merge: true})
    }

    changeValue = (spe, e) => {

        let recruitment = {...this.state.recruitment}
        recruitment[spe] = e.target.value;

        db.collection( this.props.data.roster ).doc('recruitment').collection(this.props.data.wowClass).doc('spe').set({
            [spe]: Number(e.target.value)
        }, {merge: true})

    }

    stopPropagation = e => {
        e.stopPropagation();
    }
    
    render(){

        let onlySpe = {...this.state.recruitment}
        delete onlySpe.allClass

        let inputCss
        if (this.state.recruitment) {
            inputCss = this.state.recruitment.allClass === true ? "faded" : null;
        }

        const inputs = Object.keys( onlySpe ).map(key =>
            <div key={key} className={`form-group inline ${inputCss}`} >
                <input 
                    type="number"
                    min="0"
                    name={key} 
                    value={this.state.recruitment[key]} 
                    disabled={ this.state.recruitment.allClass === true ? "disabled" : null }
                    onChange={ e => this.changeValue(key, e) } 
                />
                <label>{ key }</label>
            </div>
        )

        return (
            <div className={`overlay ${this.props.data.roster} ${this.props.isClosing}`} id="class-editor" onClick={this.props.closeClassEditor}>
                <div className="box" onClick={this.stopPropagation}>

                    <IoClose id="close-class-editor" onClick={this.props.closeClassEditor}/>
                    
                    <div id="class-editor-header">
                        <div className="class-icon">
                            <img src={require(`../../assets/class-icons/${ this.props.data.wowClass }.png`).default} alt={ `${ this.props.wowClass } icon` }/>
                        </div>
                        <h2>{ this.props.data.roster }</h2>
                    </div>

                    <form id="class-editor-body">
                        { inputs }
                        <div className="form-group inline">
                            { this.state.recruitment && this.state.recruitment.allClass === false ? <IoSquare onClick={this.toggleAllClass} /> : <IoCheckbox onClick={this.toggleAllClass} /> }                         
                            <label>Ouvert à toutes les spés</label>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}

export default ClassEditor