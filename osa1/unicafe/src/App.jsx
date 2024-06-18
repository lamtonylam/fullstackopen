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

    const StatisticLine = (props) => {
        if (props.text === "good") {
            return props.value;
        }
        if (props.text === "neutral") {
            return props.value;
        }
        if (props.text == "bad") {
            return props.value;
        }
    };

    if (Amount() > 0) {
        return (
            <div>
                <h1>Statistics</h1>

                <table>
                    <tbody>
                        <tr>
                            <td>good</td>
                            <td>
                                <StatisticLine text="good" value={props.good} />
                            </td>
                        </tr>
                        <tr>
                            <td>neutral</td>
                            <td>
                                <StatisticLine
                                    text="neutral"
                                    value={props.neutral}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>bad</td>
                            <td>
                                <StatisticLine text="bad" value={props.bad} />
                            </td>
                        </tr>
                        <tr>
                            <td>all</td>
                            <td>{props.good + props.neutral + props.bad}</td>
                        </tr>
                        <tr>
                            <td>average</td>
                            <td>{Average()}</td>
                        </tr>
                        <tr>
                            <td>positive</td>
                            <td>
                                {(props.good /
                                    (props.good + props.neutral + props.bad)) *
                                    100}{" "}
                                %
                            </td>
                        </tr>
                    </tbody>
                </table>
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

    const Button = (props) => {
        const value = props.text;
        if (value === "good") {
            return <button onClick={() => setGood(good + 1)}>Good</button>;
        }
        if (value === "neutral") {
            return (
                <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
            );
        }
        if (value === "bad") {
            return <button onClick={() => setBad(bad + 1)}>Bad</button>;
        }
    };

    return (
        <div>
            <h2>give feedback</h2>
            <Button text="good"></Button>
            <Button text="neutral"></Button>
            <button onClick={() => setBad(bad + 1)}>Bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
