// script.js
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.getElementById('fromCurrency');
const toCurr = document.getElementById('toCurrency');
const msg = document.querySelector(".msg");
const flagImg = document.getElementById('flag');

const countryList = {
    "USD": "US",
    "INR": "IN",
    "EUR": "EU",
    "JPY": "JP",
    "GBP": "GB",
    "AUD": "AU",
    "CAD": "CA",
    "CHF": "CH",
    "CNY": "CN",
    "SEK": "SE",
    "NZD": "NZ",
    "MXN": "MX",
    "SGD": "SG",
    "HKD": "HK",
    "ZAR": "ZA"
    // Add more currency codes and country codes as needed
};

// Populate dropdowns with currency options
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }
}

const updateFlag = () => {
    let currCode = toCurr.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    flagImg.src = newSrc;
};

const updateExchangeRate = async () => {
    let amount = document.getElementById('amount').value;
    if (amount === "" || amount < 1) {
        amount = 1;
        document.getElementById('amount').value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

        let finalAmount = amount * rate;
        msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
        updateFlag();
    } catch (error) {
        msg.innerText = `Error: ${error.message}`;
    }
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
