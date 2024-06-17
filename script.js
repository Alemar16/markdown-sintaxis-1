// Cuando el DOM esté completamente cargado, se ejecutará la función de callback.
document.addEventListener("DOMContentLoaded", function () {
  // Primero, verificamos si la biblioteca 'marked' está disponible. 
  // 'marked' es una biblioteca que nos permite convertir texto en formato Markdown en HTML.
  // Si 'marked' no está disponible, mostramos un mensaje de error en la consola y terminamos la función.
  if (typeof marked === "undefined") {
    console.error("Marked.js no está cargado correctamente");
    return;
  }

  // Luego, llamamos a la función 'loadContent' para cargar el contenido del archivo 'home.md'.
  // La función 'loadContent' se encargará de cargar el contenido del archivo y renderizarlo en el elemento HTML con el id 'content'.
  loadContent(null, "home.md");
});

// Esta es la función 'loadContent' que se encarga de cargar el contenido del archivo Markdown y renderizarlo en el HTML.
function loadContent(event, markdownFile) {
  // Si se proporciona un evento, lo evitamos para evitar que se ejecute la acción por defecto.
  if (event) {
    event.preventDefault();
  }

  // Utilizamos la API fetch para obtener el contenido del archivo Markdown.
  fetch("content/" + markdownFile)
    .then((response) => response.text())
    .then((markdown) => {
      // Luego, verificamos nuevamente si 'marked' está disponible.
      // Si 'marked' no está disponible, lanzamos un error.
      if (typeof marked === "undefined") {
        throw new Error("Marked.js no está cargado correctamente");
      }

      // Finalmente, utilizamos la función 'parse' de 'marked' para convertir el contenido Markdown en HTML y lo insertamos en el elemento HTML con el id 'content'.
      document.getElementById("content").innerHTML = marked.parse(markdown);
    })
    .catch((error) => {
      // Si ocurre algún error al cargar el archivo Markdown, lo mostramos en la consola.
      console.error("Error loading markdown file:", error);
    });
}


// Obtener el botón de desplazamiento hacia arriba
var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Mostrar u ocultar el botón según la posición de desplazamiento
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Desplazarse hacia arriba cuando se hace clic en el botón
scrollToTopBtn.onclick = function() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};