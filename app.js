let listDrawnNumbers = [];
const limit = 10;
let secretNumber;
let attempts;
const checkButton = document.querySelector("button");
const newGameButton = document.querySelector("#reiniciar");
const inputField = document.querySelector("input");

function fillElement(tag, text) {
    const selectedTag = document.querySelector(tag);
    selectedTag.innerHTML = text;

    if("speechSynthesis" in window) {
        let fala = new SpeechSynthesisUtterance(text);
        fala.lang = "pt-BR";
        fala.rate = 1.2;

        window.speechSynthesis.speak(fala);
    }
}

function setInitialMessage() {
    fillElement("h1", "Jogo do número secreto");
    fillElement("p", `Informe um número entre 1 e ${limit}`);    
}

function generateRandomNumber() {
    const drawnNumber = parseInt(Math.random() * limit + 1);
    const size = listDrawnNumbers.length;

    if(size === limit) {
        listDrawnNumbers = [];
    }

    if(listDrawnNumbers.includes(drawnNumber)) {
        return generateRandomNumber();
    } else {
        listDrawnNumbers.push(drawnNumber);
        return drawnNumber;
    }
}

function verifyGuessedNumber() {
    attempts++;
    const inputValue = Number(inputField.value);

    if(inputValue === secretNumber) {
        message(true);
        setButtons();
    } else if(inputValue > secretNumber) {
        message(false, "menor", inputValue);
    } else {
        message(false, "maior", inputValue);
    }
}


function message(win, detail, value) {
    if(win) {
        fillElement("h1", "Acertou!");
        fillElement("p", `Você adivinhou o número secreto com ${attempts} ${attempts > 1 ? "tentativas":"tentativa"}!`);
    } else {
        fillElement("h1", "Errou!");
        fillElement("p", `O número secreto é ${detail} que ${value}`);
        clearField();
    }
}

function clearField() {
    inputField.value = "";
    inputField.focus();
}

function setButtons() {
    newGameButton.toggleAttribute("disabled");
    checkButton.toggleAttribute("disabled");
}


function resetGame() {
    setInitialMessage();
    secretNumber = generateRandomNumber();
    attempts = 0;
    clearField();
    setButtons();
}

resetGame();