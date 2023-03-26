/** click ouverture et fermeture du menu burger **/

let toggle = document.querySelector('.toggle');
let body = document.querySelector('body');

toggle.addEventListener('click', function() {
    body.classList.toggle('open');})

    
    /** Message contact burger **/
    const messagecontact =
    "Merci pour votre message. Nous vous répondrons dans les plus brefs délais.";
  
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      alert(messagecontact);
    });

    const connexionOnOff = "";
   

   