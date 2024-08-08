let currentPageUrl = "https://swapi.dev/api/starships/"

window.onload = async () => {
    try {
        await loadStarShips(currentPageUrl);
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

// chama as naves
async function loadStarShips(url) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = "" // limpa os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((starships) => {
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards";

            const starshipsNameBG = document.createElement("div");
            starshipsNameBG.className = "starship-name-bg";

            const starshipName = document.createElement("span");
            starshipName.className = "starship-name";
            starshipName.innerText = `${starships.name}`;

            starshipsNameBG.appendChild(starshipName);
            card.appendChild(starshipsNameBG);

            // abrir modal ao clicar no card
            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";

                // limpa o conteudo do modal
                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = "";

                // imagem das naves
                const starshipImage = document.createElement("div");
                starshipImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg')`
                starshipImage.className = "starship-image";

                // cria os dados das naves
                const name = document.createElement("span");
                name.className = "starship-details";
                name.innerText = `Nome: ${starships.name}`;

                const model = document.createElement("span");
                model.className = "starship-details";
                model.innerText = `Modelo: ${starships.model}`;

                const costInCredits = document.createElement("span");
                costInCredits.className = "starship-details";
                costInCredits.innerText = `Créditos: ${starships.cost_in_credits}`

                const speedMax = document.createElement("span");
                speedMax.className = "starship-details";
                speedMax.innerText = `Velocidade: ${starships.max_atmosphering_speed}`;


                const passenger = document.createElement("span");
                passenger.className = "starship-details";
                passenger.innerText = `Passageiros: ${starships.passengers}`;

                modalContent.appendChild(starshipImage);
                modalContent.appendChild(name);
                modalContent.appendChild(model);
                modalContent.appendChild(costInCredits);
                modalContent.appendChild(speedMax);
                modalContent.appendChild(passenger);
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
        alert("Erro ao carregar as naves");
        console.log(error);
    }
    
}

// próxima pagina
async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadStarShips(responseJson.next);
    } catch (error) {
        alert("Erro ao carregar próxima pagina")
    }
}

// pagina anterior
async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadStarShips(responseJson.previous);
    } catch (error) {
        alert("Erro ao carregar pagina anterior");
    }
}


 // fecha modal
 function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}