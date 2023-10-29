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

// ************************** Mode administrateur *******************************
const tokenAdmin = localStorage.getItem("token");
console.log(tokenAdmin);
const administrator = document.querySelector(".js__modal");
console.log(administrator);
const loginButton = document.getElementById("loginButton");
console.log(loginButton);
const blackBar = document.querySelector(".blackBar");
console.log(blackBar);

//si mon token n'est pas actif alors pas de mode administrateur

const stateLoginButton = function () {
  if (tokenAdmin) {
    loginButton.textContent = "logout";
    loginButton.style.color = "black";
    administrator.style.display = null;
    blackBar.style.display = null;
    loginButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      alert("Vous avez été déconnecté.");
      stateLoginButton();
    });
  } else {
    loginButton.textContent = "login";
    loginButton.style.color = "black";
    administrator.style.display = "none";
  }
};
stateLoginButton();
