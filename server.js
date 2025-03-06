const express = require('express');

const app = express();

// URL Parameters

// 1. Be Polite, Greet the User
app.get('/greeting/:username', (req, res) => {
    res.send(`What a delight it is to see you once more ${req.params.username}!`);
})

// 2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    let maxNumber = parseInt(req.params.number)

    if (!isNaN(maxNumber)) {
        let result = Math.floor(Math.random() * (maxNumber + 1)); 
        res.send(`You rolled a ${result}!`);
    } else {
        res.send(`You must specify a number.`);
    }
})


// 3. I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    let index = parseInt(req.params.index);

    if (index > collectibles.length) {
        res.send(`This item is not yet in stock. Check back soon!`);

    } else {
        let item = collectibles[index];
        res.send(`So, you want the ${item.name}? For $${item.price}, it can be yours!`);
    }
})

// URL Queries

// 4. Filter Shoes by Query Parameters
// Task: Create a route /shoes that filters the list of shoes based on query parameters.
// Query Parameters:
// -- min-price: Excludes shoes below this price.
// -- max-price: Excludes shoes above this price.
// -- type: Shows only shoes of the specified type.
// -- No parameters: Responds with the full list of shoes.
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let minPrice = parseInt(req.query["min-price"]);
    let maxPrice = parseInt(req.query["max-price"]);
    let type = req.query.type;

    let filteredShoes = shoes.filter(shoe => {
        return (
            (isNaN(minPrice) || shoe.price >= minPrice) &&
            (isNaN(maxPrice) || shoe.price <= maxPrice) &&
            (!type || shoe.type === type)
        );
    });
    
    res.send(filteredShoes);
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})