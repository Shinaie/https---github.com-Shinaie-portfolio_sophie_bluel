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
