import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { useField } from "./hooks";

const Menu = () => {
    const padding = {
        paddingRight: 5,
    };
    return (
        <div>
            <a href="/" style={padding}>
                anecdotes
            </a>
            <a href="create" style={padding}>
                create new
            </a>
            <a href="about" style={padding}>
                about
            </a>
        </div>
    );
};

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map((anecdote) => (
                <li key={anecdote.id}>
                    <Link to={`/anecdote/${anecdote.id}`}>
                        {anecdote.content}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>
            An anecdote is a brief, revealing account of an individual person or
            an incident. Occasionally humorous, anecdotes differ from jokes
            because their primary purpose is not simply to provoke laughter but
            to reveal a truth more general than the brief tale itself, such as
            to characterize a person by delineating a specific quirk or trait,
            to communicate an abstract idea about a person, place, or thing
            through the concrete details of a short narrative. An anecdote is "a
            story with a point."
        </em>

        <p>
            Software engineering is full of excellent anecdotes, at this app you
            can find the best and add more.
        </p>
    </div>
);

const Footer = () => (
    <div>
        Anecdote app for{" "}
        <a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
        <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
            https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
        </a>{" "}
        for the source code.
    </div>
);

const CreateNew = (props) => {
    const navigate = useNavigate();

    // remove reset from spread syntax as its own
    const { reset: resetContent, ...content } = useField("text");
    const { reset: resetAuthor, ...author } = useField("text");
    const { reset: resetInfo, ...info } = useField("text");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        });
        navigate("/");
    };

    const handleReset = () => {
        resetContent();
        resetAuthor();
        resetInfo();
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button>create</button>
            </form>
            <button onClick={handleReset}>reset</button>
        </div>
    );
};

const Anecdote = ({ anecodtes }) => {
    const id = useParams().id;
    const anecodte = anecodtes.find((n) => n.id === Number(id));
    return (
        <div>
            <h2>{anecodte.content}</h2> <div>has {anecodte.votes} votes</div>
            <br></br>
            <div>
                for more info see <a href={anecodte.info}>{anecodte.info}</a>
            </div>
            <br></br>
        </div>
    );
};

const Notification = ({ notification }) => {
    if (notification) {
        return <>{notification}</>;
    } else {
        return <></>;
    }
};

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: "If it hurts, do it more often",
            author: "Jez Humble",
            info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
            votes: 0,
            id: 1,
        },
        {
            content: "Premature optimization is the root of all evil",
            author: "Donald Knuth",
            info: "http://wiki.c2.com/?PrematureOptimization",
            votes: 0,
            id: 2,
        },
    ]);

    const [notification, setNotification] = useState("");

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
        setNotification(`a new anecdote ${anecdote.content} created!`);
        setTimeout(() => {
            setNotification("");
        }, 5000);
    };

    const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    };

    return (
        <Router>
            <div>
                <h1>Software anecdotes</h1> <Menu />
                <Notification notification={notification} />
                <Routes>
                    <Route
                        path="/anecdote/:id"
                        element={<Anecdote anecodtes={anecdotes} />}
                    />
                    <Route
                        path="/"
                        element={<AnecdoteList anecdotes={anecdotes} />}
                    />
                    <Route
                        path="/create"
                        element={<CreateNew addNew={addNew} />}
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
