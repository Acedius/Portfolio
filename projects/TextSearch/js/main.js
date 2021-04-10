function searchForWords() {
  let field = document.getElementById("inputField").value;
  let keyword = document.getElementById("inputKeyword").value;

  let naiveOccurences = naive(field, keyword);

  alert("Your Keyword occured " + naiveOccurences + " times in the text");
}

function naive(field, keyword) {
  let i = 0;
  let occurences = 0;
  let sub;

  while (true) {
    if (i + keyword.length > field.length) break;

    sub = field.substr(i, keyword.length);
    if (sub == keyword) occurences++;

    i++;
  }

  return occurences;
}
