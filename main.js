// A simple function to escape HTML special characters
function escapeHTML(str) {
  const p = document.createElement("p");
  p.textContent = str;
  return p.innerHTML;
}

const takeNote = document.getElementById("write-btn");

takeNote.addEventListener("click", function (e) {
  e.preventDefault();

  window.location.href = "create.html";
});

const notesContainer = document.getElementById("notes-container");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

if (notesContainer && notes.length === 0) {
  const textDisplay = document.createElement("p");
  textDisplay.textContent = "Write something today!";

  textDisplay.style.font = "italic";
  textDisplay.style.textAlign = "center";

  notesContainer.appendChild(textDisplay);
} else {
  let allNotesHTML = "";
  notes.forEach((note) => {
    // cleaning user input before inserting it into the HTML string
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
                        <a href="read.htm?id=${
                          note.id
                        }"><button>Read</button></a>
                        <button class="del-btn">Delete</button>
                      </div>
                    </article>`;
  });
  notesContainer.innerHTML = allNotesHTML;
}
