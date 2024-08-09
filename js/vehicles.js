let currentPageUrl = "https://swapi.dev/api/vehicles/";

window.onload = async () => {
    try {
        await loadVehicles(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert("Erro ao carregar cards");
    }

    const nextButton = document.getElementById('next-button');
    const backButton =  document.getElementById('back-button');

    const modal = document.getElementById('modal');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);

    modal.addEventListener('click', hideModal);
};

//chama os veículos
async function loadVehicles() {
    // limpa os resultados anteriores
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = "";

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((vehicles) => {
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg')`;
            card.className = 'cards';

            const vehiclesNameBG = document.createElement("div");
            vehiclesNameBG.className = 'vehicles-name-bg';

            const vehiclesName = document.createElement('span');
            vehiclesName.className = 'vehicles-name';
            vehiclesName.innerText = `${vehicles.name}`;

            vehiclesNameBG.appendChild(vehiclesName);
            card.appendChild(vehiclesNameBG);

            // clicar no card abre o modal
            card.onclick = () => {
                const modal = document.getElementById('modal');
                modal.style.visibility = 'visible';

                // limpa o conteudo do modal
                const modalContent = document.getElementById('modal-content');
                modalContent.innerHTML = '';

                // imagem do veículo
                const vehicleImage = document.createElement('div');
                vehicleImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg')`;
                vehicleImage.className = 'vehicles-image';

                // cria os dados do veículos
                const nameVehicles = document.createElement('span');
                nameVehicles.className = 'vehicles-details';
                nameVehicles.innerText = `Nome: ${vehicles.name}`

                const model = document.createElement('span');
                model.className = 'vehicles-details';
                model.innerText = `Modelo: ${vehicles.model}`;

                const manufacturer = document.createElement('span');
                manufacturer.className = 'vehicles-details';
                manufacturer.innerText = `Fabricado: ${vehicles.manufacturer}`;

                const capacity = document.createElement('span');
                capacity.className = 'vehicles-details';
                capacity.innerText = `Capacidade: ${vehicles.capacity}`;

                modalContent.appendChild(vehicleImage);
                modalContent.appendChild(nameVehicles);
                modalContent.appendChild(model);
                modalContent.appendChild(manufacturer);
                modalContent.appendChild(capacity);
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
        alert("Erro ao carregar os veículos");
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