let currentPageUrl = "https://swapi.dev/api/planets/";

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert("Erro ao carregar cards");
    }

    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    const modal = document.getElementById("modal");

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);

    modal.addEventListener('click', hideModal);
};

//chama os planetas
async function loadPlanets(url) {
    // limpa os resultados anteriores
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = "";

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planets) => {
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const planetNameBG = document.createElement("div");
            planetNameBG.className = "planets-name-bg";

            const planetsName = document.createElement("span");
            planetsName.className = "planets-name";
            planetsName.innerText = `${planets.name}`;

            planetNameBG.appendChild(planetsName);
            card.appendChild(planetNameBG);

            //abrir modal
            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";

                // limpa conteudo do modal
                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = "";

                // imagem dos Planetas
                const planetsImage = document.createElement("div");
                planetsImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/planets/${planets.url.replace(/\D/g, "")}.jpg')`;
                planetsImage.className = "planets-image";

                // cria os dados 
                const planetsName = document.createElement("span");
                planetsName.className = "planets-details";
                planetsName.innerText = `Nome: ${planets.name}`;

                const rotation = document.createElement("span");
                rotation.className = "planets-details";
                rotation.innerText = `Rotacao: ${planets.rotation_period} hs`;

                const orbital = document.createElement("span");
                orbital.className = "planets-details";
                orbital.innerText = `Orbita: ${planets.orbital_period}`;

                const diameter = document.createElement("span");
                diameter.className = "planets-details";
                diameter.innerText = `Diametro: ${planets.diameter}`;

                const climate = document.createElement("span");
                climate.className = "planets-details";
                climate.innerText = `Clima: ${convertClimate(planets.climate)}`;

                const terrain = document.createElement("div");
                terrain.className = "planets-details";
                terrain.innerText = `Terreno: ${planets.terrain}`;

                const population = document.createElement("span");
                population.className = "planets-details";
                population.innerText = `Populacao: ${planets.population}`;

                modalContent.appendChild(planetsImage);
                modalContent.appendChild(planetsName);
                modalContent.appendChild(rotation);
                modalContent.appendChild(orbital);
                modalContent.appendChild(diameter);
                modalContent.appendChild(climate);
                modalContent.appendChild(terrain);
                modalContent.appendChild(population);
            }

            mainContent.appendChild(card);
        })

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next; 
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        
        currentPageUrl = url;

    } catch (error) {
        alert("Erro ao carregar os personagens");
        console.log(error);
    }
}

// próxima pagina
async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadPlanets(responseJson.next);
    } catch (error) {
        alert("Erro ao carregar a próxima pagina");
    }
}

// pagina anterior
async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadPlanets(responseJson.previous);
    } catch (error) {
        alert("Erro ao carregar a pagina anterior");
    }
}

 // fecha modal
 function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}

// converte dados de ingles para o portugues, as informações da api estão vindo em ingles

const convertClimate = (climate) => {
    const clima = {
        arid: "arido",
        temperate: "temperado",
        frozen: "frio",
        murky: "obscuro",
        windy: "ventoso",
        hot: "quente",
        frigid: "frígido",
        humid: "umido",
        moist: "umido",
        polluted: "poluido",
        superheated: "super aquecido",
        unknow: "desconhecido"
    }

    return clima[climate.toLowerCase()] || climate;
}