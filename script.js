let currentPageUrl = "https://swapi.dev/api/people/";

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert("Erro ao carregar cards");
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    const modal = document.getElementById("modal");


    nextButton.addEventListener('click', loadNextPage)

    backButton.addEventListener('click', loadPreviousPage)

    modal.addEventListener('click', hideModal)
};


// chama os personagens
async function loadCharacters(url) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = ""; //limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const characterNameBG = document.createElement("div");
            characterNameBG.className = "character-name-bg";

            const characterName = document.createElement("span");
            characterName.className = "character-name";
            characterName.innerText = `${character.name}`;

            characterNameBG.appendChild(characterName);
            card.appendChild(characterNameBG);

            // clique no card, abre modal
            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";
            }

           

           

            mainContent.appendChild(card);
        });

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

        await loadCharacters(responseJson.next);
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

        await loadCharacters(responseJson.previous);
    } catch (error) {
        alert("Erro ao carregar a pagina anterior");
    }
}


 // fecha modal
function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}
