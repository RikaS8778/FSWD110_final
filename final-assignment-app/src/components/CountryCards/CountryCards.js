import './CountryCards.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Country from '../Country/Country';

const CountryCards = () => {
    const BASE_URL = "https://restcountries.com/v3.1";
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ratesList, setRatesList] = useState([]);

    useEffect(() => {
        const fetchRatesAndCountries = async () => {
            try {
                const ratesResponse = await axios.get('https://api.frankfurter.dev/v1/latest');
                setRatesList(Object.keys(ratesResponse.data.rates));

                const countriesResponse = await axios.get(`${BASE_URL}/all`);
                setData(
                    countriesResponse.data.sort((a, b) => {
                        return a.name.common > b.name.common;
                    })
                );
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRatesAndCountries();
    }, []);




    return (
        <div>
            <div>{isLoading ? <p>Loading...</p> : <p>Total Countries Recorder: {data.length}</p>}</div>

            <div className="Countries">
                {data.map((country, index) => {
                    return <Country key={index} country={country} ratesList={ratesList} />;
                })}
            </div>
        </div>
    );
}

export default CountryCards;


