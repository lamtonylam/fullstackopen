import { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
    return <input value={props.filter} onChange={props.handleFilterChange} />;
};

const Personform = (props) => {
    return (
        <form onSubmit={props.addName}>
            <div>
                name:
                <input
                    value={props.newName}
                    onChange={props.handleNameChange}
                />
            </div>
            <div>
                number:
                <input
                    value={props.newNumber}
                    onChange={props.handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

const Persons = (props) => {
    const personsToShow = props.persons;
    return (
        <div>
            <h2>Numbers</h2>
            {personsToShow.map((person) => (
                <p key={person.name}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        console.log("effect");
        axios.get("http://localhost:3001/persons").then((response) => {
            console.log("promise fulfilled");
            setPersons(response.data);
        });
    }, []);

    const addName = (event) => {
        event.preventDefault();

        if (persons.some((person) => person.name == newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
            };
            
            axios
                .post("http://localhost:3001/persons", personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName("")
                    setNewNumber("")
                })
        }
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const personsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            Filter:
            <Filter
                persons={persons}
                filter={filter}
                handleFilterChange={handleFilterChange}
                personsToShow={personsToShow}
            />
            <h2>add a new</h2>
            <Personform
                addName={addName}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
