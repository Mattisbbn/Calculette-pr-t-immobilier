const form = document.querySelector("form");
const pdfButton = document.querySelector("#pdfButton");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const tbody = document.querySelector("tbody");

  let borrowed_amount = parseInt(
    document.querySelector("#borrowed_amount").value
  );
  let nominal_rate = parseFloat(document.querySelector("#nominal_rate").value);
  let repaymentTermInMonth = parseInt(
    document.querySelector("#repayment_term").value * 12
  );
  tbody.innerHTML = "";

  let interestPerMonth = nominal_rate / 12 / 100;
  let remainingBalance = borrowed_amount;
  let balance = borrowed_amount;
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
});

pdfButton.addEventListener("click", generatePDF);

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
