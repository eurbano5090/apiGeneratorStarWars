import { peticionFetch,ajax } from "./funciones.js";

const urlBase = "https://swapi.dev/api/people/";


const estadoSecciones = {
    "section-1": { start: 1, end: 5, current: 0, container: "personajes-section-1" },
    "section-2": { start: 6, end: 11, current: 0, container: "personajes-section-2" },
    "section-3": { start: 12, end: 16, current: 0, container: "personajes-section-3" }
};

function * generadorPersonajes(personajes) {
    let i = 0;
    while (i < personajes.length) {
        yield personajes[i];
        i++;
    }
    return 'terminado';
}


const mostrarPersonajes = async (sectionId) => {
    const {start, end, current, container } = estadoSecciones[sectionId];
    if (!estadoSecciones[sectionId].generador) {
        const promesas = [];
        for (let index = start; index <= end; index++) {
          const url = `${urlBase}${index}/`;
          const promesa = peticionFetch(url);
          promesas.push(promesa);
        }
    try {

    const respuesta = await Promise.all(promesas);

    estadoSecciones[sectionId].generador = generadorPersonajes(respuesta);
} catch (error) {
  console.error("Error al obtener los datos de personajes:", error);
  return;
}
}
const generador = estadoSecciones[sectionId].generador;
const { value: personaje, done } = generador.next();

if (!done) {
  $("#" + container).append(`
    <div class="single-timeline-content d-flex" data-wow-delay="0.3s">
      <div class="timeline-icon" id="${sectionId}"></div>
      <div class="timeline-personaje">
        <h6><b>${personaje.name}</b></h6>
        <p>Estatura:${personaje.height} cms. Peso: ${personaje.mass} kg.</p>
      </div>
    </div>
  `);
  console.log(personaje); 
  estadoSecciones[sectionId].current++;
} else {
  console.log("Todos los personajes han sido mostrados para esta sección.");
}
};

$("#section-1").on("mouseenter", () => mostrarPersonajes("section-1"));
$("#section-2").on("mouseenter", () => mostrarPersonajes("section-2"));
$("#section-3").on("mouseenter", () => mostrarPersonajes("section-3"));


