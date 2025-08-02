const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");
const chartCanvas = document.getElementById("expense-chart");
const monthFilter = document.getElementById("filter-month");
const yearFilter = document.getElementById("filter-year");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderFilters() {
  const months = [...new Set(expenses.map(e => new Date(e.date).getMonth()))];
  const years = [...new Set(expenses.map(e => new Date(e.date).getFullYear()))];

  monthFilter.innerHTML = '<option value="">All Months</option>';
  months.sort().forEach(m => {
    monthFilter.innerHTML += `<option value="${m}">${new Date(2000, m).toLocaleString('default', { month: 'long' })}</option>`;
  });

  yearFilter.innerHTML = '<option value="">All Years</option>';
  years.sort().forEach(y => {
    yearFilter.innerHTML += `<option value="${y}">${y}</option>`;
  });
}

function renderExpenses() {
  const filtered = expenses.filter(exp => {
    const d = new Date(exp.date);
    return (!monthFilter.value || d.getMonth() == monthFilter.value) &&
           (!yearFilter.value || d.getFullYear() == yearFilter.value);
  });

  list.innerHTML = "";
  filtered.forEach((expense, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${expense.title} - ₹${expense.amount} on ${expense.date}
      <button onclick="deleteExpense(${i})" style="float:right">❌</button>`;
    list.appendChild(li);
  });

  updateChart(filtered);
  renderFilters();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  expenses.push({ title, amount, date });
  saveExpenses();
  renderExpenses();
  form.reset();
});

function updateChart(data) {
  const summary = {};
  data.forEach(e => {
    summary[e.title] = (summary[e.title] || 0) + e.amount;
  });

  const labels = Object.keys(summary);
  const values = Object.values(summary);

  if (chart) chart.destroy();
  chart = new Chart(chartCanvas, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ['#ff6384','#36a2eb','#ffce56','#4bc0c0','#9966ff','#ff9f40'],
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.getElementById("export-csv").addEventListener("click", () => {
  let csv = "Title,Amount,Date\n";
  expenses.forEach(e => {
    csv += `${e.title},${e.amount},${e.date}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "expenses.csv";
  a.click();
});

monthFilter.addEventListener("change", renderExpenses);
yearFilter.addEventListener("change", renderExpenses);

// Init
renderExpenses();
