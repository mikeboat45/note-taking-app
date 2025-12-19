function escapeHTML(str) {
  const p = document.createElement("p");
  p.textContent = str;
  return p.innerHTML;
}

const form = document.getElementById("form");
const titleInput = document.getElementById("note-head");
const contentInput = document.getElementById("note-content");

const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("id");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

const currentNote = notes.find((note) => note.id == Number(noteId));

if (currentNote) {
  titleInput.value = currentNote.title;
  contentInput.value = currentNote.content;
} else {
  // If note not found, redirect to homepage or show an error
  alert("Note not found!");
  window.location.href = "index.html";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const updatedTitle = titleInput.value.trim();
  const updatedContent = contentInput.value.trim();

  if (updatedTitle === "" || updatedContent === "") {
    alert("Please fill out both title and content.");
    return;
  }

  // Find the index of the note to update
  const noteIndex = notes.findIndex((note) => note.id == Number(noteId));

  if (noteIndex > -1) {
    notes[noteIndex].title = updatedTitle;
    notes[noteIndex].content = updatedContent;
    // Optionally update date, but for simplicity, we'll keep the original date
    // notes[noteIndex].date = new Date().toLocaleDateString(); 
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("Note updated in localStorage");
    window.location.href = `read.html?id=${noteId}`; // Redirect back to the read page of the updated note
  } else {
    alert("Error: Note not found for update.");
    window.location.href = "index.html";
  }
});
