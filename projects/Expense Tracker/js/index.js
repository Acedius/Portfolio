function addExpense() {
  let expense = document.getElementById("expense").value;

  try {
    validateExpense(expense);
  } catch (err) {
    alert(err);
    return;
  }

  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let table = document.getElementById("table");

  let element = document.createElement("tr");
  appendElements(element, "td", name);
  appendElements(element, "td", date);
  appendElements(element, "td", expense);
  appendButton(element, "td");

  table.append(element);
  resetFields();
}

function validateExpense(expense) {
  let isValid = true;

  for (let i = 0; i < expense.length; i++) {
    if (expense[i] <= "0" || expense[i] >= "9") {
      isValid = false;
      break;
    }
  }

  if (!isValid) throw "Please check your expense!";

  return;
}

function appendElements(element, elementName, value) {
  let child = document.createElement(elementName);
  let textNode = document.createTextNode(value);
  child.append(textNode);
  element.append(child);
}

function appendButton(element, elementName) {
  let child = document.createElement(elementName);
  let removeButton = document.createElement("button");
  removeButton.innerHTML = "X";
  removeButton.onclick = () => {
    element.remove();
  };
  child.append(removeButton);
  element.append(child);
}

function resetFields() {
  document.getElementById("name").value = "";
  document.getElementById("date").value = "";
  document.getElementById("expense").value = "";
}
