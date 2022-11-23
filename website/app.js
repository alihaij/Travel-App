/* Global Variables */
const api = '914024967b05242786e0a0b1cc1fa08d';
const url ='http://localhost:8000/';

const zipElement = document.getElementById('zip');
const feelingsElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElemetn = document.getElementById('temp');
const contentElement = document.getElementById('content');


document.getElementById('generate').addEventListener("click" , function() {
    let data = {
        zipCode: zipElement.value,
        content:feelingsElement.value,
        date:newDate
    }
    getInformation(data.zipCode)
.then(zipInfo=>{
   console.log(zipInfo);
    data.temp= zipInfo.main.temp;
    postData(data);
});

});

async function getInformation(zipCode){
    let response = await((await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${api}&units=imperial`)).json());
//     await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${api}&units=imperial`)
//    .then(response => console.log(response.json()))
//    .then(json => console.log(json))
    console.log(response);
    return response;
   }


async function postData(data){

    console.log(`${url}postData`);
    let res = await fetch(`${url}postData`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)});
try{
    if(!res.ok){
        console.log('not successfuly');
        
    }else{
        res.json().then(data=>{
            updateUi();
        })
    }
}catch(e){
    console.log(e);
}
}

async function updateUi(){
    
    let res = await fetch(`${url}getAll`);
    try{
        res.json().then(data =>{
            dateElement.innerHTML = `Date: ${data.date}`;
            tempElemetn.innerHTML = `Temperature: ${data.temp}`;
            contentElement.innerHTML = `Feelings: ${data.content}`
        })
    }catch(e){
        console.log(e);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();