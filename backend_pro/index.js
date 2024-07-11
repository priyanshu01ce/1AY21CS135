const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;//port
const WINDOW_SIZE = 10;//window size
const TIMEOUT = 500;


let numberWindow = [];


async function fetchNumbers(type) {
    try {
        const response = await axios.get(`http://testserver/numbers/${type}`, { timeout: TIMEOUT });
        return response.data.numbers;
    } catch (error) {
        console.error(`Error fetching numbers: ${error.message}`);
        return [];
    }
}


function updateWindow(newNumbers) {
    newNumbers.forEach(num => {
        if (!numberWindow.includes(num)) {
            if (numberWindow.length >= WINDOW_SIZE) {
                numberWindow.shift(); // Remove  oldest number
            }
            numberWindow.push(num); // Add  new number
        }
    });
    const sum = numberWindow.reduce((acc, val) => acc + val, 0);
    const average = (sum / numberWindow.length).toFixed(2);
    return average;
}


app.get('/numbers/:type', async (req, res) => {
    const { type } = req.params;
    if (!['p', 'f', 'e', 'r'].includes(type)) {
        return res.status(400).json({ error: 'Invalid number type' });
    }

    const newNumbers = await fetchNumbers(type);
    const prevState = [...numberWindow];
    const average = updateWindow(newNumbers);
    const currState = [...numberWindow];

    res.json({
        numbers: newNumbers,
        windowPrevState: prevState,
        windowCurrState: currState,
        avg: average
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
