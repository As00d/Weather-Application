
const inputCity = document.querySelector('.cityHolder');
const submitButton = document.querySelector('.submitButton');
const cityTemperature = document.querySelector('.currentTemperature');
const weatherDesc = document.querySelector('.weatherDesc');
const humidityVal = document.querySelector('.humidityVal');
const windVal = document.querySelector('.windVal');
const imageOfWeather = document.querySelector('.imageOfWeather');

const API_KEY = 'b37513b09cf0b33e54b38d21865fee75'
const fetchWeather = async function(city) {
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    if(!response.ok){
        throw new Error('No response from api and with status: ' + response.status);
    }
    const jsonValue = await response.json();

    console.log(jsonValue);
    const {weather, main, wind} = jsonValue;
    console.log(weather);
    console.log(main);
    console.log(wind);

    if(main) {
        const currentTemperature = Math.round(main?.temp - 273, 0);
        cityTemperature.textContent = currentTemperature + '℃';
        humidityVal.textContent = main?.humidity + "%"
        
    }
    if(weather) {
        weatherDesc.textContent = weather[0].description;
        // here will be the logic 
        
        const currentWeather = weather[0].main;
        console.log(imageOfWeather);
        if(currentWeather === 'Clouds') {
            imageOfWeather.src = './assets/cloud.png';
        } else if (currentWeather === 'Clear') {
            imageOfWeather.src = './assets/clear.png';
        } else if (currentWeather === 'Snow') {
            imageOfWeather.src = './assets/snow.png';
        } else if (currentWeather === 'Mist') {
            imageOfWeather.src = './assets/mist.png';
        } else if (currentWeather === 'Rain') {
            imageOfWeather.src = './assets/rain.png';
        } 

    }
    if(wind) {
        console.log(windVal);
        console.log(wind.speed);
        windVal.textContent = wind.speed;
    }
    } catch(error) {
        console.error(new Error(error));
    }
}


// When user click on submit button we will get the search value 
submitButton.addEventListener('click', function(){
    const city = inputCity.value;
    if(city) {
        fetchWeather(city);
    }
})

