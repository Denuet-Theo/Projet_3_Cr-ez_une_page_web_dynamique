document.getElementById('btnValider').onclick =  async function(e){
 /* let input = document.getElementsByTagName('input');*/
  var erreur;
  let email = document.getElementById ('email').value;
  let mdp = document.getElementById ('mdp').value;
  let user = {};
  user.email = email;
  user.password = mdp;
  

  let url = 'http://localhost:5678/api/users/login';
  let response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});

let result = await response.json();
let token = result.token;
console.log(token);


if (response.ok ){
  alert ('Bienvenue !');
  window.location.assign("index.html");
  window.sessionStorage.setItem("token", token);
}else{
erreur = 'Email ou mot de passe incorrect';
}

if (erreur){
  e.preventDefault();
  document.getElementById('erreur').innerHTML = erreur;
  return false;
} 

}

/*for (var i = 0; i < input.length; i++){
  console.log(input[i]);
  if (!input[i].value){
    erreur = 'Veuillez renseigner tous les champs';
    document.getElementById('erreur').innerHTML = erreur;
    return false;
  }
  
}*/

























/*let user = {
  name: 'Sophie'
};

let response = await fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});

let result = await response.json();
alert(result.message);

document.getElementById(".form").submit();*/





/*export function log(){
    const formulaire = document.querySelector(".formulaire");
    formulaire.addEventListener("submit", function(event){
        event.preventDefault();
        const connection = {
            email: event.target.querySelector("[name=email]"),value,
            mdp: event.target.querySelector("[name=mdp]"),value,
        };
        const Chargeutile = JSON.stringify(connection);

        fetch("http://localhost:5678/api/users/login", {
            method : "POST",
            headers : {"Content-Type": "application/json" },
            body : Chargeutile
        })
    })
}
*/