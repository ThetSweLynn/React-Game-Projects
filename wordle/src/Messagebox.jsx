export default function Messagebox (props) {
    return <div className="message-box">
        <h2>{props.status === 'won' ? 'Congratulations!' : 'Game Over!'} </h2>
        <br />
        <button onClick={props.restart}>New Game</button>
    </div>
}