'use strict';

const winsEl = document.querySelector('#wins-total');
const lossesEl = document.querySelector('#losses-total');
const guessEl = document.querySelector('#guesses-left');
const answerEl = document.querySelector('.picked-word');
const guessedEl = document.querySelector('.guessed-letter');
const guessedcorrectEl = document.querySelector('.guessed-letter-correct');
const hiddenEl = document.querySelector('.hidden');
const bottomtextEl = document.querySelector('.bottom-desc');

const startbtnEl = document.querySelector('.start-button');
const resetbtnEl = document.querySelector('.reset-button');
const easybtnEl = document.querySelector('.easy-button');
const hardbtnEl = document.querySelector('.hard-button');
const hellbtnEl = document.querySelector('.hell-button');
const celebbtnEl = document.querySelector('.celeb-button');
const citybtnEl = document.querySelector('.city-button');
const foodbtnEl = document.querySelector('.food-button');
const difficultyEl = document.getElementById('difficulty');

const cityWords = [
  'BANGLADESH',
  'LONDON',
  'PARIS',
  'NEW YORK',
  'NEW DELHI',
  'GÖTEBORG',
  'CHICAGO',
  'TOKYO',
  'STOCKHOLM',
];
const foodWords = ['Pizza', 'Burger', 'Bolognese'];
const celebWords = ['Brad Pitt', 'Seth Rogen', 'Britney Spears'];

const gallowEl = document.querySelector('.hanging-man');
const scaffoldEl = document.querySelector('.scaffold');
const headEl = document.querySelector('.head');
const bodyEl = document.querySelector('.body');
const armsEl = document.querySelector('.arms');
const legsEl = document.querySelector('.legs');
const groundEl = document.querySelector('.ground');

let score = 0;
let remaining = 0;
let loss = 0;
let win = 0;
let guess,
  correctLetters,
  wrongLetters,
  answerArr,
  playing,
  answer,
  categoryPicked,
  userInput;

resetbtnEl.addEventListener('click', function () {
  location.reload();
});

startbtnEl.addEventListener('click', function () {
  init();
});

const init = function () {
  guess = 6;
  score = 0;
  remaining = 0;

  playing = true;

  answerArr = [];
  correctLetters = [];
  wrongLetters = [];

  answer = cityWords[Math.floor(Math.random() * cityWords.length)];
  for (var i = 0; i < answer.length; i++) {
    answerArr[i] = '_';
  }

  answerEl.textContent = answerArr.join(' ');
  guessedEl.textContent = '';
  guessEl.textContent = guess;
  bottomtextEl.textContent = 'Press a key to make a guess.';

  document.removeEventListener('keydown', function (event) {});
  hideLimbs();
  playerguess();

  // console.log(answer);
};

const hideLimbs = function () {
  groundEl.classList.add('hidden');
  scaffoldEl.classList.add('hidden');
  headEl.classList.add('hidden');
  bodyEl.classList.add('hidden');
  armsEl.classList.add('hidden');
  legsEl.classList.add('hidden');
};
const showLimbs = function () {
  switch (guess) {
    case 6:
      groundEl.classList.remove('hidden');
      break;
    case 5:
      headEl.classList.remove('hidden');
      break;
    case 4:
      scaffoldEl.classList.remove('hidden');
      break;
    case 3:
      legsEl.classList.remove('hidden');
      break;
    case 2:
      armsEl.classList.remove('hidden');
      break;
    case 1:
      bodyEl.classList.remove('hidden');
      break;

    default:
  }
};

const playerguess = function () {
  if (playing) {
    document.addEventListener('keydown', function (event) {
      userInput = event.key.toUpperCase();
      if (
        !wrongLetters.includes(userInput) &&
        !correctLetters.includes(userInput)
      ) {
        for (var i = 0; i < answer.length; i++) {
          if (userInput === answer[i] && playing) {
            remaining++;
            correctLetters[i] = userInput;
            answerArr[i] = userInput;
            answerEl.textContent = answerArr.join(' ');

            // console.log('Guess is right');
            // console.log(answerArr);
            // console.log(`Remaining: ${remaining} `);

            if (remaining == answerArr.length) {
              score++;
              win += score;
              winsEl.textContent = win;
              playing = false;
              bottomtextEl.textContent = 'You Won GZ!!';
              // console.log('Winner!!');
            }
          } else if (!answer.includes(userInput) && playing) {
            wrongLetters.push(userInput);
            guessedEl.textContent = wrongLetters.join(' ');
            guess--;
            guessEl.textContent = guess;
            showLimbs();
            // console.log('Wrong!!');
            if (guess == 0) {
              score++;
              loss += score;
              lossesEl.textContent = loss;
              answerEl.textContent = answer;
              playing = false;
              bottomtextEl.textContent = 'GAME OVER!!';
            }
            break;
          }
        }
      }
    });
  }
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
