function addItem() {
  let userInput = document.getElementById("input").value;

  let element = document.createElement("li");
  let node = document.createTextNode(userInput);
  element.appendChild(node);

  let removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove Item";
  removeButton.onclick = () => {
    element.remove();
    removeButton.remove();
  };

  let container = document.getElementById("list");
  container.append(element, removeButton);

  //Reset of inputfield
  document.getElementById("input").value = "";
}
