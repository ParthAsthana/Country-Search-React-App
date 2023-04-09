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
    return null;
  } catch (error) {
    console.error(`Error fetching country data: ${error}`);
    return null;
  }
};

app.get('/country/:name', async (req, res) => {
  try {
    const country = await fetchCountry(req.params.name);
    if (!country) {
      return res.status(404).json({ error: 'Country not found.' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the country information. Please try again later.' });
  }
});
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
