function addNote() {
  let userInput = document.getElementById("userInput").value;
  let container = document.getElementById("container-notes");

  container.append(createNote(userInput));
}

function createNote(content) {
  let note = document.createElement("div");
  note.className = "note";

  appendContent(note, content);

  return note;
}

function appendContent(note, content) {
  let element = document.createElement("p");
  let node = document.createTextNode(content);
  let detailButton = document.createElement("button");
  detailButton.innerHTML = "Details";
  detailButton.onclick = () => {
    let modal = document.getElementById("modal-bg");
    document.getElementById("modal-text").innerHTML = content;

    modal.style.display = "block";
  };

  element.append(node);

  note.append(element);
  note.append(detailButton);

  return note;
}

function closeButton() {
  document.getElementById("modal-bg").style.display = "none";
}
