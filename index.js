document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.container');
    const inputContainer = document.querySelector('.inputcontainer');
    const container2 = document.querySelector('.container2');
    const container3 = document.querySelector('.container3');

    const amountInput = document.querySelector('#input');
    const fromCurrencySelect = document.querySelector('#fromcurrency');
    const toCurrencySelect = document.querySelector('#tocurrency');
    const convertBtn = document.querySelector('#cnvtbtn');
    const resetBtn = document.querySelector('#rsbtn');
    const amountLabel = document.querySelector('#para1');
    const ans = document.querySelector('.output');

    function checkValid() {
        const inputValue = amountInput.value.trim();

        if (inputValue === "") {
            alert("Please enter a value.");
            return false;
        }

        const amount = parseFloat(inputValue);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid value greater than 0.");
            return false;
        }

        return true;
    }

    async function fetchData() {
        const from = fromCurrencySelect.value;
        const to = toCurrencySelect.value;
        const amount = parseFloat(amountInput.value);

        const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

        try {
            let response = await fetch(url);
            if (!response.ok) {
                alert("Error fetching exchange rates.");
                return;
            }

            let data = await response.json();
            const rate = data.rates[to];

            if (!rate) {
                alert("Conversion rate not available.");
                return;
            }

            const convertedAmount = (amount * rate).toFixed(2);
            ans.innerHTML = `<span>${amount} ${from} = ${convertedAmount} ${to}</span>`;
        } catch (error) {
            alert("Request failed. Check your internet connection.");
        } finally {
            convertBtn.textContent = "Convert";
            convertBtn.disabled = false;
        }
    }

    convertBtn.addEventListener('click', function () {
        if (!checkValid()) return;
        convertBtn.textContent = "Converting...";
        convertBtn.disabled = true;
        fetchData();
    });

    resetBtn.addEventListener('click', function () {
        amountInput.value = "";
        fromCurrencySelect.selectedIndex = 0;
        toCurrencySelect.selectedIndex = 0;
        ans.innerHTML = "";
        convertBtn.disabled = false;
    });
});
