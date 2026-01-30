let gender = "Male";

function selectGender(btn) {
  document.querySelectorAll(".gender").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  gender = btn.innerText;
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function calculateIdealWeight() {
  let height = parseFloat(document.getElementById("height").value);
  let weight = parseFloat(document.getElementById("weight").value);
  let hUnit = document.getElementById("heightUnit").value;
  let wUnit = document.getElementById("weightUnit").value;

  if (hUnit === "ft") height *= 30.48;
  if (hUnit === "inch") height *= 2.54;
  if (wUnit === "lbs") weight *= 0.453592;

  let base = gender === "Male" ? 50 : 45.5;
  let ideal = base + 0.9 * (height - 152);
  let min = (ideal - 5).toFixed(1);
  let max = (ideal + 5).toFixed(1);

  document.getElementById("placeholder").style.display = "none";
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("rangeText").innerText = `${min} - ${max} kg`;
  document.getElementById("currentText").innerText = `${weight} kg`;
  document.getElementById("minText").innerText = `Min: ${min} kg`;
  document.getElementById("maxText").innerText = `Max: ${max} kg`;

  let status = "Within Ideal Range";
  let rec = "Maintain a balanced diet and regular physical activity.";

  if (weight < min) {
    status = "Below Ideal Range";
    rec = "Increase calorie intake with healthy nutrition.";
  } else if (weight > max) {
    status = "Above Ideal Range";
    rec = "Focus on cardio exercises and calorie control.";
  }

  document.getElementById("statusText").innerText = status;
  document.getElementById("recommendation").innerText = rec;
}
