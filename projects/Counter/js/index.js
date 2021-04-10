var counter = 0;

function decreaseCounter() {
  counter--;

  if (counter < 0) document.getElementById("counter").style.color = "red";
  else if (counter == 0)
    document.getElementById("counter").style.color = "black";

  document.getElementById("counter").innerHTML = counter;
}

function resetCounter() {
  counter = 0;
  document.getElementById("counter").style.color = "black";
  document.getElementById("counter").innerHTML = 0;
}

function increaseCounter() {
  counter++;

  if (counter > 0) document.getElementById("counter").style.color = "green";
  else if (counter == 0)
    document.getElementById("counter").style.color = "black";

  document.getElementById("counter").innerHTML = counter;
}
