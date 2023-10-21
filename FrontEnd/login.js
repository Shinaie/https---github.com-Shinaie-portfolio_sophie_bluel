// Requete API + Renvoie du token avec validation du login et mot de passe

function requestLogin(email, password) {
  return fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((login) => {
      const errorDisplay = document.querySelector(".errorLogin");
      if (login.token) {
        localStorage.setItem("token", login.token);
        window.location.href = "./index.html";
      } else {
        console.error("Le token n'a pas été trouvé");
        errorDisplay.innerHTML = "Identifiant ou Mot de passe incorrect";
      }
    });
}

let form = document.getElementById("loginForm");
console.log(form.submit);

//Ecouter l'email et password

form.email.addEventListener("change", function () {
  valideEmail(this);
});

form.password.addEventListener("change", function () {
  validePassword(this);
});

// Ecouter la soumission du formulare

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (valideEmail(form.email) && validePassword(form.password)) {
    requestLogin(form.email.value, form.password.value);
  }
});

// *********************Validation email *********************************

const valideEmail = function (inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  //récuperation de la balise span
  let span = inputEmail.nextElementSibling;
  if (emailRegExp.test(inputEmail.value)) {
    span.innerHTML = "Adresse Valide";
    span.classList.remove("text-danger");
    span.classList.add("text-success");
    return true;
  } else {
    span.innerHTML = "Adresse Non Valide";
    span.classList.remove("text-success");
    span.classList.add("text-danger");
    return false;
  }
};

// *********************Validation password *********************************

const validePassword = function (inputPassword) {
  let msg;
  let valid = false;
  //au moins 3 caracteres
  if (inputPassword.value.length < 3) {
    msg = "Le mot de passe doit contenir au moins 3 caractères";
    //au moins 1 maj
  } else if (!/[A-Z]/.test(inputPassword.value)) {
    msg = "Le mot de passe doit contenir au moins 1 majuscule";
    //au moins 1 min
  } else if (!/[a-z]/.test(inputPassword.value)) {
    msg = "Le mot de passe doit contenir au moins 1 minuscule";
    //au moins 1 chiffre
  } else if (!/[0-9]/.test(inputPassword.value)) {
    msg = "Le mot de passe doit contenir au moins 1 chiffre";
  }
  // Mot de passe valide
  else {
    msg = "Le mot de passe est Valide";
    valid = true;
  }

  //Afichage
  let span = inputPassword.nextElementSibling;
  //   on test si le mdp est valid
  if (valid) {
    span.innerHTML = "Mot de passe Valide";
    span.classList.remove("text-danger");
    span.classList.add("text-success");
    return true;
  } else {
    span.innerHTML = msg;
    span.classList.remove("text-success");
    span.classList.add("text-danger");
    return false;
  }
};
const loginButton = document.getElementById("loginButton");
console.log(loginButton);
