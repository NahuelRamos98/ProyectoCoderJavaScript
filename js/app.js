/* Lista De Usuarios */

let listaDeUsuarios = [{
    nombre: "Nahuel",
    edad: 24,
    horasDeEstudio: 4,
    diasDeEstudio: ["Lunes, Miercoles, Viernes"]
},{
    nombre: "Jorge",
    edad: 20,
    horasDeEstudio: 2,
    diasDeEstudio: ["Lunes, Viernes"]
},{
    nombre: "Miguel",
    edad: 31,
    horasDeEstudio: 5,
    diasDeEstudio: ["Lunes, Miercoles, Viernes"]
},{
    nombre: "Nicolas",
    edad: 26,
    horasDeEstudio: 1,
    diasDeEstudio: ["Lunes, Miercoles, Viernes, Sabado"]
}]

localStorage.setItem("Usuarios",JSON.stringify(listaDeUsuarios))

listaDeUsuarios = JSON.parse(localStorage.getItem("Usuarios"))

listaDeUsuarios.forEach(element =>{
    let elements = document.getElementById("usuRecientes");
    let div = document.createElement("div");
    div.classList.add("listadiv")
    div.innerHTML ="Nombre: "+ element.nombre + "<br>Edad: "+ element.edad+ "<br>Horas de estudio: "+ element.horasDeEstudio + "<br>Dias de estudio: "+ element.diasDeEstudio;
    elements.appendChild(div);
});

//POMO//

function conjuntoDeVariables() {
     workTime = workTimerInput.value; 
     breakTime = breakTimerInput.value;
     restTime = restTimeInput.value; 
     cyclesGoal = cyclesInput.value;
     timesCompleted = 0;
     cyclesCompleted = 0;
   
};

/* Conexion Front */

let clock = document.getElementById("reloj");
let cyclesInput = document.getElementById("ciclos-input");
let startButton = document.getElementById("start-button");
let workTimerInput = document.getElementById("work-time");
let breakTimerInput = document.getElementById ("break-time");
let restTimeInput = document.getElementById("rest-time");

function isResetTime(){
    return timesCompleted == 7;
}

function goalReached() {
    return cyclesGoal == cyclesCompleted;
}

function startTime() {
    console.log("Started");
    pomodoroController();
}

startButton.onclick = () => {
    conjuntoDeVariables();
    startTime();
    toastr["info"]("Si no vas hasta el final ¿por qué empezar?", "Recuerda...")
};



// TIMER //

let currentTime = 1;
let seconds = 0;
let = clockMinutes;
let = clockSeconds;

function updateClock() {
    clockMinutes = formatNumbers(currentTime);
    clockSeconds = formatNumbers(seconds);
    clock.innerHTML = clockMinutes + ":" + clockSeconds;
}

function formatNumbers(time) {
    let formattedDigits;
    if (time < 10) {
        formattedDigits = "0" + time;
    } else {
        formattedDigits = time;
    }
    return formattedDigits;
}
function timer() {
    if(currentTime > 0 || seconds > 0){
    if(seconds == 0){
        seconds = 59;
        currentTime--;
    } else{
        seconds--;
    }
    updateClock();
    console.log(currentTime, seconds);
    interval = setTimeout(timer, 1000);
} else {
        pomodoroController();
    }
};

function pomodoroController() {
    if (isResetTime()) {
        cyclesCompleted++;
        if (!goalReached()) {
            currentTime = restTime; 
            timer();
            timesCompleted = 0;
        } else {
            console.log("LLegaste")
        }
        return;
    }
    if (timesCompleted % 2 ==0){
        currentTime = workTime;
        timesCompleted++;
        timer();
        console.log("Tiempo de trabajar TC : " + timesCompleted + " Ciclos: " + cyclesCompleted);
    } else {
        toastr["warning"]("Tiempo de descansar", "Uff")
        currentTime = breakTime;
        timesCompleted++;
        timer();
        console.log("Tiempo de descanso TC : " + timesCompleted + " Ciclos: " + cyclesCompleted);
    }
}
