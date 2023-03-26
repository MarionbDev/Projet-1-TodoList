//Faire apparaitre/disparaitre le modal
const modalContainer = document.querySelector(".modal-container");
const modalTrigger = document.querySelectorAll(".modal-trigger");
const modalBtn = document.querySelector(".modal-btn");
const closeBtn = document.querySelector(".close-modal");
// const modalContainer = document.querySelector(".modal-container").style.display = "none";
// Fonction pour afficher la modal
function showModal() {
  modalContainer.style.display = "block";
}
// Fonction pour masquer la modal
function hideModal() {
  modalContainer.style.display = "none";
}
// Faire apparaitre les valeurs du Form dans le HTML
const form = document.querySelector("#form");
const taskContainer = document.querySelector("#task-container");
const modalForm = (document.querySelector("#modal-container").style.display =
  "none");
// const modalContainer = document.querySelector(".modal-container");
function addTask(event) {
  event.preventDefault();

  // Récupère les valeurs des champs du formulaire
  const todoInputValue = document.querySelector("#todoInput").value;
  const dateValue = document.querySelector("#date").value;
  const descriptionValue = document.querySelector("#description").value;
  if (todoInputValue && dateValue) {
    //Nouvelle div pour la tâche
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-container", "to-do-task");

    // Ajoute les valeurs des champs du formulaire à la nouvelle div
    const newTodo = document.createElement("h3");
    newTodo.innerHTML = todoInputValue;
    newTodo.classList.add("newTodo");
    taskDiv.appendChild(newTodo);

    const newDate = document.createElement("p");
    newDate.innerHTML = Date.parse(dateValue);
    newDate.classList.add("newDate");
    taskDiv.appendChild(newDate);

    // Ajoute date échéance masquée
    newDate.dataset.deadLine = dateValue;
    getChrono(newDate);

    const newDescription = document.createElement("p");
    newDescription.innerHTML = descriptionValue;
    newDescription.classList.add("newDescription");
    taskDiv.appendChild(newDescription);

    // Crée et affiche la coche de transition de tâche
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("gg-check");
    taskDiv.appendChild(checkBtn);

    // Crée et affiche le bouton de suppression pour la nouvelle tâche créée
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("gg-close");
    taskDiv.appendChild(deleteBtn);

    // Ajoute la nouvelle div à la div taskContainer
    taskContainer.appendChild(taskDiv);

    //Ecouteur d'évènement coche de chaque tâche + déplacer la tâche "à faire" vers "en cours" OU d' "en cours" vers "terminée"
    const taskEnCours = document.querySelector("#task-en-cours");
    const taskFinish = document.querySelector("#task-finish");
    checkBtn.addEventListener("click", function () {
      if (taskDiv.className === "task-container to-do-task") {
        taskDiv.classList.replace("to-do-task", "in-progress");
        taskEnCours.appendChild(taskDiv);
      } else if (taskDiv.className === "task-container in-progress") {
        taskDiv.classList.replace("in-progress", "done");
        checkBtn.style.display = "none";
        taskFinish.appendChild(taskDiv);
      }
    });

    //ecouteur d'event pour le bouton supp
    deleteBtn.addEventListener("click", function () {
      taskDiv.remove();
    });

    // décompte date priorité et couleur

    function getChrono(dateElement) {
      const now = new Date().getTime();
      const countdownDate = new Date(dateElement.dataset.deadLine).getTime();
      const distanceBase = countdownDate - now;
      const days = Math.floor(distanceBase / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distanceBase % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distanceBase % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distanceBase % (1000 * 60)) / 1000);
      determinePriority(distanceBase, dateElement);
      dateElement.innerHTML = `Il reste :  ${days}j ${hours}h ${minutes}m ${seconds}s`;
    }

    const countDownInterval = setInterval(() => {
      const dateElements = document.querySelectorAll(".newDate");

      for (let i = 0; i < dateElements.length; i++) {
        getChrono(dateElements[i]);
      }
    }, 1000);
    function determinePriority(diff, element) {
      const priority = element;

      if (diff < 0) {
        priority.innerHTML = "#a8a8a8";
      } else if (diff < 86400000) {
        priority.style.color = "red";
      } else if (diff < 604800000) {
        priority.style.color = "orange";
      } else {
        priority.style.color = "green";
      }
    }
  }
}

//écouteur d'événement sur le bouton "Ajouter" pour afficher la modal
modalBtn.addEventListener("click", function () {
  showModal();
  // Réinitialiser les champs du formulaire
  document.querySelector("#form").reset();
});
//écouteur d'événement sur le bouton "OK" pour masquer la modal
closeBtn.addEventListener("click", function (event) {
  addTask(event);
  hideModal();
});
//écouteurs d'événement sur l'overlay et le formulaire pour masquer la modal
modalTrigger.forEach(function (trigger) {
  trigger.addEventListener("click", hideModal);
});
//écouteur d'événement sur le bouton "Ajouter" pour réafficher la modal
document.querySelector(".modal-btn").addEventListener("click", function () {
  showModal();
});
