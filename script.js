const menu = document.getElementById('menu')
const titleText = document.getElementById('title-text')
const cardsHorizontal = document.getElementById('horizontalValue')
const btnSet = document.getElementById('btn-value')
const cards = document.getElementById('cards')
const cardsValue = document.getElementById('cardsValue')
let timer = document.createElement('div')
let card = document.getElementsByClassName('card')
let id = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
let gameId = []
let openedCards = []

function startTimer() {
  if (timer.innerHTML < 1) {
    location.reload();
  } else {
    timer.innerHTML--;
  }
}

function shuffle(gameId) {                    //Перемешка массива
  gameId.sort(() => Math.random() - 0.5);
}

let couple = false,
  firstCard = null,
  secondCard = null,
  thirdCard = null

btnSet.addEventListener('click', function () {
  menu.style.display = 'none';
  titleText.textContent = 'Игра началась';
  cardsValue.append(timer);
  cardsValue.style.display = 'flex';
  cardsValue.style.flexDirection = 'column';
  cardsValue.style.alignItems = 'center'

  setInterval(startTimer, 1000);
  timer.innerHTML = '60';

  if (cardsHorizontal.value % 2 != 0 || cardsHorizontal > 20 || cardsHorizontal < 2) {
    cardsHorizontal.value = 4;
  }

  for (let i = 0; i < parseInt(cardsHorizontal.value); i++) {
    gameId.push(id[i]);
  }

  shuffle(gameId);

  for (let i = 0; i < parseInt(cardsHorizontal.value); i++) { //Создание карточек

    let createCards = document.createElement('div');

    createCards.classList.add('card');
    createCards.id += gameId[i];
    cards.append(createCards)

    createCards.style.display = 'flex';
    createCards.style.justifyContent = 'center';
    createCards.style.alignItems = 'center';
    createCards.style.fontSize = '100px';

    createCards.addEventListener('click', function (e) {

      createCards.classList.add('open');

      if (firstCard == null) {
        firstCard = e.target
        openedCards.push(firstCard.id)
      } else if (secondCard == null) {
        secondCard = e.target
        openedCards.push(secondCard.id)
      } else if (thirdCard == null) {
        thirdCard = e.target
        openedCards.push(thirdCard.id)
      }

      if (firstCard !== null && secondCard !== null) {
        if (firstCard.id == secondCard.id) {
          firstCard.classList.add('couple');
          secondCard.classList.add('couple');
          secondCard.classList.add('open');
          firstCard = null
          secondCard = null
          thirdCard = null
          openedCards.pop()
          openedCards.pop()
        } else if (firstCard.id !== secondCard.id && openedCards.length == 3) {
          firstCard.classList.remove('open')
          secondCard.classList.remove('open')
          firstCard.textContent = ''
          secondCard.textContent = ''
          firstCard.style.pointerEvents = 'stroke'
          secondCard.style.pointerEvents = 'stroke'
          firstCard = null
          secondCard = null
          firstCard = thirdCard
          thirdCard = null
          openedCards.pop()
          openedCards.pop()
        }
      }

      if (createCards.classList.contains('open')) {
        createCards.textContent = gameId[i];
        createCards.style.pointerEvents = 'none'
      } else {
        createCards.textContent = '';
      }

    })
  }

});
