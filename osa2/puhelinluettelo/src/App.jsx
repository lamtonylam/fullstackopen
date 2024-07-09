import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);

    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    const addName = (event) => {
        event.preventDefault();

        if (persons.some((person) => person.name == newName)) {
            alert(`${newName} is already added to phonebook`);
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
            };

            setPersons(persons.concat(personObject));
            setNewName("");
            setNewNumber("");
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
            <input value={filter} onChange={handleFilterChange}></input>
            <h2>add a new</h2>
            <form onSubmit={addName}>
                <div>
                    name:
                    <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <div>
                <h2>Numbers</h2>
                {personsToShow.map((person) => (
                    <p key={person.name}>
                        {person.name} {person.number}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default App;
