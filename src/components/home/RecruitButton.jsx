import React from 'react';

class RecruitButton extends React.Component {

    openRecruitModal = roster => {
        this.props.openRecruitModal( this.props.roster )
    }

    render(){
        return (
            <button type="button" onClick={this.openRecruitModal}>Postuler</button>
        );
    }
}

export default RecruitButton