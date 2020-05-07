const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAIN = document.getElementsByClassName('card_location')[0];
function call_newPokemon(id){
   fetch(`${BASE_URL}/trainers/${id}/pokemons/new`).then(response => response.json()).then(function(data){
    if (data['message']){
        alert(data.message)
    }
    else{
        MAIN.innerHTML = ''
        showTrainer(data);
    }
}).catch((error) => console.log(error.message))
}


function releasePokemon(poke_id, trainer_id){
    fetch(`${BASE_URL}/trainers/${trainer_id}/pokemons/${poke_id}/delete`, {
        method: 'GET'
    }).then(response => response.json()).then(data => alert(data.message))
    getAllTrainers();

}
function showTrainer(data){
    createCard(data.data);
    const button = document.createElement('button');
    button.innerText = 'All Trainers';
    button.addEventListener('click', function(){
        getAllTrainers();
    })
    MAIN.appendChild(button);
}

function createDeleteButton(li, pokemon, trainer_id){
    const button = document.createElement('button');
    button.hasAttribute("data-pokemon-id", pokemon['id']);
    button.innerText = 'Release Pokemon';
    button.addEventListener('click', function(){
        releasePokemon(pokemon['id'], trainer_id);
    })
    li.appendChild(button);  
}
function createButton(div, element){
    const button = document.createElement('button');
    button.hasAttribute("data-trainer-id", element['id']);
    button.innerText = 'Add Pokemon';
    button.addEventListener('click', function(){
        call_newPokemon(element['id']);
    })
    div.appendChild(button);
}

function createCard(element){
    const div = document.createElement('div');
    div.classList.add('card');
    div.hasAttribute('data-id', element['id']);
    MAIN.appendChild(div);
  
    let para = document.createElement('p');
    para.innerText = `${element.attributes.name}`;
    div.appendChild(para);
    createButton(div, element)
    
    let list = document.createElement('ul');
    
    for(let i = 0; i < element['attributes']['pokemons'].length; i++){
        let li = document.createElement('li');
        li.innerText = `${element['attributes']['pokemons'][i]['species']} ${element['attributes']['pokemons'][i]['nickname']}`;
        createDeleteButton(li, element['attributes']['pokemons'][i], element['id']);
        list.appendChild(li);
    }
    div.appendChild(list);
}

function getAllTrainers(){
    MAIN.innerHTML = ' ';
    fetch(`${BASE_URL}/trainers`).then(response => response.json()).then(function(data){
        addToPage(data.data);
    }).catch((error) => console.log(error.message))

}

function addToPage(attrib){
    for(const element of attrib){
       createCard(element);
    }
}
    
document.addEventListener('DOMContentLoaded', function(){
    getAllTrainers()
    
})