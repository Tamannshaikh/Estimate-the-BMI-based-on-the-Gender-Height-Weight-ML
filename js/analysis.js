/* ===================== CONFIG ===================== */
const API_URL = "http://127.0.0.1:5000/api/bmi";

const CATEGORY_MAP = {
  0: "Extremely Weak",
  1: "Weak",
  2: "Normal",
  3: "Overweight",
  4: "Obesity",
  5: "Extreme Obesity"
};

/* ===================== STATE ===================== */
let rawData = [];
let categoryChart, genderChart, indexChart, scatterChart;

/* ===================== THEME ===================== */
function isDark() {
  return document.body.classList.contains("dark");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  applyFilters(); // charts re-render for color change
}

/* ===================== LOAD DATA ===================== */
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    rawData = data;
    applyFilters();
  })
  .catch(err => {
    console.error("API Error:", err);
    alert("Backend API not running!");
  });

/* ===================== FILTER ===================== */
function applyFilters() {
  const gender = document.getElementById("genderFilter").value;
  const category = document.getElementById("categoryFilter").value;

  const filtered = rawData.filter(d =>
    (gender === "All" || d.gender === gender) &&
    (category === "All" || d.index == category)
  );

  updateStats(filtered);
  renderCharts(filtered);
}

/* ===================== STATS ===================== */
function updateStats(data) {
  document.getElementById("total").innerText = data.length;

  document.getElementById("male").innerText =
    data.filter(d => d.gender === "Male").length;

  document.getElementById("female").innerText =
    data.filter(d => d.gender === "Female").length;

  const avgBMI = data.length
    ? (data.reduce((s, d) => s + d.bmi, 0) / data.length).toFixed(1)
    : 0;

  document.getElementById("avgBMI").innerText = avgBMI;
}

/* ===================== CHARTS ===================== */
function renderCharts(data) {
  renderCategoryChart(data);
  renderGenderChart(data);
  renderIndexChart(data);
  renderScatterChart(data);
}

/* -------- CATEGORY PIE -------- */
function renderCategoryChart(data) {
  const counts = {};
  data.forEach(d => {
    const label = CATEGORY_MAP[d.index];
    counts[label] = (counts[label] || 0) + 1;
  });

  if (categoryChart) categoryChart.destroy();

  categoryChart = new Chart(categoryChartEl(), {
    type: "pie",
    data: {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: [
          "#36a2eb", "#ff6384", "#ffce56",
          "#ff9f40", "#4bc0c0", "#9966ff"
        ]
      }]
    },
    options: chartOptions()
  });
}

/* -------- GENDER DOUGHNUT -------- */
function renderGenderChart(data) {
  const male = data.filter(d => d.gender === "Male").length;
  const female = data.filter(d => d.gender === "Female").length;

  if (genderChart) genderChart.destroy();

  genderChart = new Chart(genderChartEl(), {
    type: "doughnut",
    data: {
      labels: ["Male", "Female"],
      datasets: [{
        data: [male, female],
        backgroundColor: ["#36a2eb", "#ff6384"]
      }]
    },
    options: chartOptions()
  });
}

/* -------- BMI INDEX BAR -------- */
function renderIndexChart(data) {
  const indexCounts = [0, 0, 0, 0, 0, 0];
  data.forEach(d => indexCounts[d.index]++);

  if (indexChart) indexChart.destroy();

  indexChart = new Chart(indexChartEl(), {
    type: "bar",
    data: {
      labels: Object.values(CATEGORY_MAP),
      datasets: [{
        label: "Count",
        data: indexCounts,
        backgroundColor: "#8a7cff"
      }]
    },
    options: chartOptions(true)
  });
}

/* -------- HEIGHT vs WEIGHT SCATTER -------- */
function renderScatterChart(data) {
  const maleData = data
    .filter(d => d.gender === "Male")
    .map(d => ({ x: d.height, y: d.weight }));

  const femaleData = data
    .filter(d => d.gender === "Female")
    .map(d => ({ x: d.height, y: d.weight }));

  if (scatterChart) scatterChart.destroy();

  scatterChart = new Chart(scatterChartEl(), {
    type: "scatter",
    data: {
      datasets: [
        { label: "Male", data: maleData, backgroundColor: "#36a2eb" },
        { label: "Female", data: femaleData, backgroundColor: "#ff6384" }
      ]
    },
    options: chartOptions(true)
  });
}

/* ===================== COMMON OPTIONS ===================== */
function chartOptions(withAxes = false) {
  const color = isDark() ? "#fff" : "#111";

  return {
    responsive: true,
    plugins: {
      legend: {
        labels: { color }
      }
    },
    scales: withAxes ? {
      x: {
        ticks: { color },
        title: { display: true, color }
      },
      y: {
        ticks: { color },
        title: { display: true, color }
      }
    } : {}
  };
}

/* ===================== CANVAS HELPERS ===================== */
function categoryChartEl() {
  return document.getElementById("categoryChart");
}
function genderChartEl() {
  return document.getElementById("genderChart");
}
function indexChartEl() {
  return document.getElementById("indexChart");
}
function scatterChartEl() {
  return document.getElementById("heightWeightChart");
}
