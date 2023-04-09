import React, { useState } from 'react';
import axios from 'axios';
import './CountrySearch.css';

const CountrySearch = () => {
  const [input, setInput] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(`http://localhost:5001/country/${input}`);
      
      if (response.status === 404) {
        setError(response.data.error);
      } else {
        setCountryInfo(response.data);
      }
    } catch (err) {
      console.error(err);
      setError('Error fetching country information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Country Search</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Country name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {countryInfo && (
        <div className="country-info">
          <div className="card">
            <img src={countryInfo.flags.png} alt={`${countryInfo.name.common} flag`} />
          </div>
          <div className="card">
            <h2>{countryInfo.name.common}</h2>
            <p>Capital: {countryInfo.capital[0]}</p>
          </div>
          <div className="card">
            <p>Region: {countryInfo.region}</p>
            <p>Population: {countryInfo.population.toLocaleString()}</p>
          </div>
          <div className="card">
            <p>Area: {countryInfo.area.toLocaleString()} km²</p>
            <p>Currencies: {Object.values(countryInfo.currencies).map((currency) => currency.name).join(', ')}</p>
          </div>
          <div className="card">
            <p>Languages: {Object.values(countryInfo.languages).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
