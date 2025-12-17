// A simple function to escape HTML special characters
function escapeHTML(str) {
  const p = document.createElement("p");
  p.textContent = str;
  return p.innerHTML;
}

const takeNote = document.getElementById("write-btn");
const notesContainer = document.getElementById("notes-container");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function render() {
  notesContainer.innerHTML = "";

  if (notes.length === 0) {
    // Display the "empty" message
    const textDisplay = document.createElement("p");
    textDisplay.textContent = "Write something today!";
    textDisplay.className = "text-center text-gray-500 italic";
    notesContainer.appendChild(textDisplay);
  } else {
    // Build and display all the note cards
    let allNotesHTML = "";
    notes.forEach((note) => {
      const cleanTitle = escapeHTML(note.title);
      const cleanContent = escapeHTML(note.content);
      const cleanDate = escapeHTML(note.date);

      allNotesHTML += `<article class="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                        <div>
                          <h2 class="text-xl font-bold text-gray-800 mb-2">${cleanTitle}</h2>
                          <p class="text-sm text-gray-500 mb-4">${cleanDate}</p>
                          <p class="text-gray-700">${cleanContent.substring(
                            0,
                            100
                          )}...</p>
                        </div>
                        <div class="mt-6 flex space-x-2">
                          <button class="read-btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-sm" data-id="${
                            note.id
                          }">Read</button>
                          <button class="del-btn bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded text-sm" data-id="${
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

// Handle clicks on Read and Delete buttons
notesContainer.addEventListener("click", function (event) {
  const clickedElement = event.target;

  if (clickedElement.matches(".del-btn")) {
    const buttonId = clickedElement.getAttribute("data-id");

    notes = notes.filter((note) => note.id != Number(buttonId));
    localStorage.setItem("notes", JSON.stringify(notes));
    alert("Note deleted");

    render();
  } else if (clickedElement.matches(".read-btn")) {
    const buttonId = clickedElement.getAttribute("data-id");
    window.location.href = `read.html?id=${buttonId}`;
  }
});

render();
