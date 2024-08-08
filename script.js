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

                // limpa o conteudo da modal
                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = "";

                // imagem do personagem
                const characterImage = document.createElement("div");
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`;
                characterImage.className = "character-image";

                // cria os dados do personagem
                const name = document.createElement("span");
                name.className = "character-details";
                name.innerText = `Nome: ${character.name}`;

                const characterHeight = document.createElement("span");
                characterHeight.className = "character-details";
                characterHeight.innerText = `Altura: ${convertHeight(character.height)} cm`;

                const mass = document.createElement("span");
                mass.className = "character-details";
                mass.innerText = `Peso: ${convertMass(character.mass)}`;

                const eyeColor = document.createElement("span");
                eyeColor.className = "character-details";
                eyeColor.innerText = `Cor dos Olhos: ${convertEyeColor(character.eye_color)}`;

                const birthYear = document.createElement("span");
                birthYear.className = "character-details";
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`;

                modalContent.appendChild(characterImage);
                modalContent.appendChild(name);
                modalContent.appendChild(characterHeight);
                modalContent.appendChild(mass);
                modalContent.appendChild(eyeColor);
                modalContent.appendChild(birthYear);
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

// converte dados de ingles para o portugues, as informações da api estão vindo em ingles

const convertEyeColor = (eyeColor) => {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    }

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

const convertHeight = (height) => {
    if(height === "unknown"){
        return "Desconhecida";
    }
    
    return (height / 100).toFixed(2);
}


const convertMass = (mass) => {
    if(mass === "unknown"){
        return "Desconhecido";
    }

    return `${mass} kg`
}


const convertBirthYear = (birthYear) => {
    if(birthYear === "unknown"){
        return "Desconhecido"
    }

    return birthYear;
}