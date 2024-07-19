import { useState, useEffect } from "react";
import phonebookService from "./services/notes";
import "./index.css";

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

// this handles success banner
const Success = ({ message }) => {
    if (message === null) {
        return null;
    }

    return <div className="success">{message}</div>;
};

// this handles error banner
const ErrorMessage = ({ message }) => {
    if (message === null) {
        return null;
    }

    return <div className="error">{message}</div>;
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // this renders all the persons
    useEffect(() => {
        phonebookService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    // this is for handling adding a new person
    const addName = (event) => {
        event.preventDefault();

        if (persons.some((person) => person.name === newName)) {
            if (
                window.confirm(
                    newName +
                        " is already added to phonebook, replace the old number with a new one?"
                )
            ) {
                const found_person = persons.find(
                    (person) => person.name === newName
                );
                const changedPerson = { ...found_person, number: newNumber };
                phonebookService
                    .update(found_person.id, changedPerson)
                    .then((updatedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== found_person.id
                                    ? person
                                    : updatedPerson
                            )
                        );
                        setSuccessMessage(
                            "Modified " + changedPerson.name + " successfully"
                        );
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 3000);
                    })
                    .catch((error) => {
                        if (
                            error.response &&
                            error.response.data &&
                            error.response.data.error
                        ) {
                            setErrorMessage(error.response.data.error);
                        } else if (
                            error.response &&
                            error.response.status === 404
                        ) {
                            setErrorMessage(
                                "Information of " +
                                    changedPerson.name +
                                    " has already been removed from server"
                            );
                        } else {
                            setErrorMessage("An unexpected error occurred.");
                        }
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 3000);
                    });

                setNewNumber("");
            }
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
            };

            phonebookService
                .create(personObject)
                .then((returnedPerson) => {
                    setPersons(persons.concat(returnedPerson));
                    setNewName("");
                    setNewNumber("");

                    setSuccessMessage(
                        "Added " + returnedPerson.name + " successfully"
                    );
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000);
                })
                .catch((error) => {
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.error
                    ) {
                        setErrorMessage(error.response.data.error);
                    } else {
                        setErrorMessage("An unexpected error occurred.");
                    }
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000);
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
            phonebookService.http_delete(id).then((returnedPersons) => {
                setSuccessMessage(
                    "Deleted " + returnedPersons.name + " successfully"
                );
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);

                phonebookService.getAll().then((initialPersons) => {
                    setPersons(initialPersons);
                });
            });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Success message={successMessage} />
            <ErrorMessage message={errorMessage} />
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
