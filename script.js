// Bouton supprimer
const suppress = document.querySelector("#supp-task");

suppress.addEventListener("click", function () {
  if (confirm("Êtes-vous sûr de vouloir supprimer?")) {
    const taskDelete = document.querySelectorAll(".done");
    for (let i = 0; i < taskDelete.length; i++) {
      taskDelete[i].remove();
    }
  }
});
