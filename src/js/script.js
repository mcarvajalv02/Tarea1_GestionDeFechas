const timeElement = document.getElementById("time");
const bodyElement = document.getElementById("main");
const h1Element = document.createElement("h1");
const dateElement = document.createElement("input");

dateElement.id = "datePicker";
dateElement.name = "datePicker";
dateElement.type = "date";

bodyElement.append(dateElement);
bodyElement.append(h1Element);
h1Element.innerText = "My birthday";

let dateBirthday = new Date("2024-11-29T00:00:00");
let currentDate = new Date();
let diferencia = dateBirthday - currentDate;

const msSeconds = 1000
const msMinutes = msSeconds * 60
const msHours = msMinutes * 60
const msDays = msHours * 24

let days 
let hours
let minutes
let seconds
let months

function calculateDifference() {
  currentDate = new Date();
  diferencia = dateBirthday - currentDate;

  // Calcular los días, horas, minutos y segundos
  days = Math.floor(diferencia / msDays);
  hours = Math.floor((diferencia % msDays) / msHours);
  minutes = Math.floor((diferencia % msHours) / msMinutes);
  seconds = Math.floor((diferencia % msMinutes) / msSeconds);

  // Calcular meses asumiendo que todos tienen 30 días
  months = Math.floor(days / 30);
  days = days % 30; // Días restantes después de contar meses
}

function updateCounter() {
  seconds--;

  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }

  if (minutes < 0) {
    minutes = 59;
    hours--;
  }

  if (hours < 0) {
    hours = 23;
    days--;
  }

  if (days < 0) {
    days = 29;
    months--;
  }

  if (months < 0) {
    clearInterval(counter);
    timeElement.innerText = "HAPPY BIRTHDAY!!"
    timeElement.classList.remove("orangeColor", "redColor", "greenColor");
    timeElement.classList.add("felicidades");;
    return;
  }

  timeElement.innerText =
    months +
    " Months " +
    days +
    " Days " +
    hours +
    " Hours " +
    minutes +
    " Minutes " +
    seconds +
    " Seconds";

  // Cambiar color dependiendo del tiempo que quede
  if (months >= 1) {
    timeElement.classList.remove("orangeColor", "redColor");
    timeElement.classList.add("greenColor");
  } else if (days > 7) {
    timeElement.classList.remove("greenColor", "redColor");
    timeElement.classList.add("orangeColor");
  } else {
    timeElement.classList.remove("greenColor", "orangeColor");
    timeElement.classList.add("redColor");
  }
}

let counter = setInterval(() => {
  updateCounter();
}, 1000);

// Actualizar la fecha de cumpleaños y reiniciar el contador
dateElement.addEventListener("change", () => {
  if (dateElement.value) {
    dateBirthday = new Date(dateElement.value + "T00:00:00"); // Actualizar la fecha de cumpleaños
    calculateDifference(); // Recalcular la diferencia basada en la nueva fecha
  }
});

calculateDifference();
