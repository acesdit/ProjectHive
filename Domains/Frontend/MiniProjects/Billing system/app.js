// Local storage data arrays
let customers = [];
let products = [];
let bills = [];

// Customer Management
document.getElementById("customerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("custName").value;
  const contact = document.getElementById("custContact").value;
  const address = document.getElementById("custAddress").value;
  const email = document.getElementById("custEmail").value;

  customers.push({ name, contact, address, email });
  displayCustomers();
  updateDashboard();
  this.reset();
});

function displayCustomers() {
  const list = document.getElementById("customerList");
  list.innerHTML = customers
    .map((c, i) => `<p>${i + 1}. ${c.name} - ${c.contact}</p>`)
    .join("");
}

// Product Management
document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("prodID").value;
  const name = document.getElementById("prodName").value;
  const price = parseFloat(document.getElementById("prodPrice").value);
  const qty = parseInt(document.getElementById("prodQty").value);
  const tax = parseFloat(document.getElementById("prodTax").value);

  products.push({ id, name, price, qty, tax });
  displayProducts();
  updateDashboard();
  this.reset();
});

function displayProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = products
    .map(
      (p, i) =>
        `<p>${i + 1}. ${p.name} - ₹${p.price} (Qty: ${p.qty}) Tax: ${p.tax}%</p>`
    )
    .join("");
}

// Billing
let currentBill = [];

document.getElementById("billForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const cust = document.getElementById("billCustomer").value;
  const prod = document.getElementById("billProduct").value;
  const qty = parseInt(document.getElementById("billQty").value);

  const item = products.find((p) => p.name === prod);
  if (!item) {
    alert("Product not found!");
    return;
  }

  const subtotal = item.price * qty;
  const tax = (subtotal * item.tax) / 100;
  const total = subtotal + tax;

  currentBill.push({ cust, prod, qty, total });
  displayBill();
});

function displayBill() {
  const billDiv = document.getElementById("billDetails");
  billDiv.innerHTML = currentBill
    .map(
      (b, i) =>
        `<p>${i + 1}. ${b.prod} (x${b.qty}) - ₹${b.total.toFixed(2)}</p>`
    )
    .join("");
}

function generateInvoice() {
  let total = currentBill.reduce((sum, item) => sum + item.total, 0);
  alert("Invoice Generated! Total Amount: ₹" + total);
  bills.push({ date: new Date().toLocaleDateString(), total });
  currentBill = [];
  document.getElementById("billDetails").innerHTML = "";
  updateDashboard();
}

// Reports
function generateReport() {
  const reportDiv = document.getElementById("reportResult");
  let totalSales = bills.reduce((sum, b) => sum + b.total, 0);
  reportDiv.innerHTML = `<h3>Total Sales: ₹${totalSales}</h3>`;
}

// Dashboard
function updateDashboard() {
  document.getElementById("totalCust").textContent = customers.length;
  document.getElementById("totalProd").textContent = products.length;
  let totalSales = bills.reduce((sum, b) => sum + b.total, 0);
  document.getElementById("totalSales").textContent = totalSales;
}
