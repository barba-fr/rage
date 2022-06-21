function PlayerCard(props) {
    return (
        <div className="card player-card">
            <div className="class-icon">
                <img src={require(`../../assets/class-icons/warrior.png`).default} alt="druid icon" />
            </div>
            <div className="card-player-body">
                <h3 className="player-name">Goury</h3>
                <p className="player-spe">Protection</p>
            </div>
        </div>
    );
}

export default PlayerCard