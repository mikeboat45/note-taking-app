const takeNote = document.getElementsByClassName("write-btn");
console.log(takeNote);

const notesContainer = document.getElementById("notes-container");

takeNote[0].addEventListener("click", function (e) {
  e.preventDefault();

  console.log("Writing Article");

  //access notes from localStorage and display card
});
