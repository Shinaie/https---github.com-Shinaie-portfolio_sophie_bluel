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

//****************************  modal 2 **********************//

const addNewModal = function () {
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

//************************** */ telechargement des photos ******************/

const addPicture = document.querySelector(".add__picture__preview");
const button = document.getElementById("add__picture__upload");
const input = document.querySelector(".add__picture__btn");
const messageDragover = document.querySelector(".messageUpload");

//on simule un click sur le champ input file

button.onclick = () => {
  input.click();
};

input.addEventListener("change", function (e) {
  //on recupere le fichier selectionné du champ
  let file = this.files[0];

  // console.log(e.target.files[0]);

  // traitement et affichage du fichier
  showFile(file);
});

function showFile(file) {
  // on recupère le type du fichier
  let fileType = file.type;
  let fileExtension = ["image/jpeg", "image/jpg", "image/png"];
  // on verifie la validité du type du fichier
  if (fileExtension.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      let fileUrl = fileReader.result;

      let imgTag = `<img src="${fileUrl}" alt="image" />`;
      addPicture.innerHTML = imgTag;
    };
  } else {
    alert("Ceci n'est pas une image");
  }
}
// **************************** Option pour le glissé déposé ***************** //

// traitement du glissé deposé
// si l'utilisateur glisse le fichier en dessus du champ de drag
addPicture.addEventListener("dragover", (e) => {
  e.preventDefault();
  messageDragover.textContent = "Relacher pour Uploader le fichier ";
});
// Si le fichier quitte par dessus le champ de drag
addPicture.addEventListener("dragleave", (e) => {
  messageDragover.textContent = "";
});
//si le fichier est droppé
addPicture.addEventListener("drop", (e) => {
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  showFile(file);
});

// ******************************* Reinitialisation modal2 *******************//

// si dans la balise add__picture__preview il y a une image alors envoyer a l'api
const token = localStorage.getItem("token");
const title = document.getElementById("input-title");

const category = document.getElementById("category");
// const image = document.getElementById("add__picture__modal");

const buttonValid = document.getElementById("add__modal");

buttonValid.addEventListener("click", async (e) => {
  //Recuperation de l'image
  const image = document.querySelector(".add__picture__preview img");
  console.log(image);

  if (image) {
    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("category", category.value);
    formData.append("image", image);

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      console.log("image envoyée avec succès");
    } else {
      console.error("erreur lors de l'envoi");
    }
  }
});

/******************Upload avec l'api ********************/

/******** fermeture du modal *****************************/

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
