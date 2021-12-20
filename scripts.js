/* Variables */
let city = document.querySelector("#city");
let country = document.querySelector("#country");
let sumit = document.querySelector(".submit");
let container = document.querySelector(".container");
let paragraphContainer = document.querySelectorAll(".container p");
let alertError = document.querySelector(".alert__error");
let error = document.querySelector(".error");

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
	fetch(url)
		.then((data) => data.json())
		.then((data) => {
			let {temp, temp_min, temp_max} = data.main;
		});
}
function validator() {
	if (city.value === "" || country.firstElementChild.value === "nan") {
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
