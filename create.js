// select the form
// form submit event
//collect form data
// create a new post "object"
// get existing post from localStorage
// add new post to array
// save updated post array to localStorage
// return to homepage

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const titleInput = document.getElementById("note-head");
  const contentInput = document.getElementById("note-content");

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Please fill out both title and content.");
    return;
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
    date: new Date().toLocaleDateString(),
  };

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.push(newNote);

  localStorage.setItem("notes", JSON.stringify(notes));
  console.log("New note added to localStorage");

  window.location.href = "index.html";
});
