export default function Word( props) {
    const wordElements = props.word.map((letter, index) => {
        const styles = {};

        if (props.submitted) {
            if (props.word.includes(props.guesses[index]) && props.guesses[index] !== letter) {
                styles.backgroundColor = '#FFB703';
            } else if (props.word.includes(props.guesses[index]) && props.guesses[index] === letter) {
                styles.backgroundColor = '#4CAF50';
            } else {
                styles.backgroundColor = '#9E2A2B';
            }
        }

        return (
            <div className="letter" key={index} style={styles}>
                {props.guesses[index] !== '' ? props.guesses[index].toUpperCase() : ''}
            </div>
        )
    })
    return (
        <div className="word">
            {wordElements}
        </div>
    )
}