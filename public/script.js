function onOff() {
  document
    .querySelector("#moldal")
    .classList
    .toggle("hide")

    document
      .querySelector("body")
      .classList
      .toggle("hideScroll")

    document
      .querySelector("#moldal")
      .classList
      .toggle("addScroll")
}

function checkFields(event){
  const valuesToCheck = [
    "title",
    "image",
    "category",
    "description",
    "link",
  ]

  const isEmpty = valuesToCheck.find(function(value){
    const checkIfIsString = typeof event.target[value].value === 'string';
    const checkIfIsEmpty = !event.target[value].value.trim();

    if(checkIfIsString && checkIfIsEmpty) {
      return true;
    }
  })

  if(isEmpty) {
    event.preventDefault();
    alert('You need to fill the fields');
  }
}