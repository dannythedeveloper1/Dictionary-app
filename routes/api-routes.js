const router = require('express').Router();
require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.DIC_API_KEY;

export const dictionary = (word) => {
    const options = {
        method: 'GET',
        url: `https://dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${apiKey}`,
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}