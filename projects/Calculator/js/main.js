var calculation = "";

function addToCalculation(symbol) {
  calculation += symbol;
  document.getElementById("history-value").innerHTML = calculation;
}

function resetCalculation() {
  calculation = "";
  document.getElementById("history-value").innerHTML = calculation;
  document.getElementById("result-value").innerHTML = "";
}

function printResult() {
  result = calculate();
  document.getElementById("result-value").innerHTML = result;
}

function calculate() {
  let equation = disolveBrackets(calculation);
  return calculateParts(equation);
}

function disolveBrackets(eqaution) {
  let result = splitCalculation(eqaution);
  let bracketExists;

  try {
    bracketExists = checkBrackets(result);
  } catch (err) {
    alert(err);
    return;
  }

  if (bracketExists) solveBracketParts(result);

  return result;
}

function checkBrackets(result) {
  let open = 0;
  let close = 0;

  for (let i = 0; i < result.length; i++) {
    if (result[i] == "(") open++;
    if (result[i] == ")") close++;
  }

  if (open == 0 && close == 0) return false;

  if (open == close) return true;
  else throw "Check your brackets!";
}

function solveBracketParts(result) {
  let part = [];
  let position = [];

  while (checkBrackets(result) == true) {
    try {
      fillPositions(result, position);
    } catch (err) {
      alert(err);
      return;
    }

    begin = position[0];
    end = position[1];
    part = result.slice(begin, end + 1);

    //remove brackets
    part.shift();
    part.pop();

    //add new sum and remove bracket part
    sum = calculateParts(part);
    result.splice(begin, end - begin + 1, sum.toString());
    //clear position
    position.shift();
    position.shift();
  }
}

function fillPositions(result, position) {
  let openCandidate = 0;
  let i = 0;

  while (true) {
    if (i == result.length) throw "Too many of the same brackets!";

    if (result[i] == "(") openCandidate = i;

    if (result[i] == ")") {
      position.push(openCandidate, i);
      break;
    }

    i++;
  }
}

function splitCalculation(equation) {
  let result = [];
  let sub = "";

  for (let i = 0; i < equation.length; i++) {
    if ((equation[i] >= "0" && equation[i] <= "9") || equation[i] == ".") {
      sub += equation[i];
    } else {
      if (equation[i] == "(") result.push(equation[i]);
      else {
        if (sub != "") {
          result.push(sub);
          sub = "";
        }

        result.push(equation[i]);
      }
    }

    if (i == equation.length - 1 && equation[i] != "(" && equation[i] != ")")
      result.push(sub);
  }

  return result;
}

function calculateParts(equationArr) {
  let i = 0;
  let sum;

  //loop for *|/|%
  while (true) {
    if (
      equationArr[i] == "*" ||
      equationArr[i] == "/" ||
      equationArr[i] == "%"
    ) {
      try {
        sum = calculateSplit(
          equationArr[i - 1],
          equationArr[i + 1],
          equationArr[i]
        );
      } catch (err) {
        alert(err);
      }

      //create new Array without the tuple with *|/|%
      equationArr.splice(i - 1, 3, sum.toString());
      i = 0;
    }

    if (i >= equationArr.length) break;
    i++;
  }

  i = 0;
  //loop for +|-
  while (true) {
    if (equationArr[i] == "+" || equationArr[i] == "-") {
      sum = calculateSplit(
        equationArr[i - 1],
        equationArr[i + 1],
        equationArr[i]
      );

      equationArr.splice(i - 1, 3, sum.toString());
      i = 0;
    }

    if (i >= equationArr.length) break;
    i++;
  }

  return equationArr[0];
}

function calculateSplit(first, second, operand) {
  let sum = 0;
  first = parseFloat(first);
  second = parseFloat(second);

  switch (operand) {
    case "+":
      sum = first + second;
      break;
    case "-":
      sum = first - second;
      break;
    case "*":
      sum = first * second;
      break;
    case "/":
      if (second == 0) {
        throw "You cannot divide with 0!";
      }
      sum = first / second;
      break;
    case "%":
      sum = first % second;
      break;
    default:
      alert("Something went horribly wrong!");
  }

  return sum;
}
