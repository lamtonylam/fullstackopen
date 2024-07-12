import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (searchTerm) {
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
                .then((response) => {
                    setCountries(response.data);
                });
        }
    }, [searchTerm]);

    const handleForm = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    };

    let countriesToShow = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <p>find countries</p>
            <input value={searchTerm} onChange={handleForm} />

            {countries.length > 0 && countriesToShow.length === 1 ? (
                <div key={countriesToShow[0].name.common}>
                    <h1>{countriesToShow[0].name.common}</h1>
                    <p>capital {countriesToShow[0].capital} </p>
                    <p>area {countriesToShow[0].area}</p>
                    <p><b>languages</b></p>
                    {Object.values(countriesToShow[0].languages).map(
                        (value, index) => {
                            return <li key={index}>{value}</li>;
                        }
                    )}
                    <br></br>
                    <img src={countriesToShow[0].flags.png} height="100px" />
                </div>
            ) : null}

            {countries.length > 0 &&
            countriesToShow.length > 10 &&
            searchTerm ? (
                <p>too many countries</p>
            ) : null}

            {countries.length > 0 &&
            countriesToShow.length <= 10 &&
            countriesToShow.length !== 1 ? (
                <ul>
                    {countriesToShow.map((country) => (
                        <li key={country.name.common}>{country.name.common}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default App;
