//Variaveis e Constantes
let selectedFile
const database = firebase.database();
const storage = firebase.storage();
let diaEvento
let horaEvento
let opcaoBusca = "Nome"

//Objetos DAO
eventodao = new eventoDAO
usuariodao = new usuarioDAO

//MAIN
/*firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    document.getElementById('log').innerHTML = `<i class="fas fa-sign-out-alt"></i>
    <p style="margin-bottom: 8px;"><small>Sair</small></p>`
    document.getElementById('log').setAttribute("data-status", "logado");

    document.getElementById('perfil').setAttribute("data-key", user.uid);
    document.getElementById('perfil').setAttribute("onclick", "telaUsuario(this)");

    localStorage.setItem('usuarioLogadoKey', user.uid)

  } else {
    document.getElementById('log').innerHTML = `<i class="fas fa-sign-in-alt"></i>
    <p style="margin-bottom: 8px;"><small>Entrar</small></p>`
    document.getElementById('log').setAttribute("data-status", "deslogado");
    document.getElementById('btn_marker').setAttribute("data-status", "deslogado");
    document.getElementById('perfil').setAttribute("href", "login.html");
    //window.location.href="login.html";
  }
});*/

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    alert("Entrou no if")

    usuariodao.buscar(user.uid).then(function(usuario){

    alert("user.uid")

    document.getElementById('btn-user').setAttribute("data-status", "logado")
    document.getElementById('btn-user').innerHTML =
      `<button class="btn-dropdown-header dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        OLÁ, ${"usuario.getNome".toUpperCase()}!
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

//***********CÓDIGO LOGIN FIM****************//

document.getElementById('barraBusca').value = ''
filtroBusca();
//criarCartoesEventos();

//FUNÇÕES DA PAGINA

function passarEventoKey(datakey) {
  localStorage.setItem('eventoMarker', datakey.getAttribute("data-key"));
}

function escolhaBusca(escolha) {
  opcaoBusca = escolha.getAttribute("data-tipo");
  document.getElementById('barraBusca').setAttribute("placeholder", `Tipo de Busca: por ${escolha.getAttribute("data-texto")}`)
}

function filtroBusca() {
  $(".card").remove();

  let valBarra = document.getElementById('barraBusca').value

  if (valBarra != '') {
    eventodao.buscarPorNome(opcaoBusca, valBarra).then(function (evento) {
      evento.forEach(criarCartoesEventos)
    })
  } else {
    eventodao.varredura().then(function (evento) {
      evento.forEach(criarCartoesEventos)
    })
  }
}

function criarCartoesEventos(evento) {
  let template = document.querySelector('#cardEventos');
  let listaEventos = document.querySelector('#listaEventos');
  let img = template.content.querySelectorAll("img");
  let titulo = template.content.querySelector("h3");
  let tipo = template.content.querySelector("h6");
  let p = template.content.querySelectorAll("p");
  let a = template.content.querySelectorAll("a");

  let imgLink = document.createElement("imgLink");
  imgLink.src = evento.getURL()

  img[0].setAttribute("src", evento.getURL())
  titulo.textContent = evento.getNome()
  tipo.textContent = evento.getSubtipo()
  p[0].textContent = evento.getDescricao()
  p[1].innerHTML = "<small class='texto-evento font-weight-bold'>" + evento.getDia() + " - " + evento.getHora() + "</small>"
  p[2].innerHTML = "<small class='texto-evento font-weight-bold'>" + evento.getLogradouro() + ", " + evento.getNumero() + ", " + evento.getComplemento() + ", " + evento.getBairro() + ", " + evento.getCidade() + "-" + evento.getUF() + ", " + evento.getCEP() + "</small>"
  a[0].setAttribute("href", "https://" + evento.getSite());
  a[1].setAttribute("data-key", evento.getMarkerKey());

  listaEventos.appendChild(document.importNode(template.content, true));
}

function telaUsuario(componente) {
  let status = $("#log").attr("data-status");
  if (status === "logado") {

    window.location = "usuario.html?" + componente.getAttribute("data-key")
  }
  else {
    window.location.href = "login.html"
  }
}