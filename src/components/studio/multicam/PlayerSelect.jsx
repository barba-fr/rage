function PlayerSelect(props) {

    const selected = Number(props.povId) === Number(props.selected) ? 'selected' : 'not-selected'

    return (
        <div className={`player-card-wrapper ${selected}`} onClick={() => props.isSelected(props.povId)}>

            <div className="card player-card">

                <div className="class-icon">
                    <img src={require(`../../../assets/class-icons/${ props.data.class }.png`).default} alt="druid icon" />
                </div>
                <div className="card-player-body">
                    <h3 className="player-name">{ props.data.name }</h3>
                    <p className="player-spe">{ props.data.spe }</p>
                </div>
            </div>

        </div>
    );
}

export default PlayerSelect