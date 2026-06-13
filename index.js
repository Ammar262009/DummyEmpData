// Generate a dummy data in this format in a collection called employees in a db called company

// {
//     name: "Harry",
//     salary: 45000000,
//     language: "Python",
//     city: "New York",
//     isManager: 1
// }

// Generate 10 such records when a button called generate data is clicked!
// Create an Express app with mongoose to acheive it
// Everytime the button is clicked, you should clear the collection 


const express = require('express');
const sql = require('mysql2')
const app = express();
const port = 3000;



const con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hello@123",
    database: 'employees'
});

const generateData = () => {
    let namearr = ['harry', 'Ammar', 'Peter', 'Normon']
    let languagearr = ['Python', 'Java', 'C', 'C++', 'Ruby']
    let cityarr = ['Pune', 'New York', 'Mumbai', 'Delhi', 'Bangluru']
    let salary = Math.floor(Math.random() * (98000 - 10000) + 10000)
    let isManager;
    let isManagerNum = Math.floor(Math.random() * (10 - 0) + 0)

    let name = namearr[Math.floor(Math.random() * namearr.length)]
    let language = languagearr[Math.floor(Math.random() * languagearr.length)]
    let city = cityarr[Math.floor(Math.random() * cityarr.length)]


    if (isManagerNum <= 5) {
        isManager = 1
    }
    else {
        isManager = 0
    }

    let arr = []
    arr.push(name, salary, language, city, isManager)
    return arr
}

let data = []
const tenDummyData = () => {
    for (let i = 0; i < 10; i++) {
        data.push(generateData())
    }

    con.query('INSERT INTO employees (name, salary, language, city, isManager) VALUES ?', [data], function (err, result, fields) {
        if (err) {
            console.error('Error inserting data:', err);
            return;
        }
        console.log('Rows affected:', result.affectedRows);
    })
    data = []
}

// console.log(data);


// con.query('DELETE FROM employees', [data], function (err, result, fields) {
//     if (err) {
//         console.error('Error inserting data:', err);
//         return;
//     }
//     console.log('Rows affected:', result.affectedRows);
// })
app.get('/', (req, res) => {
    res.sendFile('templates/index.html', { root: __dirname });
});

app.post('/', (req, res) => {
    let a =tenDummyData()
    res.send(`results: ${a}`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});