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
           <img src="${project.imageUrl}" alt="photo de ${project.title}" data-id="${project.id}" >
        </figure>`
    )
    .join("");

  //****************************  Supprimer l'image **********************//

  // const pictures = figure.querySelectorAll("img");
  const deletePictures = document.querySelectorAll("#delete__picture");
  console.log(deletePictures);

  // recherche de l'id de data de chaque images au click

  deletePictures.forEach((deletePicture) => {
    deletePicture.addEventListener("click", function () {
      // supprime l'element parent du bouton
      const imageParent = deletePicture.parentElement;
      // obtenir l'id de l'image
      const pictureData = imageParent
        .querySelector("img")
        .getAttribute("data-id");
      //supprimer l'element parent de figure
      imageParent.remove();
      console.log("Image " + pictureData + " supprimée");
      deletePictureApi(pictureData); // suprime l'image ainsi que l'api au click
      fetchWorks(); // remets a jour la gallerie
    });
  });

  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".close__icon").addEventListener("click", closeModal);
  modal
    .querySelector(".js__modal__stop")
    .addEventListener("click", stopPropagation);
};

//**************************** Supprimer l'image de l'api ******************* */
const deletePictureApi = async (pictureData) => {
  try {
    // Envoi une requête Delete pour supprimer l'image
    const response = await fetch(
      `http://localhost:5678/api/works/${pictureData}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.ok) {
      console.log("Image " + pictureData + " supprimée de l'Api");
    } else {
      console.error("Erreur lors de la suppression de l'image de l'API");
    }
  } catch (error) {
    console.error("Erreur lors de la requête DELETE :" + error);
  }
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
    resetModal2();
    fetchWorks(); //remet a jour la gallerie
    resetButton();
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
  let file = e.target.files[0];
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

// ******************************* Initialisation modal2 *******************//

const token = localStorage.getItem("token");
const titleInput = document.getElementById("input-title");
const categorySelect = document.getElementById("category");
const imageInput = document.getElementById("add__picture__modal");
const buttonValid = document.getElementById("add__modal");

/******************Mise a jour de la couleur du  bouton valider  ********************/

const changeBtnColor = function () {
  if (
    titleInput.value !== "" &&
    categorySelect.value !== "0" &&
    imageInput.files[0] !== undefined
  ) {
    buttonValid.style.background = "#1D6154";
  } else {
    buttonValid.style.background = "#A7A7A7";
  }
};

titleInput.addEventListener("change", changeBtnColor);
categorySelect.addEventListener("change", changeBtnColor);
imageInput.addEventListener("change", changeBtnColor);

/******************Envoi du formulaire  ********************/

buttonValid.addEventListener("click", async (e) => {
  //Recuperation des champs
  const title = titleInput.value;
  const category = categorySelect.value;
  const imageFile = imageInput.files[0];

  if (title && category && imageFile) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageFile);
    formData.append("category", category);

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        modal2.style.display = "none";
        modal2 = null;
        console.log("image envoyée avec succès");
        fetchWorks();
        resetModal2();
        resetButton();
      } else {
        console.error("erreur lors de l'envoi");
      }
    } catch (error) {
      console.error("Erreur lors de la requête à l'API : " + error);
    }
  } else {
    alert("Veuillez remplir tous les champs du formulaire.");
  }
});

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
  fetchWorks();
};

const closeModal2 = function (e) {
  if (modal2 === null) return;
  e.preventDefault();
  modal2.style.display = "none";
  modal2 = null;
  fetchWorks();
  resetModal2();
  resetButton();
};

/******* reset du modal ***************** */

const resetModal2 = async function () {
  titleInput.value = "";
  categorySelect.value = "0";
  imageInput.files[0] = null;

  const newAddPicture = `<i class="fa-regular fa-image"></i>
  
  <input
  type="file"
  class="add__picture__btn"
  id="add__picture__modal"
  accept="image/*"
  hidden
  />
  <label for="file" id="add__picture__upload">
  + Ajouter photo
  </label>
  <span class="messageUpload"></span>
  <p>jpg, png : 4mo max</p>
  </div>`;

  addPicture.innerHTML = newAddPicture;
};

//*********************************reset le bouton pour le rendre actif  */
const resetButton = function () {
  button.onclick = () => {
    input.click();
  };
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
