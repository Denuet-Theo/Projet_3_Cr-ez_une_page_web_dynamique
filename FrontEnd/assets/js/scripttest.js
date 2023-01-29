let token = sessionStorage.getItem("token");
let affichageModal = document.querySelector(".galleryModal");
let selecteur = document.querySelector(".gallery");
function generer(tab) {
  for (let item of tab) {
    let figures = document.createElement("figure");
    selecteur.appendChild(figures);

    console.log(item.imageUrl);
    let image = document.createElement("img");
    image.src = item.imageUrl;
    image.crossOrigin = "anonymous";
    figures.appendChild(image);

    console.log(item.title);
    /*crée une balise h1*/
    let figcaptions = document.createElement("figcaption"); //<h1> </h1>
    figcaptions.innerHTML = item.title; //<h1> titre </h1>
    figures.appendChild(figcaptions);
  }
  return false;
}

/*modal*/
let modal = null;
const focusableSelector = "button ,a , input, select , option";
let focusables = [];
let previouslyFocusedElement = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", abc);
};

const closeModal = function (e) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").removeEventListener("click", abc);
  modal = null;
};

const abc = function (e) {
  e.stopPropagation();
};

const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal != null) {
    focusInModal(e);
  }
});

function afficherImageModal(tab) {
  for (let item of tab) {
    let boutonPoubelle = document.createElement("button");
    let figcaptions = document.createElement("figcaption");
    let image = document.createElement("img");
    let figures = document.createElement("figure");
    let blocPoubelle = document.createElement("div");

    affichageModal.appendChild(figures);

    console.log(item.imageUrl);
    image.src = item.imageUrl;
    image.crossOrigin = "anonymous";
    figures.appendChild(image);

    figcaptions.innerHTML = "editer";
    figures.appendChild(figcaptions);

    boutonPoubelle.className = "fa-solid fa-trash-can";
    blocPoubelle.className = "blocpoubelle";

    figures.appendChild(blocPoubelle);
    blocPoubelle.appendChild(boutonPoubelle);

    boutonPoubelle.addEventListener("click", async function (e) {
      e.preventDefault();
      console.log("abc");
      let id = item.id;
      console.log(item);
      console.log(token);
      let url = `http://localhost:5678/api/works/${id}`;
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "/",
          authorization: `Bearer ${sessionStorage["token"]}`,
        },
      });

      /* let result = await response.json();
      let aaa = result;
      console.log(aaa);*/
    });
  }
  let blocPoubelle = document.querySelector(".blocpoubelle");
  let nbgallery = tab;
  console.log(nbgallery[0]);
  for (nbgallery[0] of tab) {
    let flechemulti = document.createElement("button");
    flechemulti.className = "fa-solid fa-arrows-up-down-left-right";
    blocPoubelle.appendChild(flechemulti);
    return false;
  }
}

document.getElementById("deconnexion").onclick = function (e) {
  e.preventDefault();
  sessionStorage.removeItem("token");
  if (sessionStorage.key(2) === null) {
    /* location.reload();*/
    return false;
  }
};

let url = "http://localhost:5678/api/works";
fetch(url)
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data);
    let tab = data;
    /*let selecteur = document.getElementById('portfolio');*/
    selecteur.innerHTML = ""; //je vide la gallery

    generer(tab);

    const btnTous = document.querySelector(".btn-filtrer-Tous");
    btnTous.addEventListener("click", function (e) {
      e.preventDefault();
      const Filtre = tab.filter(function (item) {
        return item.category;
      });
      document.querySelector(".gallery").innerHTML = "";
      generer(Filtre);
    });

    const btnObjets = document.querySelector(".btn-filtrer-Objets");
    btnObjets.addEventListener("click", function (e) {
      e.preventDefault();
      const Filtre = tab.filter(function (item) {
        return item.categoryId === 1;
      });
      document.querySelector(".gallery").innerHTML = "";
      generer(Filtre);
    });

    const btnAppartements = document.querySelector(".btn-filtrer-Appartements");
    btnAppartements.addEventListener("click", function () {
      const Filtre = tab.filter(function (item) {
        return item.categoryId === 2;
      });
      document.querySelector(".gallery").innerHTML = "";
      generer(Filtre);
    });

    const btnHotelsetrestaurants = document.querySelector(
      ".btn-filtrer-Hôtels-et-restaurants"
    );
    btnHotelsetrestaurants.addEventListener("click", function (e) {
      e.preventDefault();
      const Filtre = tab.filter(function (item) {
        return item.categoryId === 3;
      });
      document.querySelector(".gallery").innerHTML = "";
      generer(Filtre);
    });

    afficherImageModal(tab);

    let lien = document.querySelector(".js-modal");
    let login = document.querySelector(".connexion");
    let logout = document.querySelector(".deconnexion");
    

    if (token) {
      lien.style.display = null;
      login.style.display = "none";
      logout.style.display = null;
      return false;
    }
  });
