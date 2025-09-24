
const API_ENDPOINTS = {
    
    weather: (city) => `https://api.weatherapi.com/v1/current.json?key=47136d30757e4394b8691513252409&q=${city}&aqi=no`,

    
    forecast: (city) => `https://api.weatherapi.com/v1/forecast.json?key=47136d30757e4394b8691513252409&q=${city}&days=5&aqi=no&alerts=no`,

    
    attractions: (city) => `https://jsonplaceholder.typicode.com/posts?city=${city}`, // Mock API
    restrictions: (country) => `https://jsonplaceholder.typicode.com/posts?country=${country}` // Mock API
};


const FALLBACK_DATA = {
    weather: {
        London: { temp: 15, conditions: "Cloudy", humidity: 60, windSpeed: 10 },
        Paris: { temp: 18, conditions: "Sunny", humidity: 50, windSpeed: 5 },
        "New York": { temp: 20, conditions: "Rain", humidity: 70, windSpeed: 12 },
        Tokyo: { temp: 22, conditions: "Clear", humidity: 40, windSpeed: 8 },
        Sydney: { temp: 25, conditions: "Sunny", humidity: 30, windSpeed: 7 }
    },
    attractions: {
        London: [
            { name: "Hyde Park", description: "Large royal park with cycling paths and boating", type: "park" },
            { name: "Kew Gardens", description: "World-famous botanical gardens with sustainable practices", type: "garden" },
            { name: "Thames Path", description: "Walking route along the river with minimal environmental impact", type: "walking" }
        ],
        Paris: [
            { name: "Luxembourg Gardens", description: "Beautiful public park with fountains and green spaces", type: "park" },
            { name: "Canal Saint-Martin", description: "Picturesque waterway perfect for walking and picnics", type: "canal" },
            { name: "Bois de Vincennes", description: "Large public park with lakes and sustainable activities", type: "park" }
        ],
        "New York": [
            { name: "Central Park", description: "Iconic urban park with walking trails and conservation areas", type: "park" },
            { name: "High Line", description: "Elevated park built on a historic freight rail line", type: "park" },
            { name: "Brooklyn Botanic Garden", description: "52-acre garden focused on conservation and education", type: "garden" }
        ]
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    
    setupEventListeners();
    
    
    loadInitialData();
}

function setupEventListeners() {
    document.getElementById('search-accommodation').addEventListener('click', searchAccommodation);
    document.getElementById('search-transportation').addEventListener('click', searchTransportation);
    document.getElementById('calculate-footprint').addEventListener('click', calculateCarbonFootprint);
    document.getElementById('get-weather').addEventListener('click', getWeatherData);
    document.getElementById('search-attractions').addEventListener('click', searchAttractions);
    document.getElementById('search-restrictions').addEventListener('click', searchRestrictions);

    
    document.getElementById('city-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') getWeatherData();
    });
    document.getElementById('attraction-city-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchAttractions();
    });
}

function loadInitialData() {
    getWeatherData('London');
    searchAttractions('London');
}

// ------------------- Accommodation -------------------
async function searchAccommodation() {
    const location = document.getElementById('location').value.trim();
    const filter = document.getElementById('filter-options').value;
    
    if (!location) {
        showError('accommodation-results', 'Please enter a destination');
        return;
    }
    
    showLoading('accommodation-results');
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const results = document.getElementById('accommodation-results');
        results.innerHTML = `
            <h3>Eco-Friendly Accommodations in ${location}</h3>
            <div class="success">Found 5 sustainable options</div>
            <div class="accommodation-list">
                <div class="accommodation-item">
                    <h4>Green Haven Hotel</h4>
                    <p>★★★★ (4.2/5) - Certified sustainable, solar powered, waste reduction program</p>
                    <p><strong>Eco-features:</strong> Energy efficient, water conservation, local sourcing</p>
                </div>
                <div class="accommodation-item">
                    <h4>Eco Lodge Retreat</h4>
                    <p>★★★★★ (4.5/5) - Solar powered, organic garden, carbon neutral</p>
                    <p><strong>Eco-features:</strong> Renewable energy, organic products, community support</p>
                </div>
                <div class="accommodation-item">
                    <h4>Earth Friendly Hostel</h4>
                    <p>★★★ (3.8/5) - Waste reduction program, bike rentals, local experiences</p>
                    <p><strong>Eco-features:</strong> Recycling program, energy monitoring, eco-tours</p>
                </div>
            </div>
        `;
        
        loadAccommodationReviews(location);
        
    } catch (error) {
        showError('accommodation-results', 'Failed to search accommodations. Please try again.');
    }
}

function loadAccommodationReviews(location) {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = `
        <div class="review-item">
            <p><strong>Sarah M.</strong> - "The Green Haven Hotel was amazing! Their sustainability efforts are impressive."</p>
        </div>
        <div class="review-item">
            <p><strong>John D.</strong> - "Loved the eco-lodge. Felt good supporting environmentally responsible tourism."</p>
        </div>
    `;
}


async function searchTransportation() {
    const location = document.getElementById('transport-location').value.trim();
    
    if (!location) {
        showError('transportation-results', 'Please enter a location');
        return;
    }
    
    showLoading('transportation-results');
    
    try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const results = document.getElementById('transportation-results');
        results.innerHTML = `
            <h3>Sustainable Transportation in ${location}</h3>
            <div class="success">Found multiple eco-friendly options</div>
            <ul>
                <li><strong>Public Transit:</strong> Extensive bus and train network with eco-friendly vehicles</li>
                <li><strong>Bike Sharing:</strong> CityBike program with 200+ stations across the city</li>
                <li><strong>EV Rentals:</strong> GreenCar rentals available at 5 central locations</li>
                <li><strong>Walking Tours:</strong> 10+ guided eco-walks through historic districts</li>
                <li><strong>Carpooling:</strong> EcoRide app connects travelers going the same direction</li>
            </ul>
        `;
        
    } catch (error) {
        showError('transportation-results', 'Failed to search transportation options. Please try again.');
    }
}


function calculateCarbonFootprint() {
    const distance = parseFloat(document.getElementById('distance').value);
    const transportMode = document.getElementById('transport-mode').value;
    const accommodationType = document.getElementById('accommodation-type').value;
    const duration = parseInt(document.getElementById('duration').value) || 1;
    
    if (!distance || distance <= 0) {
        showError('carbon-results', 'Please enter a valid distance');
        return;
    }
    
    const emissionsFactors = {
        transport: { car: 0.120, bus: 0.050, train: 0.040, plane: 0.250, bike: 0.005, walk: 0.001 },
        accommodation: { hotel: 10, 'eco-hotel': 5, hostel: 7, rental: 8 }
    };
    
    const transportEmissions = distance * emissionsFactors.transport[transportMode];
    const accommodationEmissions = duration * emissionsFactors.accommodation[accommodationType];
    const totalEmissions = (transportEmissions + accommodationEmissions).toFixed(2);
    
    document.getElementById('footprint-result').textContent = `${totalEmissions} kg CO2`;
    
    let tips = '';
    let comparison = '';
    
    if (totalEmissions > 50) {
        tips = `
            <div class="error">
                <p><strong>High Impact:</strong> Consider these changes to reduce your footprint:</p>
                <ul>
                    <li>Choose train instead of plane for shorter distances</li>
                    <li>Select eco-friendly accommodations</li>
                    <li>Offset your carbon emissions</li>
                </ul>
            </div>
        `;
    } else if (totalEmissions > 20) {
        tips = `
            <div class="success">
                <p><strong>Moderate Impact:</strong> Good effort! You could further reduce your footprint by:</p>
                <ul>
                    <li>Opting for public transportation or biking when possible</li>
                    <li>Choosing accommodations with sustainability certifications</li>
                </ul>
            </div>
        `;
    } else {
        tips = `
            <div class="success">
                <p><strong>Excellent!</strong> You're making very sustainable travel choices. Keep up the good work!</p>
            </div>
        `;
    }
    
    const averageEmissions = 75;
    const savings = (averageEmissions - totalEmissions).toFixed(2);
    
    if (savings > 0) {
        comparison = `
            <div class="carbon-comparison">
                <p>You're saving <strong>${savings} kg CO2</strong> compared to the average traveler!</p>
                <p>That's equivalent to ${(savings * 0.1).toFixed(1)} trees absorbing CO2 for a year.</p>
            </div>
        `;
    }
    
    document.getElementById('footprint-tips').innerHTML = tips;
    document.getElementById('carbon-comparison').innerHTML = comparison;
}


async function getWeatherData(city = null) {
    const cityInput = city || document.getElementById('city-input').value.trim();
    
    if (!cityInput) {
        showError('weather-container', 'Please enter a city name');
        return;
    }
    
    showLoading('weather-container');
    
    try {
        
        const response = await fetch(API_ENDPOINTS.weather(cityInput));
        const data = await response.json();

        if (data && data.current) {
            const weatherData = {
                temp: data.current.temp_c,
                conditions: data.current.condition.text,
                humidity: data.current.humidity,
                windSpeed: data.current.wind_kph
            };
            displayWeatherData(cityInput, weatherData);

            
            const forecastResponse = await fetch(API_ENDPOINTS.forecast(cityInput));
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData.forecast.forecastday);
        } else {
            showError('weather-container', 'Weather data not available for this city');
        }
    } catch (error) {
        console.error(error);
        const weatherData = FALLBACK_DATA.weather[cityInput] || FALLBACK_DATA.weather['London'];
        displayWeatherData(cityInput, weatherData);
    }
}

function displayWeatherData(city, data) {
    document.getElementById('temperature').textContent = `${data.temp}°C`;
    document.getElementById('conditions').textContent = data.conditions;
    document.getElementById('humidity').textContent = data.humidity;
    document.getElementById('wind-speed').textContent = data.windSpeed;

    document.getElementById('current-weather').style.display = 'block';
    document.getElementById('forecast-container').style.display = 'block';
    document.getElementById('weather-loading').style.display = 'none';
}

function displayForecast(forecastDays) {
    const forecastContainer = document.getElementById('forecast-results');
    let forecastHTML = '';

    forecastDays.forEach(day => {
        forecastHTML += `
            <div class="forecast-item">
                <span>${day.date}</span>
                <span>${day.day.avgtemp_c}°C, ${day.day.condition.text}</span>
            </div>
        `;
    });

    forecastContainer.innerHTML = forecastHTML;
}

async function searchAttractions(city = null) {
    const cityInput = city || document.getElementById('attraction-city-input').value.trim();
    
    if (!cityInput) {
        showError('attractions-list', 'Please enter a city name');
        return;
    }
    
    showLoading('attractions-list');
    
    try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const attractions = FALLBACK_DATA.attractions[cityInput] || FALLBACK_DATA.attractions['London'];
        if (attractions) {
            displayAttractions(cityInput, attractions);
        } else {
            showError('attractions-list', 'No eco-friendly attractions found for this city');
        }
    } catch (error) {
        const attractions = FALLBACK_DATA.attractions[cityInput] || FALLBACK_DATA.attractions['London'];
        displayAttractions(cityInput, attractions);
    }
}

function displayAttractions(city, attractions) {
    const container = document.getElementById('attractions-list');
    
    if (!attractions || attractions.length === 0) {
        container.innerHTML = '<p>No eco-friendly attractions found for this city.</p>';
        return;
    }
    
    let attractionsHTML = '';
    
    attractions.forEach(attraction => {
        const imageUrl = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`;
        
        attractionsHTML += `
            <div class="attraction-card">
                <div class="attraction-img" style="background-image: url('${imageUrl}')"></div>
                <div class="attraction-info">
                    <h4>${attraction.name}</h4>
                    <p>${attraction.description}</p>
                    <p><strong>Type:</strong> ${attraction.type}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = attractionsHTML;
}


async function searchRestrictions() {
    const country = document.getElementById('country-input').value.trim();
    
    if (!country) {
        showError('restrictions-info', 'Please enter a country name');
        return;
    }
    
    showLoading('restrictions-info');
    
    try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const restrictionsInfo = document.getElementById('restrictions-info');
        restrictionsInfo.innerHTML = `
            <h3>Travel Information for ${country}</h3>
            <div class="restrictions-detail">
                <p><strong>Entry Requirements:</strong> Visa requirements vary by nationality. Check with local embassy.</p>
                <p><strong>Health Protocols:</strong> COVID-19 vaccination may be required. PCR test might be needed.</p>
                <p><strong>Sustainability Guidelines:</strong> Follow local recycling and conservation practices.</p>
                <p><strong>Eco-Travel Tips:</strong> Use public transport, support local businesses, minimize plastic use.</p>
            </div>
            <div class="success">
                <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
        `;
        
    } catch (error) {
        showError('restrictions-info', 'Failed to fetch travel restrictions. Please try again.');
    }
}


function showLoading(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '<div class="loading">Loading...</div>';
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<div class="error">${message}</div>`;
}


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


document.addEventListener('DOMContentLoaded', initializeApp);
