const content = document.querySelector(".api-text");
const search = document.querySelector(".search-bar");
const button = document.querySelector(".submit");
const picture = document.querySelector(".api-content");

const weatherApiKey = "00ff217d9cb39faa8a835f5e64f2a349" //Do not need to hide these keys, they arent important and are Free
const picApiKey = "5t6cAw_jY3JN-OjCafqONiDJg4BO4VD1EjL3nMush4w"

button.addEventListener("click",getData);
async function getData() {
    content.textContent = "Fetching data...";
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=standard&appid=${weatherApiKey}`)
    .then(res=> res.json());
    if(data.cod != 200){ //Manage errors
        content.textContent = `There was an error: Code ${data.cod}, ${data.message}`;
        picture.style.backgroundImage = "url(error.jpg)";
        picture.style.opacity = 0.3;
        picture.style.backgroundPosition = "center";
        picture.style.backgroundRepeat = "no-repeat";
        picture.style.backgroundSize="cover";
        return;
    }

    drawPic(data.name); //Get the picture of the location that was entered

    //Change the text to show the temperature and description
    content.textContent = `The temperature in ${data.name} is ${Math.round(parseFloat(data.main.temp) - 273.15)}°C 
    (${Math.round((parseFloat(data.main.temp) - 273.15) *9/5 + 32)}°F) with
    ${data.weather[0].description}.`;

}

async function drawPic(location){
    const pic = await fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${picApiKey}`)
    .then(response=>response.json());
    console.log(pic);
    let randNum = Math.round(Math.random() * 5); //Choose a random picture from the given array of pictures
    console.log(randNum);
    picture.style.backgroundImage = `url(${pic.results[randNum].urls.regular})`;
    picture.style.opacity = 0.3;
    picture.style.backgroundPosition = "center";
    picture.style.backgroundRepeat = "no-repeat";
    picture.style.backgroundSize="cover";
}

