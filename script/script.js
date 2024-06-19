const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const pdfButton = document.querySelector("#pdfButton");
const inputs = document.querySelectorAll("input");
const errors = document.querySelector("#errors");
const borrowed_amount_input = document.querySelector("#borrowed_amount");
const nominal_rate_input = document.querySelector("#nominal_rate");
const repayment_term_input = document.querySelector("#repayment_term");

form.addEventListener("submit", drawTable);
// pdfButton.addEventListener("click", generatePDF);

function drawTable(event) {
  errorsList = []
  event.preventDefault();
  const borrowed_amount = parseInt(borrowed_amount_input.value);
  const nominal_rate = parseFloat(nominal_rate_input.value);
  const repaymentTermInMonth = parseInt(repayment_term_input.value * 12);

  let interestPerMonth = nominal_rate / 12 / 100;
  let remainingBalance = borrowed_amount;
  let balance = borrowed_amount;

  if (checkBorrowedAmount() && checkNominalRate() && checkRepaymentTerm()) {
  
    errors.innerHTML = "";
    tbody.innerHTML = "";
    pdfButton.style.display = "block";
    for (let i = 1; i <= repaymentTermInMonth; i++) {
      let interestOfMonth = remainingBalance * interestPerMonth;
      let monthlyDue =
        borrowed_amount *
        ((interestPerMonth * (1 + interestPerMonth) ** repaymentTermInMonth) /
          ((1 + interestPerMonth) ** repaymentTermInMonth - 1));
      let amortization = monthlyDue - interestOfMonth;
      remainingBalance -= amortization;

      let row = `<tr>
            <td>${i}</td> 
            <td>${Math.round(balance)}€</td> 
            <td>${Math.round(monthlyDue)}€</td> 
            <td>${Math.round(interestOfMonth)}€</td> 
            <td>${Math.round(amortization)}€</td> 
            <td>${Math.round(remainingBalance)}€</td> 
        </tr>`;

      balance = remainingBalance;
      tbody.innerHTML += row;
    }
  } else {
    errors.innerHTML = errorsList;
    tbody.innerHTML = "";
    pdfButton.style.display = "none";
  }
}

function checkBorrowedAmount() {
  const borrowed_amount_value = borrowed_amount_input.value;
  if (borrowed_amount_value <= 1000) {
    errorsList.push("Vous ne pouvez pas entrer une valeur inférieure à 1000 dans la case montant emprunté");
    inputs[0].style.color = "var(--orange)";
    return false;
  } else if (isNaN(borrowed_amount_value)) {
    errorsList.push("Veuillez entrer une valeur numérique");
    inputs[0].style.color = "var(--orange)";
    return false;
  } else {
    inputs[0].style.color = "var(--blue)";
    return true;
  }
}

function checkNominalRate() {
  const nominal_rate_value = nominal_rate_input.value;
  if (nominal_rate_value <= 0) {
    errorsList.push("Vous ne pouvez pas entrer une valeur inférieure à 0");
    inputs[1].style.color = "var(--orange)";
    return false;
  } else if (isNaN(nominal_rate_value)) {
    errorsList.push("Veuillez entrer une valeur numérique");
    inputs[1].style.color = "var(--orange)";
    return false;
  } else {
    inputs[1].style.color = "var(--blue)";
    return true;
  }
}

function checkRepaymentTerm() {
  const repayment_term_value = repayment_term_input.value;
  if (repayment_term_value <= 0) {
    errorsList.push("Vous ne pouvez pas entrer une valeur inférieure à 0");
    inputs[2].style.color = "var(--orange)";
    return false;
  } else if (isNaN(repayment_term_value)) {
    errorsList.push("Veuillez entrer une valeur numérique");
    inputs[2].style.color = "var(--orange)";

    return false;
  } else {
    inputs[2].style.color = "var(--blue)";
    return true;
  }
}

let errorsList = [];


  document.getElementById("pdfButton").addEventListener("click", () => {
    const element = document.getElementById("table-section");
    
    const opt = {
      filename:     'tableau_amortissement.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 4, useCORS: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  });
