const API_KEY = '108d9839';
const input = document.getElementById('title');
const btn = document.getElementById('search-btn');

btn.addEventListener('click', () => {
    const titulo = input.value.trim();
    if (!titulo) {
    console.log('Introduce un título');
    return;
    }
    console.log(titulo);

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(titulo)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "False") {
            console.log("No encontrada:", data.Error);
            } else {
            console.log("Año:", data.Year);
            console.log("Director:", data.Director);

            resultado.innerHTML = `
              <p><strong>Título:</strong> ${data.Title}</p>
              <p><strong>Año:</strong> ${data.Year}</p>
              <p><strong>Director:</strong> ${data.Director}</p>
            `;

            }
        })
        .catch(error => console.error("Error en la petición:", error));

});


