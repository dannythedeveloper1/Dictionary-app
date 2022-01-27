const router = require('express').Router();
require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.DIC_API_KEY;

const dictionary = (word) => {
    return (axios.get(`https://dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${apiKey}`)
        .then(res => {
            console.log('hello');
            return res.data
        })
        .catch(error => console.log(error))
    );
}

const numberConverter = (number) => {
    // console.log(number);
    return (
        axios.get(`https://api.math.tools/numbers/cardinal?number=${number}`)
            .then(res => {
                // console.log(res);
                return res.data.contents
            })
        .catch(err=>console.error(err))
    );
}


// const dictionary = (word) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const request = await axios.get(
//                 `https://dictionaryapi.com/api/v3/references/sd2/json/${word}?key=${apiKey}`
//             );
//             // console.log(request.data);
//             resolve(request.data);
//         } catch (err) {
//             reject(err);
//         }
//     });
// };

router.get("/api/:searchTerm", async (req, res) => {
    try {
        // res.json('hello world');
        console.log('backend');
        res.json(await dictionary(req.params.searchTerm));
    } catch (err) {
        res.json(err);
    }
});

router.get("/api/num/:number", async (req, res) => {
    try {
        console.log("number");
        res.json(await numberConverter(req.params.number));
    } catch (err) {
        res.json(err);
    }
});

router.post('/api/register', (req, res) => {
    console.log(req.body);
    res.json({status:'ok'})
})

module.exports = router;