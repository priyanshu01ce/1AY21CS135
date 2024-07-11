const axios = require('axios'); 
const Slide = require('../models/slide');  
require('dotenv').config();

const windowSize = parseInt(process.env.WINDOW_SIZE, 10);
const testServerUrl = process.env.TEST_SERVER_URL;
const requestTimeout = parseInt(process.env.REQUEST_TIMEOUT, 10);
const window = new Slide(windowSize);

exports.getNumber = async (req, res) => {
    try {
        const id = req.params.numberid;
        const response = await axios.get(`${testServerUrl}/${id}`, { timeout: requestTimeout }); 

        if (response.data && Array.isArray(response.data.numbers)) {
            const uniqueNumbers = [...new Set(response.data.numbers)];
            uniqueNumbers.forEach(num => window.addNumber(num));

            res.json({
                numbers: uniqueNumbers,
                windowPrevState: window.getPreviousState(),
                windowCurrState: window.getCurrentState(),
                avg: window.getAverage().toFixed(2), 
            });
        } else {
            res.status(500).json({
                error: 'Invalid response from server' 
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
