'use strict';

const scoreEl = document.querySelector('#scores-total');
const guessEl = document.querySelector('#guesses-left');

const startbtnEl = document.querySelector('.start-button');
const resetbtnEl = document.querySelector('.reset-button');
const easybtnEl = document.querySelector('.easy-button');
const hardbtnEl = document.querySelector('.hard-button');
const hellbtnEl = document.querySelector('.hell-button');
const celebbtnEl = document.querySelector('.celeb-button');
const citybtnEl = document.querySelector('.city-button');
const foodbtnEl = document.querySelector('.food-button');

const cityWords = ['Bangladesh', 'London', 'Paris'];
const foodWords = ['Pizza', 'Burger', 'Bolognese'];
const celebWords = ['Brad Pitt', 'Seth Rogen', 'Britney Spears'];

let score, guess, playing, answer, categoryPicked;

const init = function () {
  score = 0;
  guess = 10;
  playing = true;

  scoreEl.textContent = 0;
  guessEl.textContent = 10;
};

startbtnEl.addEventListener('click', function () {
  init();
});

const hangman = function () {
  randomize();
};

foodbtnEl.addEventListener('click', function () {
  categoryPicked = foodWords;
  console.log('Food topic picked succesfully.');
  console.log(categoryPicked);
  hangman();
});

celebbtnEl.addEventListener('click', function () {
  categoryPicked = celebWords;
  console.log('Celeb topic picked succesfully.');
  console.log(categoryPicked);
});

citybtnEl.addEventListener('click', function () {
  categoryPicked = cityWords;
  console.log('City topic picked succesfully.');
  console.log(categoryPicked);
});

const randomize = function () {
  for (let i = 0; i > categoryPicked.length; i++) {
    answer = categoryPicked[Math.floor(Math.random() * categoryPicked.length)];
    console.log(answer);
    debugger;
  }
};
