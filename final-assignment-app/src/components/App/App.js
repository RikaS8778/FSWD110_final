import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import CountryCards from '../CountryCards/CountryCards';
import CurrencyExchanger from '../CurrencyExchanger/CurrencyExchanger';

function App() {

  return (
    <div className="App">
      <Router>
        <Link className="links" to="/">
          Countries
        </Link>

        <Routes>
          <Route path="/" Component={CountryCards} />
          <Route path="/currency-rate/:currencyCd" Component={CurrencyExchanger} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
