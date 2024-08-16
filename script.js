
const inputCity = document.querySelector('.cityHolder');
const submitButton = document.querySelector('.submitButton');
const cityTemperature = document.querySelector('.currentTemperature');
const weatherDesc = document.querySelector('.weatherDesc');
const humidityVal = document.querySelector('.humidityVal');
const windVal = document.querySelector('.windVal');
const imageOfWeather = document.querySelector('.imageOfWeather');
const temperature = document.querySelector('.temperature');
const otherInfo = document.querySelector('.otherInfo');
const errorMsg = document.querySelector('.error');

const fetchWeather = async function (city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Region not found: ' + response.status);
        }
        const jsonValue = await response.json();

        const { weather, main, wind } = jsonValue;

        if (main) {
            const currentTemperature = Math.round(main?.temp - 273, 0);
            cityTemperature.textContent = currentTemperature + '℃';
            humidityVal.textContent = main?.humidity + "%"

            temperature.style.display = 'block';
            otherInfo.style.display = 'flex';
            errorMsg.textContent = '';
            errorMsg.classList.remove('displayError');

        }
        if (weather) {
            weatherDesc.textContent = weather[0].description;
            const currentWeather = weather[0].main;
            if (currentWeather === 'Clouds') {
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
        if (wind) {
            windVal.textContent = wind.speed;
        }
    } catch (error) {
        console.error(new Error(error));
        display404(error.message);
    }
}

const display404 = function (error) {
    console.log(error);
    imageOfWeather.src = './assets/404.png';
    temperature.style.display = 'none';
    otherInfo.style.display = 'none';
    errorMsg.textContent = error;
    errorMsg.classList.add('displayError');
}

// When user click on submit button we will get the search value 
submitButton.addEventListener('click', function () {
    const city = inputCity.value;
    if (city) {
        fetchWeather(city);
    }
})

// for api key please refer code in local as it cannot be exposed