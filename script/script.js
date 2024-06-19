const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const pdfButton = document.querySelector("#pdfButton");
const inputs = document.querySelectorAll("input")

const borrowed_amount_input = document.querySelector("#borrowed_amount")
const nominal_rate_input = document.querySelector("#nominal_rate")
const repayment_term_input = document.querySelector("#repayment_term")

form.addEventListener("submit", drawTable)
pdfButton.addEventListener("click", generatePDF);

function drawTable(event){
event.preventDefault();
checkNominalRate()
const borrowed_amount = parseInt(borrowed_amount_input.value);
const nominal_rate = parseFloat(nominal_rate_input.value);
const repaymentTermInMonth = parseInt(repayment_term_input.value * 12);


let interestPerMonth = nominal_rate / 12 / 100;
let remainingBalance = borrowed_amount;
let balance = borrowed_amount;

tbody.innerHTML = "";

  for (let i = 1; i <= repaymentTermInMonth; i++) {
    let interestOfMonth = remainingBalance * interestPerMonth;
    let monthlyDue = borrowed_amount * ((interestPerMonth * (1 + interestPerMonth) ** repaymentTermInMonth) / ((1 + interestPerMonth) ** repaymentTermInMonth - 1));
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
   pdfButton.style.display = "block"
}




function checkNominalRate(){
    if(nominal_rate_input.value <= 0){
        console.log("no")
        return false;
    }else{
        console.log("frr");
        return true;
    }
}

function checkBorrowedAmount(){
  const borrowed_amount = Number(borrowed_amount_input.value);
  if (Number.isInteger(borrowed_amount) && borrowed_amount > 0) {
      console.log("Valid borrowed amount");
      return true;
  } else {
      console.log("Invalid borrowed amount");
      return false;
  }
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.autoTable({
    html: "table",
    theme: "striped",
    headStyles: { fillColor: [0, 0, 255] },
    styles: { fontSize: 10, cellPadding: 3 },
    margin: { top: 20 },
  });

  doc.save("Tableau.pdf");
}