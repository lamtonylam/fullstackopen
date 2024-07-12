import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // this gets all countries
    useEffect(() => {
        if (searchTerm) {
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
                .then((response) => {
                    setCountries(response.data);
                });
        }
    }, [searchTerm]);

    // this handles the search form change
    const handleForm = (event) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    };

    // this filters the countries based on the form
    let countriesToShow = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // this is for the show button
    const showCountry = (country) => {
        setCountries([country]);
    };

    return (
        <div>
            <p>find countries</p>
            <input value={searchTerm} onChange={handleForm} />

            {/* this shows the one country */}
            {countries.length > 0 && countriesToShow.length === 1 ? (
                <div key={countriesToShow[0].name.common}>
                    <h1>{countriesToShow[0].name.common}</h1>
                    <p>capital {countriesToShow[0].capital} </p>
                    <p>area {countriesToShow[0].area}</p>
                    <p>
                        <b>languages</b>
                    </p>
                    {Object.values(countriesToShow[0].languages).map(
                        (value, index) => {
                            return <li key={index}>{value}</li>;
                        }
                    )}
                    <br></br>
                    <img src={countriesToShow[0].flags.png} height="100px" />
                </div>
            ) : null}

            {/* this shows when there are too many countries to shows */}
            {countries.length > 0 &&
            countriesToShow.length > 10 &&
            searchTerm ? (
                <p>too many countries</p>
            ) : null}

            {/* this shows countries when there are less than 10 */}
            {countries.length > 0 &&
            countriesToShow.length <= 10 &&
            countriesToShow.length !== 1 ? (
                <ul>
                    {countriesToShow.map((country) => (
                        <div key={country.name.common}>
                            <li>{country.name.common}</li>
                            <button
                                value={country.name.common}
                                onClick={() => showCountry(country)}
                            >
                                show
                            </button>
                        </div>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default App;
