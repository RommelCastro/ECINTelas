const database = firebase.database();
const storage = firebase.storage();
//Objeto DAO
let eventodao = new eventoDAO;

/////////MAIN//////////////////

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    usuariodao.buscar(user.uid).then(function(usuario){
    nome = usuario.getNome().split(" ")

    document.getElementById('btn-user').setAttribute("data-status", "logado")
    document.getElementById('btn-user').innerHTML =
      `<button class="btn-dropdown-header dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        OLÁ, ${nome[0].toUpperCase()}!
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">

        <button class="dropdown-item d-flex align-items-center justify-content-start" type="button">
          <i class="fas fa-user-circle icon-prop-usuario"></i>
          <p class="texto-usuario">MEU PERFIL</p>
        </button>

        <button class="dropdown-item d-flex align-items-center justify-content-start" type="button">
          <i class="fas fa-sign-in-alt icon-prop-usuario"></i>
          <p class="texto-usuario">SAIR</p>
        </button>
      </div>`
    })
  } else {
    document.getElementById('btn-user').setAttribute("data-status", "deslogado")
    document.getElementById('btn-user').innerHTML =
    ` <a type="button" href="login.html" class="d-flex align-items-center justify-content-center btn-login">
        <i class="fas fa-sign-in-alt icon-prop"></i>
        <p class="texto-btn-login">LOGIN</p>
      </a>`
  }
});

buscarEventos();

///////////////////////////////

function buscarEventos(){
  eventodao.varredura().then(function(evento){
    for (var i = 0; i < 2; i++) {
      criarEventos(evento[i])
    }
  })
}

function criarEventos(evento){
  let template = document.querySelector('#templateEventos');
  let listaEventos = document.querySelector('#listaEventos');
  let data = template.content.querySelector("p");
  let titulo = template.content.querySelector("a");
  
  titulo.textContent = evento.getNome()
  titulo.setAttribute("href","https://"+evento.getSite());
  data.textContent = evento.getDia()

  listaEventos.appendChild(document.importNode(template.content,true));  
}

function telaUsuario(componente){
  let status = $("#log").attr("data-status");
  if(status==="logado"){
    
    window.location = "usuario.html?"+ componente.getAttribute("data-key")
  }
  else{
    window.location.href="login.html"
  }
}