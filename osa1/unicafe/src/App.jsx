import { useState } from "react";

// oikea paikka komponentin määrittelyyn
const Statistics = (props) => {
    const Average = () => {
        const score = props.good + props.bad * -1;
        const amount = props.good + props.neutral + props.bad;
        const average = score / amount;

        return average;
    };

    const Amount = () => {
        return props.good + props.neutral + props.bad;
    };

    if (Amount() > 0) {
        return (
            <div>
                <h1>Statistics</h1>
                <p>good {props.good}</p>
                <p>neutral {props.neutral}</p>
                <p>bad {props.bad}</p>
                <p>all {props.good + props.neutral + props.bad}</p>
                <p>average {Average()}</p>
                <p>
                    positive{" "}
                    {(props.good / (props.good + props.neutral + props.bad)) *
                        100}{" "}
                    %
                </p>
            </div>
        );
    } else {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        );
    }
};

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h2>give feedback</h2>
            <button onClick={() => setGood(good + 1)}>Good</button>
            <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
            <button onClick={() => setBad(bad + 1)}>Bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
