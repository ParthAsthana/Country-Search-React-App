const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/country/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    const country = response.data[0];
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country information' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
