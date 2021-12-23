/* Variables */
let city = document.querySelector("#city");
let country = document.querySelector("#country");
let sumit = document.querySelector(".submit");
let containerData = document.querySelector(".container");
let paragraphContainer = document.querySelectorAll(".container p");
let alertError = document.querySelector(".alert__error");
let error = document.querySelector(".error");

city.focus();

/* Event Listeners */
sumit.addEventListener("click", (event) => {
	event.preventDefault();
	validator();
});
/* To capture the values of the "select" tag */
country.addEventListener("change", (event) => {
	country = event.target.value;
});

/* Functions */
function fetchAPI() {
	let apiKey = "e6af5d09b682b5a2f00a2a89895888e7";
	let countryKey = country;
	let cityKey = city.value;
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityKey},${countryKey}&appid=${apiKey}`;
	spinner();
	fetch(url)
		.then((data) => data.json())
		.then((data) => {
			informationValidator(data);
		});
}
function validator() {
	if (city.value === "" || country.firstElementChild) {
		/* Shows error message */
		error.textContent = "Es necesario rellenar ambos formularios";
		alertError.classList.remove("d-none");
		setTimeout(() => {
			alertError.classList.add("d-none");
		}, 5000);
	} else {
		fetchAPI();
	}
}
function informationValidator(data) {
	/* Shows error message */
	if (data.cod === "404") {
		error.textContent = "Ciudad no encontrada";
		alertError.classList.remove("d-none");
		setTimeout(() => {
			alertError.classList.add("d-none");
		}, 5000);
	} else {
		removeChildren(containerData);
		/* Shows the information */
		let {temp, temp_min, temp_max} = data.main;
		temp = KelvinToCelsius(temp);
		temp_min = KelvinToCelsius(temp_min);
		temp_max = KelvinToCelsius(temp_max);
		containerData.innerHTML = `
            <p class="font-3 weight"><span class="br">Clima en ${city.value}</span>${temp} &#8451;</p>
            <p class="font-1-5">Max: ${temp_max} &#8451;</p>
            <p class="font-1-5">Min: ${temp_min} &#8451;</p>
        `;
	}
}
function removeChildren(parent) {
	while (parent.firstElementChild) {
		parent.firstElementChild.remove();
	}
}
function KelvinToCelsius(degrees) {
	return parseInt(degrees - 273.15);
}
function spinner() {
	removeChildren(containerData);
	let spinner = document.createElement("div");
	spinner.classList.add("sk-circle");
	spinner.innerHTML = `
	<div class="sk-circle1 sk-child"></div>
	<div class="sk-circle2 sk-child"></div>
	<div class="sk-circle3 sk-child"></div>
	<div class="sk-circle4 sk-child"></div>
	<div class="sk-circle5 sk-child"></div>
	<div class="sk-circle6 sk-child"></div>
	<div class="sk-circle7 sk-child"></div>
	<div class="sk-circle8 sk-child"></div>
	<div class="sk-circle9 sk-child"></div>
	<div class="sk-circle10 sk-child"></div>
	<div class="sk-circle11 sk-child"></div>
	<div class="sk-circle12 sk-child"></div>
	`;
	containerData.appendChild(spinner);
}
