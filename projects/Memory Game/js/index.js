var images = [
  {
    id: 1,
    prim_src: "../img/SlimeBeige.png",
    sec_src: "../img/white-box.png",
    alt: "Beige slime",
  },
  {
    id: 2,
    prim_src: "../img/SlimeBlue.png",
    sec_src: "../img/white-box.png",
    alt: "Blue slime",
  },
  {
    id: 3,
    prim_src: "../img/SlimeGray.png",
    sec_src: "../img/white-box.png",
    alt: "Gray slime",
  },
  {
    id: 4,
    prim_src: "../img/SlimeGreen.png",
    sec_src: "../img/white-box.png",
    alt: "Green slime",
  },
  {
    id: 5,
    prim_src: "../img/SlimePink.png",
    sec_src: "../img/white-box.png",
    alt: "Pink slime",
  },
  {
    id: 6,
    prim_src: "../img/SlimeRed.png",
    sec_src: "../img/white-box.png",
    alt: "Red slime",
  },
  {
    id: 7,
    prim_src: "../img/SlimeTurkois.png",
    sec_src: "../img/white-box.png",
    alt: "Turkois slime",
  },
  {
    id: 8,
    prim_src: "../img/SlimeYellow.png",
    sec_src: "../img/white-box.png",
    alt: "Yellow slime",
  },
];

document
  .getElementById("number-pictures")
  .addEventListener("change", showPairQuest);

document.getElementById("number-pair").addEventListener("input", () => {
  try {
    validateInput();
  } catch (err) {
    alert(err);
    hideSubmitButton();
    return;
  }

  if (document.getElementById("number-pair").value == "") {
    hideSubmitButton();
    return;
  }

  showSubmitButton();
});

document.getElementById("submit-button").addEventListener("click", () => {
  hideQuestions();
  startGame();
});

//functions for question form
function showPairQuest() {
  document.getElementById("container-quest-pair").style.display = "block";
}

function showSubmitButton() {
  document.getElementById("submit-button").style.display = "block";
}

function hideSubmitButton() {
  document.getElementById("submit-button").style.display = "none";
}

function hideQuestions() {
  document.getElementById("container-question").style.display = "none";
}

function validateInput() {
  let value = document.getElementById("number-pair").value;

  for (let i = 0; i < value.length; i++) {
    if (value[i] < "0" || value[i] > "9")
      throw "Invalid Input. Please Check again!";
  }
}

//Helper Classes
class Constraintes {
  constructor(pictureCount, pairCount, lives) {
    this.pictureCount = pictureCount;
    this.pairCount = pairCount;
    this.lives = lives;
  }
}

class Counter {
  constructor() {
    this.counter = 0;
  }

  increase() {
    this.counter++;
  }

  get() {
    return this.counter;
  }

  reset() {
    this.counter = 0;
  }
}

//Class to detect click on the same picture positionTracker times
class PositionTracker {
  constructor() {
    this.alreadyFlipped = [];
  }

  add(position) {
    this.alreadyFlipped.push(position);
  }

  isAlreadyIn(position) {
    for (let i = 0; i < this.alreadyFlipped.length; i++) {
      if (position == this.alreadyFlipped[i]) return true;
    }
    return false;
  }

  atIndex(position) {
    return this.alreadyFlipped[position];
  }

  length() {
    return this.alreadyFlipped.length;
  }

  last() {
    return this.alreadyFlipped[this.alreadyFlipped.length - 1];
  }

  reset() {
    this.alreadyFlipped.splice(0, this.alreadyFlipped.length);
  }
}

class Flipped {
  constructor() {
    this.track = 0;
    this.elements = [];
  }

  setTracker(id) {
    this.track = id;
  }

  isSet() {
    if (this.track == 0) return false;
    return true;
  }

  isSame(id) {
    if (this.track == id) return true;
    return false;
  }

  add(element) {
    this.elements.push(element);
  }

  atIndex(position) {
    return this.elements[position];
  }

  length() {
    return this.elements.length;
  }

  reset() {
    this.track = 0;
    this.elements.splice(0, this.elements.length);
  }
}

//Helper class to keep track off binded functions
class BoundHandler {
  constructor() {
    this.handler = [];
  }

  push(item) {
    this.handler.push(item);
  }

  atIndex(position) {
    return this.handler[position];
  }
}

//Singelton instances
var count = new Counter();
var positionTracker = new PositionTracker();
var flipped = new Flipped();
var boundHandler = new BoundHandler();

var buttonEvent = function (i, constraints, finishedPictures, randomPictures) {
  setPicture(finishedPictures[i], randomPictures[i]);
  //timeout for user to see the last flipped card
  setTimeout(() => {
    clickEvent(i, constraints, finishedPictures, randomPictures);
  }, 50);
};

function updateConstraints(constraints) {
  document.getElementById("left-lives").innerHTML = constraints.lives;
  document.getElementById("left-pic").innerHTML = constraints.pictureCount;
  document.getElementById("left-pair").innerHTML = constraints.pairCount;

  if (constraints.lives == 0) lostGame();
  if (constraints.pictureCount == 0) winGame();
}

//initialize gameboard and click events
function startGame() {
  let pictureCount = document.getElementById("number-pictures").value;
  let pairCount = document.getElementById("number-pair").value;
  let lives = 3;

  let constraints = new Constraintes(pictureCount, pairCount, lives);

  updateConstraints(constraints);

  let chosenPictures = [];

  for (let i = 0; i < constraints.pictureCount; i++) {
    fillPictureArr(chosenPictures, constraints.pairCount, i);
  }

  let randomPictures = [];
  randomizePictures(chosenPictures, randomPictures);

  drawPictures(randomPictures);
  showPlayingField();

  let finishedPictures = document.getElementsByTagName("img");

  for (let i = 0; i < finishedPictures.length; i++) {
    boundHandler.push(
      buttonEvent.bind(this, i, constraints, finishedPictures, randomPictures)
    );
    finishedPictures[i].addEventListener("click", boundHandler.atIndex(i));
  }
}

//Helper functions for startGame
function fillPictureArr(chosenPictures, pairCount, positionOfPicture) {
  for (let i = 0; i < pairCount; i++) {
    chosenPictures.push(images[positionOfPicture]);
  }
}

function randomizePictures(chosenPictures, randomPictures) {
  let randomNumber;

  while (chosenPictures.length > 0) {
    randomNumber = Math.floor(Math.random() * chosenPictures.length);
    randomPictures.push(chosenPictures[randomNumber]);
    chosenPictures.splice(randomNumber, 1);
  }
}

function showPlayingField() {
  document.getElementById("playing-field").style.display = "block";
}

function drawPictures(randomPictures) {
  let field = document.getElementById("picture-field");

  for (let i = 0; i < randomPictures.length; i++) {
    let element = document.createElement("img");
    element.src = randomPictures[i].sec_src;
    element.alt = randomPictures[i].alt;
    field.append(element);
  }
}

function setPicture(before, after) {
  before.src = after.prim_src;
}

function clickEvent(i, constraints, finishedPictures, randomPictures) {
  if (!positionTracker.isAlreadyIn(i)) {
    count.increase();
    positionTracker.add(i);

    checkGameCondition(constraints, finishedPictures, randomPictures);
  }
}

//main function for game logic
function checkGameCondition(constraints, finishedPictures, randomPictures) {
  flipped.add(finishedPictures[positionTracker.last()]);

  if (!flipped.isSet()) {
    flipped.setTracker(randomPictures[positionTracker.last()].id);
    return;
  }

  if (flipped.isSame(randomPictures[positionTracker.last()].id)) {
    if (count.get() >= constraints.pairCount) {
      removeEvents();
      resetTrackers();
      alert("You got one pair!");
      constraints.pictureCount--;
      updateConstraints(constraints);
    }
    return;
  }

  alert("Wrong Pair");
  resetTurn(randomPictures);
  constraints.lives--;
  updateConstraints(constraints);
}

//Helper functions for checkGameCondition
function removeEvents() {
  for (let i = 0; i < flipped.length(); i++) {
    flipped
      .atIndex(i)
      .removeEventListener(
        "click",
        boundHandler.atIndex(positionTracker.atIndex(i))
      );
  }
}

function resetTrackers() {
  count.reset();
  positionTracker.reset();
  flipped.reset();
}

function resetTurn(randomizePictures) {
  for (let i = 0; i < positionTracker.length(); i++) {
    flipped.atIndex(i).src =
      randomizePictures[positionTracker.atIndex(i)].sec_src;
  }

  resetTrackers();
}

//results
function lostGame() {
  document.getElementById("result-text").innerHTML = "You lost!";
  openModal();
}

function winGame() {
  document.getElementById("result-text").innerHTML = "You won!";
  openModal();
}

//Modal Box
document.getElementById("restart-button").addEventListener("click", () => {
  reloadPage();
});

function openModal() {
  document.getElementById("modal-bg").style.display = "block";
}

//new game
function reloadPage() {
  window.location.reload();
}
