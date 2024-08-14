const droplist = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".form select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");
const exchangeIcon = document.querySelector(".icon i");

let country_code = {
    "AED": "AE",
    "AFN": "AF",
    "XCD": "AG",
    "ALL": "AL",
    "AMD": "AM",
    "ANG": "AN",
    "AOA": "AO",
    "AQD": "AQ",
    "ARS": "AR",
    "AUD": "AU",
    "AZN": "AZ",
    "BAM": "BA",
    "BBD": "BB",
    "BDT": "BD",
    "XOF": "BE",
    "BGN": "BG",
    "BHD": "BH",
    "BIF": "BI",
    "BMD": "BM",
    "BND": "BN",
    "BOB": "BO",
    "BRL": "BR",
    "BSD": "BS",
    "NOK": "BV",
    "BWP": "BW",
    "BYR": "BY",
    "BZD": "BZ",
    "CAD": "CA",
    "CDF": "CD",
    "XAF": "CF",
    "CHF": "CH",
    "CLP": "CL",
    "CNY": "CN",
    "COP": "CO",
    "CRC": "CR",
    "CUP": "CU",
    "CVE": "CV",
    "CYP": "CY",
    "CZK": "CZ",
    "DJF": "DJ",
    "DKK": "DK",
    "DOP": "DO",
    "DZD": "DZ",
    "ECS": "EC",
    "EEK": "EE",
    "EGP": "EG",
    "ETB": "ET",
    "EUR": "FR",
    "FJD": "FJ",
    "FKP": "FK",
    "GBP": "GB",
    "GEL": "GE",
    "GGP": "GG",
    "GHS": "GH",
    "GIP": "GI",
    "GMD": "GM",
    "GNF": "GN",
    "GTQ": "GT",
    "GYD": "GY",
    "HKD": "HK",
    "HNL": "HN",
    "HRK": "HR",
    "HTG": "HT",
    "HUF": "HU",
    "IDR": "ID",
    "ILS": "IL",
    "INR": "IN",
    "IQD": "IQ",
    "IRR": "IR",
    "ISK": "IS",
    "JMD": "JM",
    "JOD": "JO",
    "JPY": "JP",
    "KES": "KE",
    "KGS": "KG",
    "KHR": "KH",
    "KMF": "KM",
    "KPW": "KP",
    "KRW": "KR",
    "KWD": "KW",
    "KYD": "KY",
    "KZT": "KZ",
    "LAK": "LA",
    "LBP": "LB",
    "LKR": "LK",
    "LRD": "LR",
    "LSL": "LS",
    "LTL": "LT",
    "LVL": "LV",
    "LYD": "LY",
    "MAD": "MA",
    "MDL": "MD",
    "MGA": "MG",
    "MKD": "MK",
    "MMK": "MM",
    "MNT": "MN",
    "MOP": "MO",
    "MRO": "MR",
    "MTL": "MT",
    "MUR": "MU",
    "MVR": "MV",
    "MWK": "MW",
    "MXN": "MX",
    "MYR": "MY",
    "MZN": "MZ",
    "NAD": "NA",
    "XPF": "NC",
    "NGN": "NG",
    "NIO": "NI",
    "NPR": "NP",
    "NZD": "NZ",
    "OMR": "OM",
    "PAB": "PA",
    "PEN": "PE",
    "PGK": "PG",
    "PHP": "PH",
    "PKR": "PK",
    "PLN": "PL",
    "PYG": "PY",
    "QAR": "QA",
    "RON": "RO",
    "RSD": "RS",
    "RUB": "RU",
    "RWF": "RW",
    "SAR": "SA",
    "SBD": "SB",
    "SCR": "SC",
    "SDG": "SD",
    "SEK": "SE",
    "SGD": "SG",
    "SKK": "SK",
    "SLL": "SL",
    "SOS": "SO",
    "SRD": "SR",
    "STD": "ST",
    "SVC": "SV",
    "SYP": "SY",
    "SZL": "SZ",
    "THB": "TH",
    "TJS": "TJ",
    "TMT": "TM",
    "TND": "TN",
    "TOP": "TO",
    "TRY": "TR",
    "TTD": "TT",
    "TWD": "TW",
    "TZS": "TZ",
    "UAH": "UA",
    "UGX": "UG",
    "USD": "US",
    "UYU": "UY",
    "UZS": "UZ",
    "VEF": "VE",
    "VND": "VN",
    "VUV": "VU",
    "YER": "YE",
    "ZAR": "ZA",
    "ZMK": "ZM",
    "ZWD": "ZW"
}


for (let i = 0; i < droplist.length; i++) {
    for (let currency_code in country_code) {
        let selected = "";
        if (i === 0) {
            selected = currency_code === "USD" ? "selected" : "";
        } else if (i === 1) {
            selected = currency_code === "BDT" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        droplist[i].insertAdjacentHTML("beforeend", optionTag);
    }
    droplist[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(e) {
    for (let code in country_code) {
        if (code === e.value) {
            const country = country_code[code].toLowerCase();
            let imgTag = e.parentElement.querySelector('img');
            imgTag.src = `https://flagcdn.com/48x36/${country}.png`;
            imgTag.srcset = `https://flagcdn.com/96x72/${country}.png 2x, https://flagcdn.com/144x108/${country}.png 3x`;
            imgTag.alt = country;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

exchangeIcon.parentElement.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

async function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    let exchangeRateTxt = document.querySelector(".exchange-rate");

    let amountVal = amount.value;
    if (amountVal === "" || amountVal === "0") {
        amount.value = "0";
    }
    exchangeRateTxt.innerText = 'Getting Exchange Rate....';
    let url = `https://v6.exchangerate-api.com/v6/d8bac7218d7178094bf9a6cb/latest/${fromCurrency.value}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;

        // Guardar la conversi�n en la base de datos utilizando ADO.NET
        const conversionData = {
            amount: amountVal,
            fromCurrency: fromCurrency.value,
            result: totalExchangeRate.toString(),
            toCurrency: toCurrency.value
        };
        await saveConversion(conversionData);

        // Actualizar el historial de conversiones
        updateConversionHistory(conversionData);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function saveConversion(conversionData) {
    const formData = new FormData();
    formData.append('amount', conversionData.amount);
    formData.append('fromCurrency', conversionData.fromCurrency);
    formData.append('result', conversionData.result);
    formData.append('toCurrency', conversionData.toCurrency);

    try {
        await fetch('/Currency/Convert', {
            method: 'POST',
            body: formData
        });
    } catch (error) {
        console.error('Error al guardar la conversi�n:', error);
    }
}

function updateConversionHistory(conversionData) {
    const historyTableBody = document.querySelector('#conversion-history tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${new Date().toLocaleString()}</td>
        <td>${conversionData.amount}</td>
        <td>${conversionData.fromCurrency}</td>
        <td>${conversionData.toCurrency}</td>
        <td>${conversionData.result}</td>
    `;
    historyTableBody.appendChild(newRow);
}

