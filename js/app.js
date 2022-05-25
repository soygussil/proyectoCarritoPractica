//variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];
cargarEventListeners();
function cargarEventListeners() {
  //Cuando agregas un curso presionando 'Agregar al carrito'
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito

  carrito.addEventListener("click", eliminarCurso);
  //muestra los cursos de localStorage
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });
  //vaciar carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; //Vaciando el carrito
    limpiarHTML(); //Eliminamos todo html
  });
}

//Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}
// elimina curso del carrito

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //Eliminar del arreglo de articulosCarrito data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML();
  }
}

//function lee el contenido del html al que se le dio click y se extrae la información del curso
function leerDatosCurso(curso) {
  // console.log(curso);
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++; //Retorna objeto actualizado
        return curso;
      } else {
        return curso; //retorna objetnos no duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agregamos curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  //agrega elementos al carrito

  console.log(articulosCarrito);
  carritoHTML();
}

//Muestra el carrito de compras en el HTML

function carritoHTML() {
  //Limpiar HTML
  limpiarHTML();
  //Recorre el carrito y genera el html

  articulosCarrito.forEach((curso) => {
    // console.log(curso);
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
    <img src='${imagen}' width='100'>
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
    <a href='#' class='borrar-curso' data-id='${id}'> X
    </a>
    </td>
    `;

    //Agrega el html del carrito en el tbody

    contenedorCarrito.appendChild(row);
  });

  //agregar carrito compras a storage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//Eliminar cursos tbdoy

function limpiarHTML() {
  // forma lenta
  // contenedorCarrito.innerHTML = "";
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
