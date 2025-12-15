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
  notes.forEach((note) => {
    const cardHTML = `<article class="card">
                          <h2 class="title">${note.title}</h2>
                          <p>${note.date}</p>
                          <p class="content">${note.content.substring(
                            0,
                            100
                          )}...</p>
                          <div id="card-btn">
                            <a href="#"><button>Read</button></a>
                            <button class="del-btn">Delete</button>
                          </div>
                        </article>`;

    notesContainer.insertAdjacentHTML("afterbegin", cardHTML);
  });
}
