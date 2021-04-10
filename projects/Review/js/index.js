var slimeArr = [
  {
    name: "Gray",
    src: "SlimeGray",
    desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, consequuntur.",
  },
  {
    name: "Beige",
    src: "SlimeBeige",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, quo.",
  },
  {
    name: "Blue",
    src: "SlimeBlue",
    desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, sint?",
  },
  {
    name: "Green",
    src: "SlimeGreen",
    desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, similique?",
  },
  {
    name: "Pink",
    src: "SlimePink",
    desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, consectetur.",
  },
];

var len = slimeArr.length;
var counter = 0;

document.getElementById("prev").addEventListener("click", givePrev);
document.getElementById("next").addEventListener("click", giveNext);
document.getElementById("random").addEventListener("click", giveRandom);

function givePrev() {
  if (counter == 0) counter = len - 1;
  else counter--;

  changeSlime();
}

function giveNext() {
  if (counter == len - 1) counter = 0;
  else counter++;

  changeSlime();
}

function giveRandom() {
  counter = Math.floor(Math.random() * (len - 1));
  changeSlime();
}

function changeSlime() {
  let doc = document.getElementById("profile");

  doc.src = "../img/" + slimeArr[counter].src + ".png";
  doc.alt = slimeArr[counter].name + " Slime";

  document.getElementById("name").innerHTML = slimeArr[counter].name;
  document.getElementById("description").innerHTML = slimeArr[counter].desc;
}
