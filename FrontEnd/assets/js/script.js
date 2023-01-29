let url = "http://localhost:5678/api/works";
fetch(url)
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data);
    let tab = data;
    /*let selecteur = document.getElementById('portfolio');*/
    let selecteur = document.querySelector(".gallery");
    let affichageModal = document.querySelector(".galleryModal");
    selecteur.innerHTML = ""; //je vide la gallery

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
    }

    generer(tab);

    /*gestion des boutons */

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

    const btnAppartements = document.querySelector(".btn-filtrer-Appartements");
    btnAppartements.addEventListener("click", function () {
      const Filtre = tab.filter(function (item) {
        return item.categoryId === 2;
      });
      document.querySelector(".gallery").innerHTML = "";
      generer(Filtre);
    });

    const btnHotelsetrestaurants = document.querySelector(".btn-filtrer-Hôtels-et-restaurants");
    btnHotelsetrestaurants.addEventListener("click", function () {
      const Filtre = tab.filter(function (item) {
        return item.categoryId === 3;
      });
      document.querySelector(".gallery").innerHTML = "";
      generer(Filtre);
    });

    let modal = null;
    const focusableSelector = "button, a, input";
    let focusables = [];
    let previouslyFocusedElement = null;

    const openModal = function (e) {
      e.preventDefault();
      modal = document.querySelector(e.target.getAttribute("href"));
      focusables = Array.from(modal.querySelectorAll(focusableSelector));
      previouslyFocusedElement = document.querySelector(":focus");
      modal.style.display = null;
      focusables[0].focus();
      modal.removeAttribute("aria-hidden");
      modal.setAttribute("aria-modal", "true");
      modal.addEventListener("click", closeModal);
      modal
        .querySelector(".js-modal-close")
        .addEventListener("click", closeModal);
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
      let index = focusables.findIndex(
        (f) => f === modal.querySelector(":focus")
      );
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
      if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
      }
      if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
      }
    });

    function afficherImageModal(tab) {
    
      for (let item of tab) {
        let figures = document.createElement("figure");
        affichageModal.appendChild(figures);

        console.log(item.imageUrl);
        let image = document.createElement("img");
        image.src = item.imageUrl;
        image.crossOrigin = "anonymous";
        figures.appendChild(image);

        let figcaptions = document.createElement("figcaption");
        figcaptions.innerHTML = "editer";
        figures.appendChild(figcaptions);

        let boutonPoubelle = document.createElement("button");
        boutonPoubelle.className = "fa-solid fa-trash-can";
        let blocPoubelle = document.createElement("div");
        blocPoubelle.className = "blocpoubelle";

        figures.appendChild(blocPoubelle);
        blocPoubelle.appendChild(boutonPoubelle);

        /*V1 suppr galerie */

        boutonPoubelle.addEventListener("click", async function (e) {
          let id = item.id;
          console.log(item);
          console.log(token);
          let url = `http://localhost:5678/api/works/${id}`;
          let response = await fetch(url, {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${sessionStorage["token"]}`,
              "Content-Type": "application/json; charset=utf-8",
            },
            body: null,
          });
         /* let result = await response.json();
          let aaa = result;
          console.log(aaa);*/
          e.preventDefault();
          
        });
        generer(tab);
      }
      
    }
    afficherImageModal(tab);

    let boutonaddphoto = document.querySelector(".btn-envoyer-photo");
    boutonaddphoto.addEventListener("click", function () {
      let pagemodal = document.querySelector(".toutelamodal");
      pagemodal.style.display = "none";
      let flecheretour = document.querySelector(".js-retour-modal");
      flecheretour.style.display = null;
      let modal2 = document.querySelector(".modal2");
      modal2.style.display = null;

      flecheretour.addEventListener("click", function (e) {
        e.preventDefault();
        modal2.style.display = "none";
        pagemodal.style.display = null;
        flecheretour.style.display = "none";
        visualisation.style.display = "none";
        let firstvisu = document.querySelector(".none");
        firstvisu.style.display = null;
      });

      const input = document.getElementById("image_telechargé");
      const visualisation = document.querySelector(".visualisation");

      input.style.opacity = 0;

      input.addEventListener("change", actualisationImage);

      function actualisationImage() {
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
              let divnone = document.querySelector(".none");
              divnone.style.display = "none";
              let visu = document.querySelector(".visualisation");
              visu.style.display = null;
              image.onclick = function () {
                console.log("cc");
                document.getElementById("image_telechargé").click();
              };
            } else {
              console.log("erreur");
            }
          }
        }
      }

      const fileTypes = ["image/png"];
      function validFileType(file) {
        return fileTypes.includes(file.type);
      }

      document.querySelector(".btn-valider-photo").onclick = async function (e) {
        e.preventDefault();
        let titre = document.getElementById('titrephoto').value;
        let newphoto = document.getElementById('image_telechargé').files[0];
        const formdata = new FormData();
        
        let optionobjet = document.querySelector('.optionselectobjets');
        optionobjet.value =1;
        let optionappart = document.querySelector('.optionselectAppartements');
        optionappart.value=2;
        let optionhotrest = document.querySelector('.optionselectHotrest');
        optionhotrest.value=3;
        
        let categoriephoto = document.getElementById('categoriephoto').value;
       
        formdata.append("image",newphoto);
        formdata.append("title",titre);
        formdata.append("category",categoriephoto);
       
        console.log(formdata.get('category'));
        console.log(formdata.get('title'));
        console.log(formdata.get('image'));

        let url = `http://localhost:5678/api/works`;
           await fetch(url, {
            method: "POST",
            headers: {
              'accept': "application/json",
              'authorization': `Bearer ${sessionStorage["token"]}`,
             /* "Content-Type": "multipart/form-data"*/
            },
            body: formdata,
           
          });
          
      };
      
    });

    let lien = document.querySelector(".js-modal");
    let login = document.querySelector(".connexion");
    let logout = document.querySelector(".deconnexion");
    let token = sessionStorage.getItem("token");

    if (token) {
      lien.style.display = null;
      login.style.display = "none";
      logout.style.display = null;
    }

    document.getElementById("deconnexion").onclick = function () {
      sessionStorage.removeItem("token");
      if (sessionStorage.key(2) === null) {
        location.reload();
        return false;
      }
    };
  });
