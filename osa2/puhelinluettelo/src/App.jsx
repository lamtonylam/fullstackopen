import { useState, useEffect } from "react";
import noteService from "./services/notes";
import notes from "./services/notes";

// this is used to filter contacts
const Filter = (props) => {
    return <input value={props.filter} onChange={props.handleFilterChange} />;
};

// this handles the person form
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

// this renders all the persons in the phonebook
const Persons = (props) => {
    const personsToShow = props.persons;
    return (
        <div>
            <h2>Numbers</h2>
            {personsToShow.map((person) => (
                <div key={person.name}>
                    <p>
                        {person.name} {person.number}{" "}
                        <button
                            onClick={() =>
                                props.deletenote(person.id, person.name)
                            }
                        >
                            delete
                        </button>
                    </p>
                </div>
            ))}
        </div>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    // this renders all the persons
    useEffect(() => {
        noteService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
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

            noteService.create(personObject).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewNumber("");
            });
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

    const deletenote = (id, name) => {
        if (window.confirm("Delete " + name + " ?")) {
            noteService.http_delete(id).then((returnedPersons) => {
                console.log("deleted", returnedPersons.name);

                noteService.getAll().then((initialPersons) => {
                    setPersons(initialPersons);
                });
            });
        }
    };

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
            <Persons persons={personsToShow} deletenote={deletenote} />
        </div>
    );
};

export default App;
