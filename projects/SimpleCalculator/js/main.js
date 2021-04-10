function calculate() {
  let equation = document.getElementById("equation").value;
  let firstVal, secondVal;
  let operand;
  let counter = 0;
  for (let i = 0; i < equation.length; i++) {
    if (
      equation[i] == "+" ||
      equation[i] == "-" ||
      equation[i] == "*" ||
      equation[i] == "/"
    ) {
      break;
    } else {
      counter++;
    }
  }

  firstVal = parseInt(equation.substring(0, counter));
  operand = equation[counter];
  secondVal = parseInt(equation.substring(counter + 1, equation.length));

  let result;

  switch (operand) {
    case "+":
      result = firstVal + secondVal;
      break;
    case "-":
      result = firstVal - secondVal;
      break;
    case "*":
      result = firstVal * secondVal;
      break;
    case "/":
      if (secondVal == 0) {
        alert("Can't divide with zero!");
        return;
      }
      result = firstVal / secondVal;
      break;
    default:
      alert("Please check your input");
      return;
  }

  alert(result);
}
