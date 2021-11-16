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
const categoryEl = document.getElementById('category');

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
const foodWords = ['PIZZA', 'BURGER', 'PASTA'];
const celebWords = ['BRAD PITT', 'SETH ROGEN', 'BRITNEY SPEARS'];

const gallowEl = document.querySelector('.hanging-man');
const scaffoldEl = document.querySelector('.scaffold');
const headEl = document.querySelector('.head');
const bodyEl = document.querySelector('.body');
const armsEl = document.querySelector('.arms');
const legsEl = document.querySelector('.legs');
const groundEl = document.querySelector('.ground');

difficultyEl.classList.add('hidden');
categoryEl.classList.add('hidden');

let score = 0;
let remaining = 0;
let loss = 0;
let guess = 0;
let win = 0;
let correctLetters,
  difficultyPicked,
  categoryPicked,
  wrongLetters,
  answerArr,
  playing,
  answer,
  userInput;

resetbtnEl.addEventListener('click', function () {
  location.reload();
});

startbtnEl.addEventListener('click', function () {
  bottomtextEl.textContent = 'Press a key to make a guess.';
  // guessedEl.textContent = '';
  // answerEl.textContent = '';
  difficulty();
});

const difficulty = function () {
  difficultyEl.classList.remove('hidden');
  easybtnEl.addEventListener('click', function () {
    console.log('Ez mode active');
    guess = 6;
    guessEl.textContent = guess;
    difficultyEl.classList.add('hidden');
    difficultyPicked = 1;
    categoryPick();
  });
  hardbtnEl.addEventListener('click', function () {
    console.log('Hard mode activated.');
    guess = 3;
    guessEl.textContent = guess;
    difficultyEl.classList.add('hidden');
    difficultyPicked = 2;
    categoryPick();
  });
  hellbtnEl.addEventListener('click', function () {
    console.log('Holy hell..');
    guess = 1;
    guessEl.textContent = guess;
    difficultyPicked = 3;
    difficultyEl.classList.add('hidden');
    categoryPick();
  });
};

const categoryPick = function () {
  categoryEl.classList.remove('hidden');
  celebbtnEl.addEventListener('click', function () {
    categoryPicked = 1;
    getAnswer();
  });
  citybtnEl.addEventListener('click', function () {
    categoryPicked = 2;
    getAnswer();
  });
  foodbtnEl.addEventListener('click', function () {
    categoryPicked = 3;
    getAnswer();
  });
};

const getAnswer = function () {
  categoryEl.classList.add('hidden');

  answerArr = [];

  switch (categoryPicked) {
    case 1:
      answer = celebWords[Math.floor(Math.random() * celebWords.length)];
      for (var i = 0; i < answer.length; i++) {
        answerArr[i] = '_';
      }
      break;
    case 2:
      answer = cityWords[Math.floor(Math.random() * cityWords.length)];
      for (var i = 0; i < answer.length; i++) {
        answerArr[i] = '_';
      }
      console.log(answer);
      break;
    case 3:
      answer = foodWords[Math.floor(Math.random() * foodWords.length)];
      for (var i = 0; i < answer.length; i++) {
        answerArr[i] = '_';
      }
      console.log(answer);
      break;
  }
  answerEl.textContent = answerArr.join(' ');
  guessedEl.textContent = '';
  init();
};

const init = function () {
  score = 0;
  remaining = 0;
  playing = true;
  correctLetters = [];
  wrongLetters = [];
  document.removeEventListener('keydown', function (event) {});
  hideLimbs();
  playerguess();
  // console.log(answer);
};

const hideLimbs = function () {
  switch (difficultyPicked) {
    case 1:
      groundEl.classList.add('hidden');
      scaffoldEl.classList.add('hidden');
      headEl.classList.add('hidden');
      bodyEl.classList.add('hidden');
      armsEl.classList.add('hidden');
      legsEl.classList.add('hidden');
      break;
    case 2:
      groundEl.classList.remove('hidden');
      headEl.classList.remove('hidden');
      scaffoldEl.classList.remove('hidden');
      bodyEl.classList.add('hidden');
      legsEl.classList.add('hidden');
      armsEl.classList.add('hidden');
      break;
    case 3:
      headEl.classList.remove('hidden');
      groundEl.classList.remove('hidden');
      scaffoldEl.classList.add('hidden');
      bodyEl.classList.add('hidden');
      legsEl.classList.add('hidden');
      armsEl.classList.add('hidden');
  }
};
const showLimbs = function () {
  if (difficultyPicked == 1) {
    console.log('EZ body should show here');
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
  }
  if (difficultyPicked == 2) {
    console.log('HARD body should show here');

    switch (guess) {
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
  }
  if (difficultyPicked == 3) {
    console.log('Hell body should show here');
    switch (guess) {
      case 1:
        console.log('Hell switch enetered.');
        scaffoldEl.classList.remove('hidden');
        bodyEl.classList.remove('hidden');
        legsEl.classList.remove('hidden');
        armsEl.classList.remove('hidden');
        break;

      default:
    }
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
            showLimbs();
            guess--;
            guessEl.textContent = guess;
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
