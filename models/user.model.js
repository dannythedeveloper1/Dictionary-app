const mongoose = require('mongoose');
const User = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        quote: { type: String },
    },
    { collection: 'user' }
)

const model = mongoose.model('User', User)
module.exports = model;

//     < body >
//     <main>
//         <nav>
//             <h1>hello</h1>
//             <h1>world</h1>
//         </nav>
//     </ main> </main>
// </ body >

// nav {
//     background - color: D#9c27b0;
//     width: 100vw;
//     height: 10vh;
//     display: flex;
//     justify - content: flex - end;
// .box {
//         width: 50vw;
//         height: 10vh;
//         display: flex;
//         justify - content: space - between;
//         align - items: center;
//     }
// h1 {
//         color: "white";
//     }