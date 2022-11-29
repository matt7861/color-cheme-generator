const body = document.querySelector("body");
const colorForm = document.getElementById("color-form");
const copiedPopup = document.getElementById("copied-popup");
const switchContainer = document.getElementById("switch-container");
const switchToggle = document.getElementById("switch-toggle");

let colorsArray = [];

colorForm.addEventListener("submit", getColors);
document.addEventListener("click", copyText);
switchContainer.addEventListener("click", toggleNight);

getColors();

function getColors(e) {
  if (e) e.preventDefault();

  const formData = new FormData(colorForm);
  const color = formData.get("seedColor").substring(1);
  const scheme = formData.get("schemeMode");
  const count = formData.get("colorCount");

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=${count}`
  )
    .then((res) => res.json())
    .then((data) => {
      colorsArray = data.colors;

      renderColors();
    });
}

function renderColors() {
  const hexColors = colorsArray
    .map((colors) => {
      return `<div class="panels__color" style="background-color:${colors.hex.value}">
        <div class="panels__hex">${colors.hex.value}</div>
      </div>`;
    })
    .join("");

  document.getElementById("panels").innerHTML = hexColors;
}

function copyText(e) {
  if (e.target.classList == "panels__hex") {
    navigator.clipboard.writeText(e.target.innerHTML);

    if (copiedPopup.classList.contains("display")) {
      copiedPopup.classList.remove("display");
    } else {
      copiedPopup.classList.add("display");
      setTimeout(() => {
        copiedPopup.classList.remove("display");
      }, 1000);
    }
  }
}

function toggleNight() {
  switchToggle.classList.toggle("switched-on");
  body.classList.toggle("night");
}
