var color = "";

function changeColor() {
  let hexMax = "ffffff";
  let intMax = parseInt(hexMax, 16);
  let halfOfMax = intMax / 2;

  let random = Math.floor(Math.random() * intMax);
  let randomHex = random.toString(16);
  randomHex = "#" + randomHex;
  color = randomHex.toUpperCase();

  document.getElementsByTagName("body")[0].style.backgroundColor = color;
  document.getElementById("color-hex").innerHTML = color;
  document.getElementById("color-display").style.backgroundColor = color;
  document.getElementById("change-button").style.backgroundColor = color;

  console.log(random);
  console.log(halfOfMax);

  if (random <= halfOfMax) {
    document.getElementsByTagName("h1")[0].style.color = "white";
    document.getElementById("color-display").style.color = "white";
    document.getElementById("change-button").style.color = "white";
  } else {
    document.getElementsByTagName("h1")[0].style.color = "black";
    document.getElementById("color-display").style.color = "black";
    document.getElementById("change-button").style.color = "black";
  }
}
