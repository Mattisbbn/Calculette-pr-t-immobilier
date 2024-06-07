const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const pdfButton = document.querySelector("#pdfButton");
const inputs = document.querySelectorAll("input")

form.addEventListener("submit", drawTable)
pdfButton.addEventListener("click", generatePDF);

function drawTable(event){
event.preventDefault();

let borrowed_amount = parseInt(document.querySelector("#borrowed_amount").value);
let nominal_rate = parseFloat(document.querySelector("#nominal_rate").value);
let repaymentTermInMonth = parseInt(document.querySelector("#repayment_term").value * 12);
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
  
    doc.save("a4.pdf");
  }
