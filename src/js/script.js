const timeElement = document.getElementById("time");
const bodyElement = document.getElementById("main");
const h1Element = document.createElement("h1");
const dateELement = document.createElement("input")
dateELement.id = "datePicker"
dateELement.name = "datePicker"
dateELement.type = "date"
bodyElement.append(dateELement)
bodyElement.append(h1Element)
h1Element.innerText = "Mi cumpleaños"

let fechaCumple = new Date("2024-11-29T00:00:00")
let fechaActual = new Date()
let diferencia = fechaCumple - fechaActual;

let msSegundos = 1000
let msMinutos = msSegundos * 60
let msHoras = msMinutos * 60
let msDias = msHoras * 24

// Calcular los días, horas, minutos y segundos
let dias = Math.floor(diferencia / msDias)
let horas = Math.floor((diferencia % msDias) / msHoras)
let minutos = Math.floor((diferencia % msHoras) / msMinutos)
let segundos = Math.floor((diferencia % msMinutos) / msSegundos)

// Calcular meses asumiendo que todos tienen 30 días
let meses = Math.floor(dias / 30)
dias = dias % 30; // Días restantes después de contar meses



let counter = setInterval(() => {
  // Decrementar segundos
  segundos--
  
  if (segundos < 0) {
    segundos = 59
    minutos--;
  }

  if (minutos < 0) {
    minutos = 59
    horas--
  }

  if (horas < 0) {
    horas = 23
    dias--
  }

  if (dias < 0) {
    dias = 29 
    meses--
  }

  // Detener el contador si el tiempo llega a cero
  if (meses < 0) {
    clearInterval(counter)
    timeElement.innerText = "FELICIDADES!"
    return
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

  // Cambiar clases de color según el tiempo restante
  if (meses >= 1) {
    timeElement.classList.remove("orangeColor", "redColor")
    timeElement.classList.add("greenColor")
  } else if (dias > 7) {
    timeElement.classList.remove("greenColor", "redColor")
    timeElement.classList.add("orangeColor")
  } else {
    timeElement.classList.remove("greenColor", "orangeColor")
    timeElement.classList.add("redColor")
  }
  
}, 1000)

dateElement.addEventListener("change", () => {
    if (dateElement.value) {
        fechaCumple = new Date(dateElement.value + "T00:00:00"); // Actualizar la fecha
    }
})
