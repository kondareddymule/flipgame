const container = document.getElementById('container');
const match = document.getElementById('match');
const flipCountDisplay = document.getElementById('flipCount');

let array = [1, 2, 3, 4, 5, 6, 7, 8];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(array);

let list = [1, 2, 3, 4, 5, 6, 7, 8];

function shufflelist(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
}
shufflelist(list);

let firstClickedId = null;
let matchedIds = new Set();
let isProcessing = false;
let flippedCards = [];
let flipCount = 0;
const maxFlips = 30;

array.forEach((item) => {
    const main = document.createElement('div');
    main.classList.add('main');
    const containerdiv = document.createElement('div');
    containerdiv.classList.add('main-in');
    const empty = document.createElement('div');
    empty.classList.add('empty');
    containerdiv.appendChild(empty);
    const div = document.createElement('div');
    div.id = `array${item}`;
    div.classList.add('box');
    div.classList.add(`box${item}`);
    div.textContent = item;
    containerdiv.appendChild(div);
    main.appendChild(containerdiv);
    container.appendChild(main);
    main.addEventListener('click', opencard);
});

list.forEach((item) => {
    const matchmain = document.createElement('div');
    matchmain.classList.add('main');
    const matchin = document.createElement('div');
    matchin.classList.add('main-in');
    const matchempty = document.createElement('div');
    matchempty.classList.add('empty');
    matchin.appendChild(matchempty);
    const div = document.createElement('div');
    div.id = `list${item}`;
    div.classList.add('box');
    div.classList.add(`box${item}`);
    div.textContent = item;
    matchin.appendChild(div);
    matchmain.appendChild(matchin);
    match.appendChild(matchmain);
    match.addEventListener('click', matchcard);
});

function flipCard(card) {
    card.classList.add('flipped');
    flippedCards.push(card);
    flipCount++;
    flipCountDisplay.textContent = flipCount;
}

function unflipCard(card) {
    card.classList.remove('flipped');
}

function check(clickedItem) {
    let classname = clickedItem.className;
    let styleItem = classname.split(' ')[1];

    clickedItem.style.pointerEvents = 'none';
    clickedItem.removeEventListener('click', opencard);
    clickedItem.removeEventListener('click', matchcard);

    if (!firstClickedId) {
        firstClickedId = styleItem;
    } else {
        isProcessing = true;
        if (firstClickedId === styleItem) {
            let allElementsWithClass = document.querySelectorAll(`.${styleItem}`);
            allElementsWithClass.forEach(element => {
                element.style.backgroundColor = "green";
                element.style.border = "2px solid black";
                matchedIds.add(element.id);
            });

            flippedCards = [];
            firstClickedId = null;

            setTimeout(() => {
                isProcessing = false;
            }, 1000);

            if (matchedIds.size === array.length + list.length) {
                setTimeout(() => {
                    alert("Congratulations! You've matched all the cards!");
                    resetGame();
                }, 500);
            }
        } else {
            firstClickedId = null;

            setTimeout(() => {
                flippedCards.forEach(card => {
                    unflipCard(card);
                    reEnableClick(card);
                });
                flippedCards = [];
                isProcessing = false;
            }, 1000);
        }
    }

    if (flipCount >= maxFlips) {
        setTimeout(() => {
            alert("You lost! You've exceeded the max number of flips.");
            resetGame();
        }, 500);
    }
}

function reEnableClick(card) {
    card.style.pointerEvents = 'auto';
    card.addEventListener('click', opencard);
    card.addEventListener('click', matchcard);
}

function opencard(event) {
    if (isProcessing || flipCount >= maxFlips) return;

    let arrayItem = event.target;

    if (!arrayItem.classList.contains('box') || arrayItem.classList.contains('flipped')) return;

    if (matchedIds.has(arrayItem.id)) return;

    flipCard(arrayItem);
    check(arrayItem);
}

function matchcard(event) {
    if (isProcessing || flipCount >= maxFlips) return;

    let listItem = event.target;

    if (!listItem.classList.contains('box') || listItem.classList.contains('flipped')) return;

    if (matchedIds.has(listItem.id)) return;

    flipCard(listItem);
    check(listItem);
}

function resetGame() {
    matchedIds.clear();
    flippedCards = [];
    flipCount = 0;
    flipCountDisplay.textContent = flipCount; 
    shuffleArray(array);
    shufflelist(list);

    container.innerHTML = '';
    match.innerHTML = '';

    array.forEach((item) => {
        const main = document.createElement('div');
        main.classList.add('main');
        const containerdiv = document.createElement('div');
        containerdiv.classList.add('main-in');
        const empty = document.createElement('div');
        empty.classList.add('empty');
        containerdiv.appendChild(empty);
        const div = document.createElement('div');
        div.id = `array${item}`;
        div.classList.add('box');
        div.classList.add(`box${item}`);
        div.textContent = item;
        containerdiv.appendChild(div);
        main.appendChild(containerdiv);
        container.appendChild(main);
        main.addEventListener('click', opencard);
    });

    list.forEach((item) => {
        const matchmain = document.createElement('div');
        matchmain.classList.add('main');
        const matchin = document.createElement('div');
        matchin.classList.add('main-in');
        const matchempty = document.createElement('div');
        matchempty.classList.add('empty');
        matchin.appendChild(matchempty);
        const div = document.createElement('div');
        div.id = `list${item}`;
        div.classList.add('box');
        div.classList.add(`box${item}`);
        div.textContent = item;
        matchin.appendChild(div);
        matchmain.appendChild(matchin);
        match.appendChild(matchmain);
        match.addEventListener('click', matchcard);
    });
}
