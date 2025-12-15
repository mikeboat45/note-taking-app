const takeNote = document.getElementsByClassName("note-btn");
console.log(takeNote);

const notesContainer = document.getElementById("notes-container");

takeNote[0].addEventListener("click", function (e) {
  e.preventDefault();

  console.log("Writing Article");
});
