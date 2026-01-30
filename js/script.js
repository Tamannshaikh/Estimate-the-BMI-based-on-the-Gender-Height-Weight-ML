function goToBMI() {
  window.location.href = "bmi.html";
}

function toggleTheme() {
  const body = document.body;
  const toggleIcon = document.querySelector(".theme-toggle");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    toggleIcon.textContent = "☀️";
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    toggleIcon.textContent = "🌙";
  }
}
