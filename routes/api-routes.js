const router = require('express').Router();
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');
const bcrypt=require('bcryptjs')
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
            .catch(err => console.error(err))
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

router.get("/api/dictionary/:searchTerm", async (req, res) => {
    try {
        // res.json('hello world');
        console.log('dictionary');
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

router.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })

        res.json({ status: "ok" })
    } catch {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

router.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        return { status: 'error', error: "Invalid login" };
    }

    const isPasswordValid = await bcrypt.compare(req.body.password,user.password)

    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, 'secret123')
        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

router.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email;
        const user = await User.findOne({ email: email })
        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }

})

router.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email;
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )
        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }

})

module.exports = router;