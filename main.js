// A simple function to escape HTML special characters
function escapeHTML(str) {
  const p = document.createElement("p");
  p.textContent = str;
  return p.innerHTML;
}

const takeNote = document.getElementById("write-btn");
const notesContainer = document.getElementById("notes-container");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// --- Central Render Function ---
function render() {
  // Start with a clean slate
  notesContainer.innerHTML = "";

  if (notes.length === 0) {
    // Display the "empty" message
    const textDisplay = document.createElement("p");
    textDisplay.textContent = "Write something today!";
    textDisplay.style.font = "italic";
    textDisplay.style.textAlign = "center";
    notesContainer.appendChild(textDisplay);
  } else {
    // Build and display all the note cards
    let allNotesHTML = "";
    notes.forEach((note) => {
      const cleanTitle = escapeHTML(note.title);
      const cleanContent = escapeHTML(note.content);
      const cleanDate = escapeHTML(note.date);

      allNotesHTML += `<article class="card">
                        <h2 class="title">${cleanTitle}</h2>
                        <p>${cleanDate}</p>
                        <p class="content">${cleanContent.substring(
                          0,
                          100
                        )}...</p>
                        <div id="card-btn">
                          <a href="read.html?id=${
                            note.id
                          }"><button>Read</button></a>
                          <button class="del-btn" data-id="${
                            note.id
                          }">Delete</button>
                        </div>
                      </article>`;
    });
    notesContainer.innerHTML = allNotesHTML;
  }
}

takeNote.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "create.html";
});

// Delete button functionality
notesContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;

  if (clickedElement.matches(".del-btn")) {
    const buttonId = clickedElement.getAttribute("data-id");

    notes = notes.filter((note) => note.id != Number(buttonId));
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Note deleted");

    render();
  }
});

render();
