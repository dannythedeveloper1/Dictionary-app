import axios from "axios";

const apiKey =  process.env.REACT_APP_API_KEY ;
export const dictionary  = (word) => {
    const options = {
        method: 'GET',
        url:`https://dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${apiKey}`,
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

//main search

// https://dictionaryapi.com/api/v3/references/sd2/json/dog?key=6e7e2a20-de9b-4c56-adbc-d26f52a5670e

//audio

// https://media.merriam-webster.com/audio/prons/[language_code]/[country_code]/[format]/[subdirectory]/[base filename].[format]
