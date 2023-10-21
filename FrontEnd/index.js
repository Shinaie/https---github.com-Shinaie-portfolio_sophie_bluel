//----------------------------------------------
//Travaux
//------------------------------------------------

let worksData = [];

const fetchWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      worksData = data;
      worksDisplay(worksData);
    });
};
fetchWorks();

const worksDisplay = (worksData) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = worksData
    .map(
      (work) =>
        `<figure>
           <img src="${work.imageUrl}" alt="photo de ${work.title}">
           <figcaption>${work.title}</figcaption>
         </figure>`
    )
    .join(""); // J'enlève les virgules
};

const fetchCategories = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      buttons(data);
    });
};
fetchCategories();

const buttons = (categoriesData) => {
  const containerFilter = document.getElementById("container-filter");

  const buttonAll = document.createElement("button");
  buttonAll.className = "btn";
  buttonAll.dataset.id = "0";
  buttonAll.textContent = "Tous";
  buttonAll.addEventListener("click", () => {
    filterWorks("Tous");
  });
  containerFilter.appendChild(buttonAll);

  categoriesData.forEach((category) => {
    const bouton = document.createElement("button");
    bouton.classList.add("btn");
    bouton.textContent = category.name;
    bouton.addEventListener("click", () => {
      filterWorks(category.name);
    });
    containerFilter.appendChild(bouton);
  });
};

const filterWorks = (categoryName) => {
  const worksFiltre =
    categoryName === "Tous"
      ? worksData
      : worksData.filter((work) => categoryName === work.category.name);

  worksDisplay(worksFiltre);
};

//****************************  modal **********************//

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  //target sur une ancre
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("arial-modal", "true");

  // affiche la gallerie qui est dans le swagger

  const figure = document.querySelector(".gallery__modal");
  figure.innerHTML = worksData
    .map(
      (project) => `
        <figure>
           <img src="${project.imageUrl}" alt="photo de ${project.title}">
        </figure>`
    )
    .join("");

  const modalWrapper = document.getElementById("submit__modal");
  modalWrapper.innerHTML = `
       <form action="#" method="post">
        <input type="button" id="submit__add__picture" value="Ajouter une photo"></input>
       <form>
        </div>

    `;

  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".close__icon").addEventListener("click", closeModal);
  modal
    .querySelector(".js__modal__stop")
    .addEventListener("click", stopPropagation);
};

const addNewModal = function () {
  const addModalButton = document.getElementById("submit__add__picture");
  addModalButton.addEventListener("click", () => {
    console.log("Le bouton cliqué.");
  });
};
// const newModal = document.createElement("div");
// newModal.innerHTML = `
//   <div class="modal__wrapper js__modal__stop">
//     <i class="fa-solid fa-xmark close__icon"></i>
//     <h3 id="title__modal">Ajout de photo</h3>
//     <div class="gallery__modal" id="galleryModal"></div>
//   </div>
// `;
// addModalButton.addEventListener("click", function () {
//   document.body.appendChild(newModal);
// });

//   newModal.addEventListener("click", closeModal);
//   newModal.querySelector(".close__icon").addEventListener("click", closeModal);
//   newModal
//     .querySelector(".js__modal__stop")
//     .addEventListener("click", stopPropagation);
// };

// // creation du modal ajout, quand on click sur ajout photo, il apparait

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-modal");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".close__icon").removeEventListener("click", closeModal);
  modal
    .querySelector(".js__modal__stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

//enleve la fermeture au click

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js__modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

// const addModalButton = document.getElementById("submit__add__picture");
// if (addModalButton.addEventListener("click", addNewModal))
//touche echap pour fermer le moda

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
});

// ************************** Modifier le login *******************************

// // Initialise la variable token en fonction de ce qui est stocké dans localStorage
// let token = localStorage.getItem("token") !== null;

// // Récupère le bouton de login
// const loginButton = document.getElementById("loginButton");

// // Fonction pour mettre à jour l'état du bouton
// const updateButtonState = () => {
//   if (token === true) {
//     loginButton.textContent = "Logout";
//   } else {
//     loginButton.textContent = "Login";
//   }
// };

// // Écoute le clic sur le bouton de login
// loginButton.addEventListener("click", (e) => {
//   e.preventDefault(); // Empêche le comportement par défaut du lien (redirection)
//   if (token) {
//     // Déconnexion : Supprimer le token du localStorage
//     localStorage.removeItem("token");
//   } else {
//     requestLogin(email, password);
//     // Connexion : Utilisez la fonction requestLogin pour obtenir un token
//     // (assurez-vous que l'utilisateur est correctement authentifié avant d'appeler requestLogin)
//     // Vous pouvez également gérer l'affichage du formulaire de connexion, etc.
//   }
//   // Inverse la valeur de token (connecté/déconnecté)
//   token = !token;
//   // Met à jour l'état du bouton
//   updateButtonState();
// });

// // Appelle la fonction pour mettre à jour l'état du bouton au chargement de la page
// updateButtonState();
