import './CurrencyExchanger.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CurrencyExchanger = () => {
    const { currencyCd } = useParams();
    const [compCurrency, setCompCurrency] = useState('USD');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState('');
    const [rateList, setRateList] = useState(['USD', 'CAD', 'EUR', 'BGN', 'AUD', 'CNY', 'JPY']);

    const BASE_URL = 'https://api.frankfurter.dev/v1/latest';

    function convert(from, to, amount) {
        fetch(`${BASE_URL}?base=${from}&symbols=${to}`)
            .then((res) => res.json())
            .then((data) => {
                setConvertedAmount((amount * data.rates[to]).toFixed(2));
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (currencyCd === compCurrency) {
            const updatedRateList = rateList.filter(rateCurrency => rateCurrency !== compCurrency);
            setRateList(updatedRateList);
            setCompCurrency(updatedRateList[0]);
        } else {
            convert(currencyCd, compCurrency, amount);
        }
    }, [currencyCd, compCurrency]);

    const changeVal = (e) => {
        setAmount(e.target.value);
    }

    return (
        <div className='CurrencyExchanger'>
            <div>
                <h3>Rate Checker</h3>
                <label>FROM: {currencyCd}</label>
                <input type='number' value={amount} onChange={changeVal} />

                <label>TO: </label>
                <select value={compCurrency} onChange={(e) => setCompCurrency(e.target.value)}>
                    {rateList.map((rate, index) => (
                        <option key={index} value={rate}>
                            {rate}
                        </option>
                    ))}
                </select>

                <button className='ConvertButton' onClick={() => convert(currencyCd, compCurrency, amount)}>Convert</button>
            </div>

            <div>
                <p>{amount} {currencyCd}  =  {convertedAmount} {compCurrency}</p>
            </div>
        </div>
    );
}

export default CurrencyExchanger;