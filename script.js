const countryList = {
  USD: "US",
  NPR: "NP",
  INR: "IN",
  PKR: "PK",
  MAD: "MA"
};

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");
const exchangeRateTxt = document.querySelector(".exchange-rate");
const amountInput = document.querySelector(".amount input");
const fromImg = document.querySelector(".from img");
const toImg = document.querySelector(".to img");
function loadFlag(select, img) {
  const countryCode = countryList[select.value];
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}
loadFlag(fromCurrency, fromImg);
loadFlag(toCurrency, toImg);
[fromCurrency, toCurrency].forEach((select, index) => {
  select.addEventListener("change", () => {
    const img = index === 0 ? fromImg : toImg;
    loadFlag(select, img);
  });
});

getButton.addEventListener("click", e => {
  e.preventDefault();
  const amount = amountInput.value || 1;
  getExchangeRate(amount);
});

function getExchangeRate(amount) {
  const fromVal = fromCurrency.value;
  const toVal = toCurrency.value;
  const url = `https://api.exchangerate-api.com/v4/latest/${fromVal}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[toVal];
      const totalEx = (amount * rate).toFixed(2);
      exchangeRateTxt.innerText = `${amount} ${fromVal} = ${totalEx} ${toVal}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });
}
