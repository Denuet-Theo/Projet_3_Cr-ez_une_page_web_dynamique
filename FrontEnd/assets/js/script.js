let lien = document.querySelector(".js-modal");
let btnfiltrage = document.querySelector(".toutBouton")
let login = document.querySelector(".connexion");
let logout = document.querySelector(".deconnexion");
let bandenoir = document.querySelector(".bandenoir");
let lien1 = document.querySelector('.js-modal1');
let lien2 = document.querySelector('.js-modal2');
let firstvisu = document.querySelector(".none");
const input = document.getElementById("image_telechargé");
input.style.opacity = 0;
const visualisation = document.querySelector(".visualisation");
let token =sessionStorage.getItem("token"); /* Token d'identifation stocké dans le sessionstorage, ici on recupère */
let selecteur =document.querySelector(".gallery"); /* selectionne la gallery de la page principale */
let affichageModal =document.querySelector(".galleryModal"); /* selectionne la gallery de la modal */
let modal = null;
const focusableSelector = "button, a, input";
let focusables = [];
let previouslyFocusedElement = null;

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION POUR GENERER LES WORKS SUR LA PAGE PRINCIPALE
//-----------------------------------------------------------------------------------------------------------------------

function generer(tab) {
  /* Fonction qui crée pour chaque item recupéré de l'api une figure, une image et une balise figcaption */
  for (let item of tab) {
    let figures = document.createElement("figure");
    selecteur.appendChild(figures);

    // console.log(item.imageUrl);
    let image = document.createElement("img");
    image.src = item.imageUrl;
    image.crossOrigin = "anonymous";
    figures.appendChild(image);

    // console.log(item.title);
    let figcaptions =document.createElement("figcaption"); /*crée une balise figcaption*/
    figcaptions.innerHTML = item.title;
    figures.appendChild(figcaptions); /* place figcaption dans figures */
  }
}

//-----------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------
// FONCTION OUVERTURE DE LA MODAL
//-----------------------------------------------------------------------------------------------------------------------

const openModal = function (e) {
  /* fonction pour ouvrir la modale */
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal.style.display = null;
  focusables[0].focus();
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", abc);
};

//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION FERMETURE DE LA MODAL
//-----------------------------------------------------------------------------------------------------------------------

const closeModal = function (e) {
  /* fonction pour fermer la modale */
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").removeEventListener("click", abc);
  modal = null;

//-----------------------------------------------------------------------------------------------------------------------
// QUAND FERMETURE MODAL SUPPRIME LES DONNEEES PREREMPLIS PAR L'UTILISATEUR 
//-----------------------------------------------------------------------------------------------------------------------
  document.getElementById("titrephoto").value = "";
    let options = document.querySelectorAll("#categoriephoto option");
    for (let i = 0, l = options.length; i < l; i++) {
      options[i].selected = options[i].defaultSelected;
    }
    document.getElementById("image_telechargé").value = "";

    visualisation.style.display = "none";
    firstvisu.style.display = null;
    
    document.querySelector(".btn-valider-photo").disabled = true;
      btnvaliderphoto.style.backgroundColor = "#A7A7A7";
      // console.log(document.getElementById("categoriephoto").value);

      modal2.style.display = "none"
      pagemodal.style.display = null;
      flecheretour.style.display = "none";

       verifcategorie = false;
       verifimage = false;
       testtitre = false;
      //-----------------------------------------------------------------------------------------------------------------------
};

//-----------------------------------------------------------------------------------------------------------------------



const abc = function (e) { /* empeche la fermeture de la modal si clic interne */
  e.stopPropagation();
};

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION POUR GARDER LE FOCUS DES ELEMENTS DANS LA MODAL
//-----------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
// QUAND CLICK SUR LE LIEN "MODIFIER" SIMULE UN CLICK QUI OUVRE LA PAGE MODAL
//-----------------------------------------------------------------------------------------------------------------------
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

document.querySelectorAll(".js-modal1").forEach((a) => {
  a.addEventListener("click", openModal);
});

document.querySelectorAll(".js-modal2").forEach((a) => {
  a.addEventListener("click", openModal);
});
//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION POUR SE DEPLACER GRACE A TAB ET ECHAP DANS LA MODAL
//-----------------------------------------------------------------------------------------------------------------------

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});

//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
// AFFICHAGE DES WORKS DANS LA MODAL + BUTTON ET FETCH DELETE
//-----------------------------------------------------------------------------------------------------------------------

function afficherImageModal(tab) {
  /* Affichage de la modal */
  let i = 0;
  affichageModal.innerHTML = "";
  for (let item of tab) {
    /* Pour tout les items recuperé on crée button, figcaption,img,figure et une div pour le placement des button */
    i++;
    let boutonPoubelle = document.createElement("button");
    let figcaptions = document.createElement("figcaption");
    let image = document.createElement("img");
    let figures = document.createElement("figure");
    let blocPoubelle = document.createElement("div");

    affichageModal.appendChild(figures);

    // console.log(item.imageUrl);
    image.src = item.imageUrl;
    image.crossOrigin = "anonymous";
    figures.appendChild(image);

    figcaptions.innerHTML = "editer";
    figures.appendChild(figcaptions);

    boutonPoubelle.className = "fa-solid fa-trash-can";
    blocPoubelle.className = "blocpoubelle";

    figures.appendChild(blocPoubelle);
    blocPoubelle.appendChild(boutonPoubelle);

    boutonPoubelle.onclick = async function (e) {/* contact l'api pour lui dire de delete l'element avec l'id correspond au button poubelle sur lequel on clique*/
      // console.log("abc");
      let id = item.id;
      console.log(item);
      // console.log(token);
      let url = `http://localhost:5678/api/works/${id}`;
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${sessionStorage["token"]}`,
        },
      });
      this.parentElement.parentElement.remove(); // this : selecteur sur balise cliquer
      afficherPicto();
    };

    if (i == 1) {/* Sur le premier element affiché on crée un button avec les fleche directionnel */
      let flechemulti = document.createElement("button");
      flechemulti.className = "fa-solid fa-arrows-up-down-left-right";
      blocPoubelle.appendChild(flechemulti);
    }
  }
}

//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION POUR ACTIONNER L'ENVOI DU FETCH POST ET PREVENIR L'UTILISATEUR DE LA REUSSITE OU DE L'ECHEC 
//-----------------------------------------------------------------------------------------------------------------------

let btnvaliderphoto = document.querySelector(".btn-valider-photo");
function verificationformulaireajout() {
  /* function qui alerte si le formulaire est correct ou non */
  let Valider = false;
  if (
    document.getElementById("categoriephoto").value != 0 &&
    document.getElementById("titrephoto").value !== "" &&
    document.getElementById("image_telechargé").files.length !== 0
  ) {
    Valider = true;
    alert("Photo envoyée");
  } else {
    Valider = false;
    alert("Formulaire incomplet");
  }
  return Valider;
}

//-----------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------
// CLICK BTN DECONNEXION
//-----------------------------------------------------------------------------------------------------------------------
document.getElementById("deconnexion").onclick = function () {
  sessionStorage.removeItem("token");
   location.reload();
  console.log("eee");
  // if (sessionStorage.key(2) === null) {
  //   location.reload();
  // }
};
//-----------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------
// FONCTION AFFICHAGE DYNAMIQUE + GESTION DES FILTRES + AFFICHAGE SI ADMIN CONNECT
//-----------------------------------------------------------------------------------------------------------------------

function afficherPicto() {
  let url =
    "http://localhost:5678/api/works"; /* Demande a l'api pour obtenir les works */
  fetch(url)
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      let tab = data;
      selecteur.innerHTML = ""; //je vide la gallery

      generer(tab);

      /*gestion des boutons filtre*/

      const btnTous = document.querySelector(".btn-filtrer-Tous");
      btnTous.addEventListener("click", function () {
        const Filtre = tab.filter(function (item) {
          return item.category;
        });
        document.querySelector(".gallery").innerHTML = "";
        generer(Filtre);
      });

      const btnObjets = document.querySelector(".btn-filtrer-Objets");
      btnObjets.addEventListener("click", function () {
        const Filtre = tab.filter(function (item) {
          return item.categoryId === 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        generer(Filtre);
      });

      const btnAppartements = document.querySelector(
        ".btn-filtrer-Appartements"
      );
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
      btnHotelsetrestaurants.addEventListener("click", function () {
        const Filtre = tab.filter(function (item) {
          return item.categoryId === 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        generer(Filtre);
      });

      afficherImageModal(tab);

      if (token) {
        /* gestion d'affichage pour administrateur */
        lien.style.display = null;
        login.style.display = "none";
        logout.style.display = null;
        bandenoir.style.display = null;
        lien1.style.display = null;
        lien2.style.display = null;
        btnfiltrage.style.display = "none"
      }
    });
}
afficherPicto();

//-----------------------------------------------------------------------------------------------------------------------


let optionnull =document.querySelector(".optionselectnull"); /* Attribution valeurs pour les options du select categorie */
optionnull.value = 0;

//-----------------------------------------------------------------------------------------------------------------------
///!\/!\/!\/!\/!\/!\/!\/!\/!\/!\ FONCTION QUI AFFICHE LA DEUXIEME PAGE MODAL  /!\/!\/!\/!\/!\/!\/!\/!\/!\/!\
//-----------------------------------------------------------------------------------------------------------------------

  let boutonaddphoto = document.querySelector(".btn-envoyer-photo");
  let pagemodal =document.querySelector(".toutelamodal");
  let flecheretour = document.querySelector(".js-retour-modal");
  let modal2 = document.querySelector(".modal2");
  boutonaddphoto.addEventListener("click", function () {/*affichage deuxieme page de la modale */ 
  pagemodal.style.display = "none";
  flecheretour.style.display = null;
  modal2.style.display = null;
  enleverDisabled();

//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION QUI RETOURNE A LA PREMIERE PAGE MODAL SI CLIQUE FLECHE RETOUR
//-----------------------------------------------------------------------------------------------------------------------

  flecheretour.addEventListener("click", function (e) {/* gestion affichage si clique retour arrière */ 
    e.preventDefault();
    modal2.style.display = "none";
    pagemodal.style.display = null;
    flecheretour.style.display = "none";
    visualisation.style.display = "none";
    firstvisu.style.display = null;

    verifimage = false;
    document.querySelector(".btn-valider-photo").disabled = true;
      btnvaliderphoto.style.backgroundColor = "#A7A7A7";
  });

//-----------------------------------------------------------------------------------------------------------------------


 

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION RENOUVELLEMENT IMAGE LORS DE L'AJOUT EN VISUALISATION
//-----------------------------------------------------------------------------------------------------------------------

  input.addEventListener("change", actualisationImage);
  function actualisationImage() {/* fonction affichage image input */ 
  while (visualisation.firstChild) {
      visualisation.removeChild(visualisation.firstChild);
      visualisation.style.display = null;
    }

    const elementImage = input.files;

    if (elementImage.length !== 0) {
      for (const file of elementImage) {
        if (validFileType(file)) {
          const image = document.createElement("img");
          image.src = URL.createObjectURL(file);
          image.className = "nouvellephoto";

          visualisation.appendChild(image);
          firstvisu.style.display = "none";
          visualisation.style.display = null;
          image.onclick = function () {
            document.getElementById("image_telechargé").click();
          };
        } else {
          console.log("erreur");
        }
      }
    }
  }

//-----------------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION POUR ACCEPTER LES IMG DE TYPE PNG
//-----------------------------------------------------------------------------------------------------------------------

  const fileTypes = ["image/png"];
  function validFileType(file) {
    /* accepte que le png */ return fileTypes.includes(file.type);
  }

//-----------------------------------------------------------------------------------------------------------------------



  let optionobjet = document.querySelector(".optionselectobjets");
  optionobjet.value = 1;
  let optionappart = document.querySelector(".optionselectAppartements");
  optionappart.value = 2;
  let optionhotrest = document.querySelector(".optionselectHotrest");
  optionhotrest.value = 3;

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION AJOUT NOUVEAU TRAVAUX FETCH POST + REMISE A 0 DES INPUT A L'ENVOI
//-----------------------------------------------------------------------------------------------------------------------

  document.querySelector(".btn-valider-photo").onclick = async function (e) {
    if (verificationformulaireajout()) {
      let newphoto = document.getElementById("image_telechargé").files[0];
      let titre = document.getElementById("titrephoto").value;
      let categoriephoto = document.getElementById("categoriephoto").value;
      const formdata = new FormData();
      /* creation formdata pour envoyer sur l'api */
      formdata.append("image", newphoto);
      formdata.append("title", titre);
      formdata.append("category", categoriephoto);

      // console.log(formdata.get("category"));
      // console.log(formdata.get("title"));
      // console.log(formdata.get("image"));

      let url = `http://localhost:5678/api/works`; /* envoie du formdata contenant ma category mon title et mon image a mon api */
      let response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${sessionStorage["token"]}`,
        },
        body: formdata,
      });
      let result = await response.json();
      console.log(result);
      afficherPicto();
    }

    document.getElementById("titrephoto").value = "";
    let options = document.querySelectorAll("#categoriephoto option");
    for (let i = 0, l = options.length; i < l; i++) {
      options[i].selected = options[i].defaultSelected;
    }
    document.getElementById("image_telechargé").value = "";

    visualisation.style.display = "none";
    firstvisu.style.display = null;
    
    document.querySelector(".btn-valider-photo").disabled = true;
      btnvaliderphoto.style.backgroundColor = "#A7A7A7";
      // console.log(document.getElementById("categoriephoto").value);
    
  };

//-----------------------------------------------------------------------------------------------------------------------


});

///!\/!\/!\/!\/!\/!\/!\/!\/!\/!\ FERMETURE PAGE MODAL /!\/!\/!\/!\/!\/!\/!\/!\/!\/!\

//-----------------------------------------------------------------------------------------------------------------------
// FONCTION POUR DEBLOQUER LE DISABLED QUAND TOUT LES ELEMENTS SONT TRUE
//-----------------------------------------------------------------------------------------------------------------------
let verifcategorie = false;
let verifimage = false;
let testtitre = false;
function enleverDisabled() {
    document.querySelector(".btn-valider-photo").addEventListener("click", function () {
     verifcategorie = false;
     verifimage = false;
     testtitre = false;
    // console.log('rrr')
    });
 


  document.getElementById("categoriephoto").onchange = function () {
    validcategorie();
    console.log(verifcategorie);
    if (verifcategorie && verifimage && testtitre) {
      document.querySelector(".btn-valider-photo").disabled = false;
      btnvaliderphoto.style.backgroundColor = "#1D6154";
    }else{
      document.querySelector(".btn-valider-photo").disabled = true;
      btnvaliderphoto.style.backgroundColor = "#A7A7A7";
    }
  };

  document.getElementById("titrephoto").onkeyup = function () {
    validtitre();
    if (verifcategorie && verifimage && testtitre) {
      document.querySelector(".btn-valider-photo").disabled = false;
      btnvaliderphoto.style.backgroundColor = "#1D6154";
    }else{
      document.querySelector(".btn-valider-photo").disabled = true;
      btnvaliderphoto.style.backgroundColor = "#A7A7A7";
    }
  };
  document.getElementById("image_telechargé").onchange = function () {
    validimage();
    console.log(verifimage);
    if (verifcategorie && verifimage && testtitre) {
      document.querySelector(".btn-valider-photo").disabled = false;
      btnvaliderphoto.style.backgroundColor = "#1D6154";
    }else{
      document.querySelector(".btn-valider-photo").disabled = true;
      btnvaliderphoto.style.backgroundColor = "#A7A7A7";
    }
  };


const validcategorie = function () {
  if (document.getElementById("categoriephoto").value != 0) {
    verifcategorie = true;
  } else {
    verifcategorie = false;
  }
  return verifcategorie;
};

const validtitre = function () {
  let titreverifregexp = new RegExp('^[a-zA-Z0-9 -_.]{3,25}$', 'g');
   testtitre = titreverifregexp.test(document.getElementById("titrephoto").value);
  console.log(testtitre);
};

const validimage = function () {
  if (document.getElementById("image_telechargé").files.length !== 0) {
    verifimage = true;
  } else {
    verifimage = false;
  }
  return verifimage;
};
}
//-----------------------------------------------------------------------------------------------------------------------
