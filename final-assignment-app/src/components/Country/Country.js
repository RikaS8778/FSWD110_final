import { useState, useEffect } from 'react';
import './Country.css';

const Country = (props) => {

    const [currencyCd, setcurrencyCd] = useState('');

    useEffect(() => {
        const currencies = props.country.currencies;
        if (currencies) {
            const objCurrencyCd = Object.keys(currencies);
            const strCurrencyCd = Object.values(objCurrencyCd)[0];
            let flg = false;
            props.ratesList.map((rate, index) => {
                if (rate === strCurrencyCd) {
                    return flg = true;
                }
            })
            if (flg) {
                setcurrencyCd(strCurrencyCd);
            }
        }
    }, []);

    return (
        <div className="Country">
            <img src={props.country.flags.svg} alt="Country Flag" />
            <p>{props.country.continents[0]}</p>

            <a href={props.country.maps.googleMaps} target="_blank">
                Map
            </a>
            {currencyCd ? <div className='currencyCd'>Currency Cord: <a href={`/currency-rate/${currencyCd}`}>{currencyCd}</a></div> : ''}
        </div>
    );
}

export default Country;