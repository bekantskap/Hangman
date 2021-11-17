'use strict';

const winsEl = document.querySelector('#wins-total');
const lossesEl = document.querySelector('#losses-total');
const guessEl = document.querySelector('#guesses-left');
const answerEl = document.querySelector('.picked-word');
const categorytextEl = document.querySelector('.picked-category');
const guessedEl = document.querySelector('.guessed-letter');
const guessedcorrectEl = document.querySelector('.guessed-letter-correct');
const hiddenEl = document.querySelector('.hidden');
const containerEL = document.querySelector('.container');
const scoresEl = document.querySelector('.scores');
const timerEL = document.querySelector('.countdown');
const hintEl = document.querySelector('.word-hint');
const difficultyEl = document.getElementById('difficulty');
const categoryEl = document.getElementById('category');
const bottomtextEl = document.querySelector('.bottom-desc');

const startbtnEl = document.querySelector('.start-button');
const resetbtnEl = document.querySelector('.reset-button');
const easybtnEl = document.querySelector('.easy-button');
const hardbtnEl = document.querySelector('.hard-button');
const hellbtnEl = document.querySelector('.hell-button');
const celebbtnEl = document.querySelector('.celeb-button');
const citybtnEl = document.querySelector('.city-button');
const foodbtnEl = document.querySelector('.food-button');

const gallowEl = document.querySelector('.hanging-man');
const scaffoldEl = document.querySelector('.scaffold');
const headEl = document.querySelector('.head');
const bodyEl = document.querySelector('.body');
const armsEl = document.querySelector('.arms');
const legsEl = document.querySelector('.legs');
const groundEl = document.querySelector('.ground');

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

resetbtnEl.classList.add('hidden');
difficultyEl.classList.add('hidden');
categoryEl.classList.add('hidden');
scoresEl.classList.add('hidden');

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
  hintEl.textContent = '';
  categoryEl.classList.add('hidden');
  containerEL.classList.remove('right-answer');
  containerEL.classList.remove('wrong-answer');
  resetbtnEl.classList.remove('hidden');
  gallowEl.classList.add('hidden');
  difficulty();
});

const difficulty = function () {
  startbtnEl.classList.add('hidden');
  difficultyEl.classList.remove('hidden');
  easybtnEl.addEventListener('click', function () {
    difficultyValues(6, 1);
  });
  hardbtnEl.addEventListener('click', function () {
    difficultyValues(3, 2);
  });
  hellbtnEl.addEventListener('click', function () {
    difficultyValues(1, 3);
  });
};
const difficultyValues = function (guessValue, difficultyValue) {
  guess = guessValue;
  guessEl.textContent = guess;
  difficultyEl.classList.add('hidden');
  difficultyPicked = difficultyValue;
  categoryPick();
};

const categoryPick = function () {
  scoresEl.classList.remove('hidden');
  categoryEl.classList.remove('hidden');
  celebbtnEl.addEventListener('click', function () {
    getAnswer(1);
  });
  citybtnEl.addEventListener('click', function () {
    getAnswer(2);
  });
  foodbtnEl.addEventListener('click', function () {
    getAnswer(3);
  });
};

const getAnswer = function (categoryPicked) {
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
  gallowEl.classList.remove('hidden');
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
        getHints();
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

const getHints = function () {
  switch (answer) {
    case 'PIZZA':
      hintEl.textContent = 'Its really good with mozzarella...';
      break;
    case 'BURGER':
      hintEl.textContent = 'Its really good with american cheese...';
      break;
    case 'PASTA':
      hintEl.textContent = 'Its really good with parmesan...';
      break;
  }
};

const playerguess = function () {
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
                bottomtextEl.textContent = 'You Won. GRATZ!!';
                containerEL.classList.add('right-answer');
                startbtnEl.classList.remove('hidden');
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
                startbtnEl.classList.remove('hidden');
              }
              break;
            }
          }
        }
      }
    });
  }
};
