document.addEventListener("DOMContentLoaded", function () {
  if (typeof marked === "undefined") {
    console.error("Marked.js no está cargado correctamente");
    return;
  }

  loadContent(null, "home.md");
});

function loadContent(event, markdownFile) {
  if (event) {
    event.preventDefault();
  }

  fetch("content/" + markdownFile)
    .then((response) => response.text())
    .then((markdown) => {
      if (typeof marked === "undefined") {
        throw new Error("Marked.js no está cargado correctamente");
      }

      const modal = document.getElementById("modal");
      const markdownContent = document.getElementById("markdown-content");
      markdownContent.innerHTML = marked.parse(markdown);
      modal.style.display = "block";
    })
    .catch((error) => {
      console.error("Error loading markdown file:", error);
    });
}

// Obtener el modal y el botón de cierre
var modal = document.querySelector('.modal');
var closeBtn = document.querySelector('.close');

// Función para cerrar el modal
function closeModal() {
  modal.style.display = 'none';
}

// Cerrar el modal cuando se haga clic en el botón de cierre
closeBtn.onclick = function() {
  closeModal();
}

// Cerrar el modal cuando se haga clic fuera del contenido del modal
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
}

var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Función para verificar el desplazamiento y mostrar/ocultar el botón
function checkScroll() {
  // Obtener la posición actual del scroll
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // Mostrar el botón si el scroll es mayor a 100px, ocultarlo si no
  if (scrollPosition > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Llamar a checkScroll cuando la página se cargue y cada vez que se haga scroll
window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll); // Para asegurarnos de que se compruebe al cargar la página

// Función para realizar el scroll suavemente
function scrollToTop() {
  var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  var scrollStep = -currentScroll / 20; // Ajusta el número más alto para hacer el scroll más suave

  function scrollAnimation() {
    if (document.documentElement.scrollTop !== 0 || document.body.scrollTop !== 0) {
      window.scrollBy(0, scrollStep);
      window.requestAnimationFrame(scrollAnimation);
    }
  }

  scrollAnimation();
}

// Detecta el clic en el botón y llama a la función de scroll suave
scrollToTopBtn.addEventListener("click", function () {
  scrollToTop();
});

