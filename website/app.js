/* Global Variables */
const apiKey = '914024967b05242786e0a0b1cc1fa08d';
const url = 'http://localhost:8000';

const zipElement = document.querySelector('#zip');
const feelingsElement = document.querySelector('#feelings');
const dateElement = document.querySelector('#date');
const tempElemetn = document.querySelector('#temp');
const contentElement = document.querySelector('#content');
//ddd


document.querySelector('#generate').addEventListener("click", function () {
    let data = {
        zipCode: zipElement.value,
        content: feelingsElement.value,
        date: newDate
    }
    getInformation(data.zipCode)
        .then(getInfo => {
            console.log(getInfo);
            data.temp = getInfo.main.temp;
            postData(data);
        });

});

async function getInformation(zipCode) {
    let response = await(await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`)).json();
    //     await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`)
    //    .then(response => console.log(response.json()))
    //    .then(json => console.log(json))
    console.log(response);
    return response;
}


async function postData(data) {

    console.log(`${url}/postData`);
    let res = await fetch(`${url}/postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    try {
        if (!res.ok) {
            console.log('not successfuly');

        } else {
            res.json().then(data => {
                displayData();
            })
        }
    } catch (e) {
        console.log(e);
    }
}

async function displayData() {

    let res = await fetch(`${url}/getAll`);
    try {
        res.json().then(data => {
            dateElement.innerHTML = `Date: ${data.date}`;
            tempElemetn.innerHTML = `Temperature: ${data.temp}`;
            contentElement.innerHTML = `Feelings: ${data.response}`;
        })
    } catch (e) {
        console.log(e);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() +1+ '.' + d.getDate() + '.' + d.getFullYear();