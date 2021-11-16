'use strict';

const winsEl = document.querySelector('#wins-total');
const lossesEl = document.querySelector('#losses-total');
const guessEl = document.querySelector('#guesses-left');
const answerEl = document.querySelector('.picked-word');
const categorytextEl = document.querySelector('.picked-category');
const guessedEl = document.querySelector('.guessed-letter');
const guessedcorrectEl = document.querySelector('.guessed-letter-correct');
const hiddenEl = document.querySelector('.hidden');
const bottomtextEl = document.querySelector('.bottom-desc');
const containerEL = document.querySelector('.container');
const scoresEl = document.querySelector('.scores');
const timerEL = document.querySelector('.countdown');

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
const alphabet = [
  ' ',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'å',
  'Å',
  'ä',
  'Ä',
  'ö',
  'Ö',
];

const gallowEl = document.querySelector('.hanging-man');
const scaffoldEl = document.querySelector('.scaffold');
const headEl = document.querySelector('.head');
const bodyEl = document.querySelector('.body');
const armsEl = document.querySelector('.arms');
const legsEl = document.querySelector('.legs');
const groundEl = document.querySelector('.ground');

resetbtnEl.classList.add('hidden');
difficultyEl.classList.add('hidden');
categoryEl.classList.add('hidden');
scoresEl.classList.add('hidden');
gallowEl.classList.add('hidden');

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
  bottomtextEl.textContent = '';
  guessedEl.textContent = '';
  answerEl.textContent = '';
  categorytextEl.textContent = '';
  difficulty();
  categoryEl.classList.add('hidden');
  containerEL.classList.remove('right-answer');
  containerEL.classList.remove('wrong-answer');
  gallowEl.classList.remove('hidden');
  resetbtnEl.classList.remove('hidden');
});

const timer = function () {
  var timeleft = 30;
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
    }
    document.getElementById('progressBar').value = 10 - timeleft;
    timeleft -= 1;
  }, 1000);
};

const difficulty = function () {
  difficultyEl.classList.remove('hidden');
  easybtnEl.addEventListener('click', function () {
    guess = 6;
    guessEl.textContent = guess;
    difficultyEl.classList.add('hidden');
    difficultyPicked = 1;
    categoryPick();
  });
  hardbtnEl.addEventListener('click', function () {
    guess = 3;
    guessEl.textContent = guess;
    difficultyEl.classList.add('hidden');
    difficultyPicked = 2;
    categoryPick();
  });
  hellbtnEl.addEventListener('click', function () {
    guess = 1;
    guessEl.textContent = guess;
    difficultyPicked = 3;
    difficultyEl.classList.add('hidden');
    categoryPick();
  });
};

const categoryPick = function () {
  scoresEl.classList.remove('hidden');
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
      categorytextEl.textContent = 'Celebrities';
      break;
    case 2:
      answer = cityWords[Math.floor(Math.random() * cityWords.length)];
      for (var i = 0; i < answer.length; i++) {
        answerArr[i] = '_';
      }
      categorytextEl.textContent = 'Cities';
      break;
    case 3:
      answer = foodWords[Math.floor(Math.random() * foodWords.length)];
      for (var i = 0; i < answer.length; i++) {
        answerArr[i] = '_';
      }
      categorytextEl.textContent = 'Food';
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
  bottomtextEl.textContent = 'Press a key to make a guess.';
  hideLimbs();
  playerguess();
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
    switch (guess) {
      case 1:
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
  timer();
  if (playing) {
    document.addEventListener('keydown', function (event) {
      if (!alphabet.includes(event.key)) {
        console.log('Character not allowed');
      } else {
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

              if (remaining == answerArr.length) {
                score++;
                win += score;
                winsEl.textContent = win;
                playing = false;
                bottomtextEl.textContent = 'You Won GRATZ!!';
                containerEL.classList.add('right-answer');
              }
            } else if (!answer.includes(userInput) && playing) {
              wrongLetters.push(userInput);
              guessedEl.textContent = wrongLetters.join(' ');
              showLimbs();
              guess--;
              guessEl.textContent = guess;

              if (guess == 0) {
                score++;
                loss += score;
                lossesEl.textContent = loss;
                answerEl.textContent = answer;
                playing = false;
                bottomtextEl.textContent = 'GAME OVER!!';
                containerEL.classList.add('wrong-answer');
              }
              break;
            }
          }
        }
      }
    });
  }
};
