const timeElement = document.getElementById("time");
const bodyElement = document.getElementById("main");
const h1Element = document.createElement("h1");
const dateElement = document.createElement("input");

dateElement.id = "datePicker";
dateElement.name = "datePicker";
dateElement.type = "date";

bodyElement.append(dateElement);
bodyElement.append(h1Element);
h1Element.innerText = "Mi cumpleaños";

let fechaCumple = new Date("2024-11-29T00:00:00");
let fechaActual = new Date();
let diferencia = fechaCumple - fechaActual;

const msSegundos = 1000;
const msMinutos = msSegundos * 60;
const msHoras = msMinutos * 60;
const msDias = msHoras * 24;

let dias, horas, minutos, segundos, meses;

function calcularDiferencia() {
  fechaActual = new Date();
  diferencia = fechaCumple - fechaActual;

  // Calcular los días, horas, minutos y segundos
  dias = Math.floor(diferencia / msDias);
  horas = Math.floor((diferencia % msDias) / msHoras);
  minutos = Math.floor((diferencia % msHoras) / msMinutos);
  segundos = Math.floor((diferencia % msMinutos) / msSegundos);

  // Calcular meses asumiendo que todos tienen 30 días
  meses = Math.floor(dias / 30);
  dias = dias % 30; // Días restantes después de contar meses
}

function actualizarContador() {
  segundos--;

  if (segundos < 0) {
    segundos = 59;
    minutos--;
  }

  if (minutos < 0) {
    minutos = 59;
    horas--;
  }

  if (horas < 0) {
    horas = 23;
    dias--;
  }

  if (dias < 0) {
    dias = 29;
    meses--;
  }

  if (meses < 0) {
    clearInterval(counter);
    timeElement.innerText = "FELICIDADES!"
    timeElement.classList.remove("orangeColor", "redColor", "greenColor");
    timeElement.classList.add("felicidades");;
    return;
  }

  timeElement.innerText =
    meses +
    " Meses " +
    dias +
    " Días " +
    horas +
    " Horas " +
    minutos +
    " Minutos " +
    segundos +
    " Segundos";

  // Cambiar color dependiendo del tiempo que quede
  if (meses >= 1) {
    timeElement.classList.remove("orangeColor", "redColor");
    timeElement.classList.add("greenColor");
  } else if (dias > 7) {
    timeElement.classList.remove("greenColor", "redColor");
    timeElement.classList.add("orangeColor");
  } else {
    timeElement.classList.remove("greenColor", "orangeColor");
    timeElement.classList.add("redColor");
  }
}

let counter = setInterval(() => {
  actualizarContador();
}, 1000);

// Actualizar la fecha de cumpleaños y reiniciar el contador
dateElement.addEventListener("change", () => {
  if (dateElement.value) {
    fechaCumple = new Date(dateElement.value + "T00:00:00"); // Actualizar la fecha de cumpleaños
    calcularDiferencia(); // Recalcular la diferencia basada en la nueva fecha
  }
});

calcularDiferencia();
