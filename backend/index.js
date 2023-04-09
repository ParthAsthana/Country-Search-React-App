const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

const fetchCountry = async (countryName) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    console.error(`No data found for country: ${countryName}`);
    return null;
  } catch (error) {
    console.error(`Error fetching country data: ${error}`);
    console.error(`Error details: ${JSON.stringify(error.response.data)}`);
    return null;
  }
};

app.get('/country/:name', async (req, res) => {
  console.log(`Request for country: ${req.params.name}`);
  try {
    const country = await fetchCountry(req.params.name);
    if (!country) {
      console.log(`Country not found: ${req.params.name}`);
      return res.status(404).json({ error: 'Country not found.' });
    }
    console.log(`Country data: ${JSON.stringify(country)}`);
    res.json(country);
  } catch (error) {
    console.error(`Error fetching country data: ${error}`);
    res.status(500).json({ error: 'An error occurred while fetching the country information. Please try again later.' });
  }
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
