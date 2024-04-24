let data = []; 
const getRandomSpecies = async () => {
    const response = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json");
    data = await response.json();
    displayPets(data); 
};

const filterPetsBySpecies = (species) => {   
    const filteredPets = data.filter(pet => pet.species === species && !pet.deleted);
    displayPets(filteredPets);
};


//this function is made for to show the all the speices inside the button content...

const displayPets = (pets) => {
    const containerContent = document.querySelector('.container-content');
    containerContent.innerHTML = '';

    if (pets.length === 0) {
        const message = document.createElement('div');
        message.innerHTML = 'No data available';
        containerContent.appendChild(message);
    } else {
        pets.forEach(pet => {
        const petContainer = document.createElement('div');
        petContainer.classList.add('card');
        petContainer.innerHTML = `
                <img src="${pet.photo}">
                <p>${pet.name}</p>
                <p>${pet.species}</p>
                <p>${pet.birthYear}</p>
                <button class="delete-button">Delete</button> 
            `;
            containerContent.appendChild(petContainer);
        });
    }
};

const handleDelete = (event) => {

    let element = event.target;
        const petName = element.parentElement.querySelector('p').innerHTML;
        const petIndex = data.findIndex(pet => pet.name === petName);
            if(element.getAttribute('class') ==='delete-button') 
            {
                data.splice(petIndex, 1); 
                element.parentElement.remove();
            }   
};

getRandomSpecies()

const allButton = document.querySelector('#all-button');
const catButton = document.querySelector('#cat-button');
const dogButton = document.querySelector('#dog-button');
const rabbitButton = document.querySelector('#rabbit-button');

allButton.addEventListener('click', () => {
    setActiveButton('all-button');
    displayPets(data.filter(pet => !pet.deleted));  
});

catButton.addEventListener('click', () => {
    setActiveButton('cat-button');
    filterPetsBySpecies('cat');  
});

dogButton.addEventListener('click', () => {
    setActiveButton('dog-button');
    filterPetsBySpecies('dog');
});

rabbitButton.addEventListener('click', () => {
    setActiveButton('rabbit-button');
    filterPetsBySpecies('rabbit');
});


//this function is made for to show the background color of the active button...
const setActiveButton = (buttonId) => {
    const buttons = document.querySelectorAll('.button-section button');
    buttons.forEach(button => {
        if (button.id === buttonId) {
            button.style.backgroundColor = '#ff0000';
            button.style.color = '#ffffff'; 
        } else {
            button.style.backgroundColor = ''; 
            button.style.color = ''; 
        }
    });
};

document.addEventListener('click', handleDelete);

