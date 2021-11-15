'use strict';

const winsEl = document.querySelector('#wins-total');
const lossesEl = document.querySelector('#losses-total');
const guessEl = document.querySelector('#guesses-left');
const answerEl = document.querySelector('.picked-word');
const guessedEl = document.querySelector('.guessed-letter');
const guessedcorrectEl = document.querySelector('.guessed-letter-correct');
const hiddenEl = document.querySelector('.hidden');

const startbtnEl = document.querySelector('.start-button');
const resetbtnEl = document.querySelector('.reset-button');
const easybtnEl = document.querySelector('.easy-button');
const hardbtnEl = document.querySelector('.hard-button');
const hellbtnEl = document.querySelector('.hell-button');
const celebbtnEl = document.querySelector('.celeb-button');
const citybtnEl = document.querySelector('.city-button');
const foodbtnEl = document.querySelector('.food-button');
const difficultyEl = document.getElementById('difficulty');

const cityWords = ['BANGLADESH', 'LONDON', 'PARIS'];
const foodWords = ['Pizza', 'Burger', 'Bolognese'];
const celebWords = ['Brad Pitt', 'Seth Rogen', 'Britney Spears'];

const gallowEl = document.getElementById('hanging-id');

gallowEl.addEventListener('load', function () {
  let head = gallowEl.contentDocument;
  const headEl = head.getElementById('head');
  headEl.classList.add('hidden');
});

const groundEl = document.getElementById('ground');

let score = 0;
let remaining = 0;
let guess,
  guessedLetters,
  answerArr,
  playing,
  answer,
  categoryPicked,
  userInput;

const init = function () {
  guess = 6;
  guessEl.textContent = guess;
  remaining = 0;

  answerArr = [];
  guessedLetters = [];

  answer = cityWords[Math.floor(Math.random() * cityWords.length)];

  for (var i = 0; i < answer.length; i++) {
    answerArr[i] = '_';
  }

  console.log(answer);
  answerEl.textContent = answerArr.join(' ');

  playerguess();
};

resetbtnEl.addEventListener('click', function () {
  location.reload();
});

startbtnEl.addEventListener('click', function () {
  init();
});

const playerguess = function () {
  document.addEventListener('keydown', function (event) {
    userInput = event.key.toUpperCase();

    for (var i = 0; i < answerArr.length; i++) {
      if (userInput === answer[i]) {
        remaining++;
        guessedLetters = userInput;
        console.log(guessedLetters);
        answerArr[i] = userInput;
        answerEl.textContent = answerArr.join(' ');

        console.log('Guess is right');
        console.log(answerArr);
        console.log(`Remaining: ${remaining} `);
        if (remaining == answerArr.length) {
          console.log('Winner!!');
          score += 1;
          winsEl.textContent = score;
        }
      }
    }
  });
};

// else {
//   console.log('Guess is wrong...');
//   guess--;
//   guessEl.textContent = guess;
//   guessedEl.textContent += userInput;
//   break;
// }
// const difficulty = function () {
// easybtnEl.addEventListener('click', function () {
//   console.log('Ez mode active');
//   guessEl.textContent = 10;
//   guessEl.textContent = guess;
//   init();
// });
// hardbtnEl.addEventListener('click', function () {
//   console.log('Hard mode activated.');
//   guessEl.textContent = 5;
//   guessEl.textContent = guess;
// });
// hellbtnEl.addEventListener('click', function () {
//   console.log('Holy hell..');
//   guessEl.textContent = 1;
//   guessEl.textContent = guess;
// });
// };

// const hangman = function () {
//   randomize();
// };

// foodbtnEl.addEventListener('click', function () {
//   categoryPicked = foodWords;
//   console.log('Food topic picked succesfully.');
//   console.log(categoryPicked);
//   hangman();
// });

// celebbtnEl.addEventListener('click', function () {
//   categoryPicked = celebWords;
//   console.log('Celeb topic picked succesfully.');
//   console.log(categoryPicked);
// });

// citybtnEl.addEventListener('click', function () {
//   categoryPicked = cityWords;
//   console.log('City topic picked succesfully.');
//   console.log(categoryPicked);
// });

// const randomize = function () {
//   for (let i = 0; i > categoryPicked.length; i++) {
//     answer = categoryPicked[Math.floor(Math.random() * categoryPicked.length)];
//     console.log(answer);
//     debugger;
//   }
// };
