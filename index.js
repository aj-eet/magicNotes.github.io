showNotes();//in case any one reload the page ,all the node wil still appear on the front page 
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes"); //declaretion with initialization
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value); //if any one type some text and click on add note it will save that in addTxt...

  localStorage.setItem("notes", JSON.stringify(notesObj)); //to store the note in localStorage
  addTxt.value = ""; //to make empty addTxt content

  // function for showing node after clicking on add nodes...
  showNotes();
});
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  //converting to array
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
      <div class="card mx-1 my-2 noteCard" style="width: 18rem;">
      <div class="card-body ">
        <h5 class="card-title">Notes ${index + 1}</h5>
        <p class="card-text">${element}</p>
        <button id="${index}" onclick="deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
      </div>
    </div>
            `;
  });
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  }

  else {
    notesElem.innerHTML = `Nothing to show! Please add at least one note.`
  }

}
//for deleting a node after clicking on deleteNote...
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj))
  showNotes();

}

//for searhing  box
let search = document.getElementById('searchTxt');

search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName('noteCard');

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName('P')[0].innerText;


    if ((cardTxt.toLowerCase()).includes(inputVal)) {
      element.style.display = "block";//

    }
    else {
      element.style.display = "none"
    }
  })

})