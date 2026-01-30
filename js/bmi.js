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

function calculateBMI() {
  let height = parseFloat(document.getElementById("height").value);
  let weight = parseFloat(document.getElementById("weight").value);
  let hUnit = document.getElementById("heightUnit").value;
  let wUnit = document.getElementById("weightUnit").value;

  if (hUnit === "ft") height *= 30.48;
  if (hUnit === "inch") height *= 2.54;
  if (wUnit === "lbs") weight *= 0.453592;

  let bmi = weight / ((height / 100) ** 2);
  bmi = bmi.toFixed(1);

  let index = 0;
  if (bmi >= 16) index = 1;
  if (bmi >= 18.5) index = 2;
  if (bmi >= 25) index = 3;
  if (bmi >= 30) index = 4;
  if (bmi >= 35) index = 5;

  const map = {
    0: "Extremely Weak",
    1: "Weak",
    2: "Normal",
    3: "Overweight",
    4: "Obesity",
    5: "Extreme Obesity"
  };

  document.getElementById("placeholder").style.display = "none";
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("bmiValue").innerText = bmi;
  document.getElementById("bmiStatus").innerText = map[index];
  document.getElementById("bmiIndex").innerText = `BMI Index: ${index} / 5`;
  document.getElementById("bmiInfo").innerText =
    `Your BMI category is "${map[index]}".`;
}

