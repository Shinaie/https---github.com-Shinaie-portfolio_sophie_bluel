//----------------------------------------------
//Travaux
//------------------------------------------------

let worksData = [];
let categoriesData = [];

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
      categoriesData = data;
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
let modal2 = null;

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
          <i class="fa-regular fa-trash-can" id="delete__picture"></i>
           <img src="${project.imageUrl}" alt="photo de ${project.title}">
        </figure>`
    )
    .join("");

  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".close__icon").addEventListener("click", closeModal);
  modal
    .querySelector(".js__modal__stop")
    .addEventListener("click", stopPropagation);
};

//Ajout du modal 2

const addNewModal = function () {
  // // test pour automatiser la categorie

  // const select = document.querySelector(".option__category");
  // select.innerHTML = categoriesData
  //   .map(
  //     (category) => `<option value="${category.id}">${category.name}</option>`
  //   )
  //   .join("");
  // console.log(categoriesData);

  const target2 = document.querySelector("#submit__add__picture");
  target2.addEventListener("click", (e) => {
    e.preventDefault();
    const openModal2 = document.getElementById("modal2");
    openModal2.style.display = null;
    modal.style.display = "none";

    //ajout de la categorie

    modal2 = openModal2;
    modal2.addEventListener("click", closeModal2);
    modal2.querySelector(".close__icon").addEventListener("click", closeModal2);
    modal2
      .querySelector(".js__modal__stop")
      .addEventListener("click", stopPropagation);
  });
};
addNewModal();

//function sur la fleche retour

const returnModal = function () {
  const returnModal1 = document.querySelector(".return__icon");
  returnModal1.addEventListener("click", (e) => {
    e.preventDefault();
    modal2.style.display = "none";
    modal.style.display = null;
  });
};
returnModal();
// // creation du modal ajout, quand on click sur ajout photo, il apparait

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  // modal.setAttribute("aria-modal");
  // modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".close__icon").removeEventListener("click", closeModal);
  modal
    .querySelector(".js__modal__stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const closeModal2 = function (e) {
  if (modal2 === null) return;
  e.preventDefault();
  modal2.style.display = "none";
  modal2 = null;
};

//enleve la fermeture au click

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js__modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

//touche echap pour fermer le moda

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
    closeModal2(e);
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
