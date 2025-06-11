document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const amtInput = document.querySelector(".amt-input");
  const rateInput = document.querySelector(".rate-input");
  const termInput = document.querySelector(".term-input");
  const inputWrapper = document.querySelector(".input-wrapper");
  const currencySymbol = document.querySelector(".currency-symbol");
  const rateInputWrapper = document.querySelector(".rate-input-wrapper");
  const termInputWrapper = document.querySelector(".term-input-wrapper");
  const years = document.querySelector(".years");
  const rate = document.querySelector(".rate");
  const amtError = document.querySelector(".amt-error");
  const rateError = document.querySelector(".rate-error");
  const termError = document.querySelector(".term-error");
  const typeError = document.querySelector(".type-error");
  const repayment = document.getElementById("repayment");
  const intererstOnly = document.getElementById("interest-only");

  const resultSection = document.getElementById("result-section");
  const emptySection = document.querySelector(".item2.empty");

  const monthlySpan = document.getElementById("monthly");
  const totalSpan = document.getElementById("total");
  const typeSpan = document.getElementById("type");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isAmtEmpty = amtInput.value.trim() === "";
    const isRateEmpty = rateInput.value.trim() === "";
    const isTermEmpty = termInput.value.trim() === "";
    const isTypeSelected = repayment.checked || intererstOnly.checked;

    if (isAmtEmpty || isRateEmpty || isTermEmpty || !isTypeSelected) {
      if (isAmtEmpty) {
        inputWrapper.style.border = "1px solid hsl(4, 69%, 50%)";
        currencySymbol.classList.add("error");
        amtError.style.display = "flex";
      } else {
        inputWrapper.style.border = "1px solid hsl(200, 26%, 54%)";
        currencySymbol.classList.remove("error");
        amtError.style.display = "none";
      }

      if (isRateEmpty) {
        rateInputWrapper.style.border = "1px solid hsl(4, 69%, 50%)";
        rate.classList.add("error");
        rateError.style.display = "flex";
      } else {
        rateInputWrapper.style.border = "1px solid hsl(200, 26%, 54%)";
        rate.classList.remove("error");
        rateError.style.display = "none";
      }

      if (isTermEmpty) {
        termInputWrapper.style.border = "1px solid hsl(4, 69%, 50%)";
        years.classList.add("error");
        termError.style.display = "flex";
      } else {
        termInputWrapper.style.border = "1px solid hsl(200, 26%, 54%)";
        years.classList.remove("error");
        termError.style.display = "none";
      }

      if (!isTypeSelected) {
        typeError.style.display = "flex";
      } else {
        typeError.style.display = "none";
      }

      return;
    }

    // Perform calculation
    const P = parseFloat(amtInput.value);
    const r = parseFloat(rateInput.value) / 100 / 12;
    const n = parseInt(termInput.value) * 12;

    let monthlyPayment;
    if (repayment.checked) {
      monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      monthlyPayment = P * r;
    }

    const totalPayment = monthlyPayment * n;

    // Hide empty section and show result section
    emptySection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    // Display results
    monthlySpan.textContent = `£${monthlyPayment.toFixed(2)}`;
    totalSpan.textContent = `£${totalPayment.toFixed(2)}`;
    typeSpan.textContent = repayment.checked ? "Repayment" : "Interest Only";
  });
});
