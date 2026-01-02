const gameBoard = document.getElementById("game-board");
const movimientos = document.getElementById("moves");
const resetGame = document.getElementById("resetGame");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;
let clicks = 0;
let matchesFound = 0;
let tiempo = 0;
let intervalo = null;
let gameStarted = false;
const soundFlip = new Audio('sounds/card-flip.mp3');
const winner = new Audio('sounds/winner.mp3');
const acierto = new Audio('sounds/acierto.mp3');
const timer = document.getElementById("timer");


const cartasBase = [
    { nombre: 'arcoiris', ruta: 'img/arcoiris.png' },
    { nombre: 'corazon', ruta: 'img/corazon.png' },
    { nombre: 'flor', ruta: 'img/flor.png' },
    { nombre: 'helado', ruta: 'img/helado.png' },
    { nombre: 'hongo', ruta: 'img/hongo.png' },
    { nombre: 'huevo', ruta: 'img/huevo.png' },
    { nombre: 'nube', ruta: 'img/nube.png' },
    { nombre: 'sol', ruta: 'img/sol.png' }
];

const cartas = [...cartasBase, ...cartasBase];
barajar(cartas);
generarTablero();

//console.log(cartas);

function generarTablero() {

    cartas.forEach(carta => {
        gameBoard.innerHTML += `
        <div class="card perspective-1000 cursor-pointer w-full h-full relative group" data-name="${carta.nombre}">
            <div class="card-inner relative w-full h-full transition-transform duration-500 preserve-3d">
                
                <div class="card-back absolute inset-0 backface-hidden bg-indigo-600 rounded-xl border-2 border-indigo-400 flex items-center justify-center overflow-hidden shadow-lg">
                    <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(white 1px, transparent 0); background-size: 10px 10px;"></div>
                    <span class="text-2xl font-bold text-indigo-200 opacity-50">?</span>
                </div>

                <div class="card-front absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl border-2 border-white flex items-center justify-center shadow-xl">
                    <span class="text-4xl text-slate-800 font-bold"><img src="${carta.ruta}"></span>
                </div>
                
            </div>
        </div>
    `;
    });

}

function barajar(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

gameBoard.addEventListener("click", function (e) {
    e.preventDefault();
    if (!e.target.closest('.card')) {
        return;
    }

    if (gameStarted === false) {
        iniciarCronometro();
        gameStarted = true;
    }

    const childCart = e.target.closest('.card');

    if (lockBoard == true) {
        return;
    }

    if (childCart === firstCard) {
        return;
    }

    soundFlip.play();

    childCart.querySelector('.card-inner').classList.toggle('is-flipped');
    if (hasFlippedCard === false) {
        hasFlippedCard = true;
        firstCard = childCart;
        return;
    }

    secondCard = childCart;
    checkForMatch();
    clicks++;

    movimientos.innerHTML = clicks;

});

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch === true) {
        acierto.play();
        disableCards();
        matchesFound++;
        if (matchesFound == 8) {
            clearInterval(intervalo);
            winner.play();
            setTimeout(() => {
                Swal.fire({
                    title: "¡Ganaste!",
                    text: "Has encontrado todas las parejas",
                    icon: "success",
                    confirmButtonText: 'Jugar de nuevo'
                }).then((result) => {
                    if (result.isConfirmed) {
                        reiniciarJuego();
                    }
                });
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.querySelector('.card-inner').classList.remove("is-flipped");
        secondCard.querySelector('.card-inner').classList.remove("is-flipped");
        resetBoard();
    }, 1200);
}

function disableCards() {
    firstCard.style.pointerEvents = "none";
    secondCard.style.pointerEvents = "none";
    resetBoard();
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function reiniciarJuego() {
    resetBoard();
    matchesFound = 0;
    clicks = 0;
    timer.innerHTML = '00:00';
    tiempo = 0;
    clearInterval(intervalo);
    gameStarted = false;
    movimientos.innerHTML = clicks;
    gameBoard.innerHTML = '';
    barajar(cartas);
    generarTablero();
}

resetGame.addEventListener("click", function (e) {
    e.preventDefault();
    reiniciarJuego();
});

function iniciarCronometro() {
    intervalo = setInterval(function () {
        tiempo++;

        const minutos = Math.floor(tiempo / 60);
        const segundos = tiempo % 60;

        timer.innerHTML =
            String(minutos).padStart(2, '0') +
            ':' +
            String(segundos).padStart(2, '0');

    }, 1000);
}