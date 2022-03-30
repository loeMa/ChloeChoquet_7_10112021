import {recipes} from './../data/recipes.js';



const sectionRecipes = document.querySelector('.recipes');
const input = document.getElementById('inputSearch');
const errorH2 = document.querySelector('.error');


//===========Création du DOM===============

const recipesDom = (data) =>{

    const article = document.createElement('article');
    const imgArticle = document.createElement('img');
    const titleDiv = document.createElement('div');
    const titleRecipe = document.createElement('h2');
    const spanTitle = document.createElement('span');
    const timeImg = document.createElement('img');
    const titleTime = document.createElement('h2');
    const contentDiv = document.createElement('div');
    const ingredientDiv = document.createElement('div');
    const descriptionDiv = document.createElement('div');
    const descriptionP = document.createElement('p');

    article.classList.add('recipes__article');
    titleDiv.classList.add('recipes__article__title');
    contentDiv.classList.add('recipes__article__content');
    descriptionDiv.classList.add('recipes__article__description');
    
    imgArticle.alt = "";
    
    titleRecipe.innerHTML = data.name;
    titleTime.innerHTML = `${data.time} min`;
    timeImg.src = './assets/img/time.png';
    descriptionP.innerHTML = data.description;
    
    data.ingredients.forEach((e) =>{
        const ingredientText = document.createElement('div');
        const ingredientH3 = document.createElement('h3');
        const ingredientContent = document.createElement('p');
        ingredientText.classList.add('recipes__article__content--ingredient');

        ingredientDiv.appendChild(ingredientText);
        ingredientText.appendChild(ingredientH3);
        ingredientText.appendChild(ingredientContent);

        ingredientH3.innerHTML = e.ingredient;

        if(e.quantity === undefined ){
            ingredientContent.innerHTML = ``;
        }else if(e.unit === undefined){
            ingredientContent.innerHTML = `: ${e.quantity}`;
        }else if(e.unit === 'grammes'){
            e.unit = 'g';
            ingredientContent.innerHTML = ` : ${e.quantity} ${e.unit}`;
        }else{
            ingredientContent.innerHTML = ` : ${e.quantity} ${e.unit}`;
        }
    })
    
    sectionRecipes.appendChild(article);
    article.appendChild(imgArticle);
    article.appendChild(titleDiv);
    article.appendChild(contentDiv);
    titleDiv.appendChild(titleRecipe);
    spanTitle.appendChild(timeImg);
    spanTitle.appendChild(titleTime);
    titleDiv.appendChild(spanTitle);
    contentDiv.appendChild(ingredientDiv);
    contentDiv.appendChild(descriptionDiv);
    descriptionDiv.appendChild(descriptionP);
    
}

//===fonction pour lancer la reaction du dom===

function displayRecipe(value){
    sectionRecipes.innerHTML = '';
    if(value.length === 0){
        console.log('array is empty');
        errorH2.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc..';
    }else{
        errorH2.innerHTML = '',
        value.forEach(e =>{
            recipesDom(e);
            
        }) 
        console.log(value);
    }
    
    
}

displayRecipe(recipes);


//=============Event sur l'input==============

input.addEventListener('input', (e) =>{
    e.preventDefault();

if(e.target.value.length >= 3){
    
    let newData = findByPrincipal(recipes, e.target.value);
    
    displayRecipe(newData)
}else{
    
    displayRecipe(recipes);
}
})

//=============fonction tri avec l'input principal (filter)==============

function findByPrincipal(data, requete){
    if(requete.includes(' ')){
        console.log('ya un espace')
    }
        return data.filter((el) =>{
            let title = el.name;
            let desc = el.description;
            let ingred = el.ingredients;
    
            let resultTitle = title.toLowerCase().indexOf(requete.toLowerCase())!== -1;
            let resultDesc = desc.toLowerCase().indexOf(requete.toLowerCase())!== -1;
    
            let resultIngred = ingred.map((i) => i.ingredient.toLowerCase().indexOf(requete.toLowerCase())!== -1);
            if(resultIngred.includes(true)){
                return el
            }  
            
            /* for(let i of ingred){
                let listIngred = i.ingredient;
                
                const resultIngred = listIngred.toLowerCase().indexOf(requete.toLowerCase())!== -1;
                if(resultIngred){
                    return el
                }
            }   */ 
            

            return resultTitle, resultDesc ;
        })
    }


//==============list des appliances/ingredients/ustensils=====================
let listAppliances = [];
let listUstensils = [];
let listIngredients = [];
recipes.forEach((recette) => {
    listAppliances.push(recette.appliance);
    recette.ustensils.forEach((e) => listUstensils.push(e));
    recette.ingredients.forEach((e) => listIngredients.push(e.ingredient))
})
let arrayAppliances =  [...new Set(listAppliances)];
let arrayUstensils = [...new Set(listUstensils)]
let arrayIngredients = [...new Set(listIngredients)]

//==============list des ingredients=====================


const filterRecipe = (filters) =>{
    let filtArr = recipes;
    listIngredients = [];
    listAppliances = [];

    filters.forEach((filter) =>{
        filtArr = filtArr.filter((recette) =>{
            let ingredientFilter = recette.ingredients;

            if(filter.type == "requete"){
                //
            console.log(filter.type)

            }if(filter.type == "ingredients" ){
                for(let i of ingredientFilter){
                    let listIngred = i.ingredient;
                    
                    const resultIngred = listIngred.toLowerCase().indexOf(filter.value.toLowerCase())!== -1;
                    if(resultIngred){
                        filtArr = recette;
                        
                        return filtArr
                    }
                } 

            }if(filter.type == "appareils" && recette.appliance.includes(filter.value) ){
                arrayAppliances= [recette.appliance];
                
                return true

            }else{
                console.log('pas bien');
                return false
            }
        })
    })
    displayRecipe(filtArr)
    filtArr.forEach((item) =>{
        item.ingredients.forEach((e) => listIngredients.push(e.ingredient));
        listAppliances.push(item.appliance);
        arrayIngredients = [...new Set(listIngredients)];
        arrayAppliances =  [...new Set(listAppliances)];
        
    })
    domCheckbox(arrayAppliances, listBlockAppareil, 'appareils')
    domCheckbox(arrayIngredients, dropdownIngredUl, 'ingredients');
    addSpan()
    
    //
    
    
    console.log(arrayAppliances)
    
    return true
}

function addSpan(){
    span.forEach((e) =>{
        //e.classList.add(id); 
        tagDom(e);
    })
}
//===========declaration variables===============

const dropdownIngredBtn = document.querySelector('#arrow1__btn');
const dropdownIngredUl = document.querySelector('.dropdownIngred__list');
const arrow1 = document.getElementById('arrow1');
const arrowUp = document.querySelector('arrowUp');
let dropdownIngredList;
let listBtn;
let span;
let li;
let aIngred;

//let filtreArr = [];

let allRecipes = Array.from(recipes);


const appareilBtn = document.querySelector('#arrow2__btn');
const arrow2 = document.getElementById('arrow2');
const listBlockAppareil = document.querySelector('.list__block');

const filterTagBlock = document.querySelector('.filterTag');


//===========au click du filtre appareil===============

domCheckbox(arrayAppliances, listBlockAppareil, 'appareils')
addSpan( )
appareilBtn.addEventListener('click', (e) =>{
    arrow2.classList.toggle('arrowUp');
    
    if(arrow2.classList.contains('arrowUp')){
        listBlockAppareil.style.display = 'grid';
        
    }else{
        listBlockAppareil.style.display = 'none';
    }
})

//===========au click du filtre Ingredient===============
domCheckbox(arrayIngredients, dropdownIngredUl, 'ingredients');

dropdownIngredBtn.addEventListener('click', (e) =>{
    
    arrow1.classList.toggle('arrowUp');
    
    if(arrow1.classList.contains('arrowUp')){
        dropdownIngredUl.style.display = 'grid';
        
    }else{
        dropdownIngredUl.style.display = 'none';
        
    }
    
})
let filtersArray = [];
let filtersBox = {};
let arr = []

function domTag(data){
    const tag = document.createElement('button');
    tag.value = data.target.id
    tag.classList.add('filterTag__btn');
    tag.innerHTML = `<p>${data.target.id}</p> <a class="filterTag--close"><img  src="./assets/icons/xmarkRound.svg" alt="cancel filter"/></a>`;
    filterTagBlock.appendChild(tag);
}
//===========Création des tag et filtrage el===============

function tagDom(data, array){

    data.addEventListener('click', (i) =>{
        span.forEach((e) =>{
            e.remove();
        })
    arr.push(data)

        const id =document.getElementById(i.target.id);

            filtersBox = {'type' : i.target.classList[1], 'value' : i.target.id}
            filtersArray.push(filtersBox)

            let newTest = filterRecipe(filtersArray)
            
            console.log(filtersArray)
            domTag(i)
            /* const tag = document.createElement('button');
            tag.value = i.target.id
            tag.classList.add('filterTag__btn');
            tag.innerHTML = `<p>${i.target.id}</p> <a class="filterTag--close"><img  src="./assets/icons/xmarkRound.svg" alt="cancel filter"/></a>`;
            filterTagBlock.appendChild(tag); */
            //i.target.parentNode.style.display = "none";

            const tagClose = document.querySelectorAll('.filterTag--close');
            
            
            tagClose.forEach((event) =>{
                
                event.addEventListener('click', () =>{

                    event.parentNode.remove();
                    let idInput = arr.find((input) => input.id == event.parentNode.value);
                    console.log(idInput)
                    idInput.style.display = "block";
                    idInput.checked = false;
                    span.forEach((e) =>{
                        e.remove();
                    })
                    /* arr = arr.filter(item => item.id != idInput.id)
                    console.log(arr) */

                    filtersArray = filtersArray.filter((item) => item.value != event.parentNode.value );
                    console.log(filtersArray)
                    filterRecipe(filtersArray); 
                    
                })
            }) 

        
    }) 
}

//===========afficher liste ingredients===============


function showItems(data){
    
    let limited = [];
    let array = [];
    data.forEach((e) =>{
        let ingredient = e.ingredients;
        ingredient.forEach((i) =>{
            if(!array.includes(i.ingredient.toLowerCase())){
                array.push(i.ingredient.toLowerCase())
            }else{
                console.log('nop')
            }
        })
    }) 
    limited = array.slice(0, 30)
    limited.forEach((e) =>{
        
        //const liIngred = document.createElement('div');
        const aIngred = document.createElement('li');
        const labelIngred = document.createElement('label');
        labelIngred.setAttribute('for', e) ;
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox';
        checkbox.name = 'ingredients';
        checkbox.id = e;
        checkbox.value = e;
        //liIngred.classList.add('dropdownIngred__list');
        aIngred.classList.add('dropdownIngred__list');

        labelIngred.innerHTML = e;
        
        //dropdownIngredUl.appendChild(liIngred);
        dropdownIngredUl.appendChild(aIngred);
        aIngred.appendChild(labelIngred)
        aIngred.appendChild(checkbox)
        
    })
    //dropdownIngredList = document.querySelectorAll('.dropdownIngred__list');
    checkbox = document.querySelectorAll('input[type= "checkbox"]');
    aIngred = document.querySelectorAll('.dropdownIngred__list')
}


//===========afficher liste appareils===============

function showAppareil(data){
    /* let array = [];
    data.forEach((e) =>{
        let appareil = e.appliance;

        if(!array.includes(appareil)){
            array.push(appareil)
        }else{
            console.log('nop')
        }
    }) 
    array.forEach((e) =>{
        const labelAppareil = document.createElement('label');
        const liAppareil = document.createElement('li');
        labelAppareil.setAttribute('for', e);
        const listBtn = document.createElement('input');
        listBtn.type = 'checkbox';
        listBtn.name = 'appareils';
        listBtn.id = e;
        listBtn.value = e;
        liAppareil.classList.add('list__items');
        
        labelAppareil.innerHTML = e;

        listBlockAppareil.appendChild(li);
        liAppareil.appendChild(labelAppareil);
        liAppareil.appendChild(listBtn) ;
        
    })
    checkbox = document.querySelectorAll('input[type= "checkbox"]');
    listBtn = document.querySelectorAll('.list__items'); */
    
    
}


function domCheckbox(data, ul, addClass){
let limited = [];
    limited = data.slice(0, 30)
    
    limited.forEach((e) =>{

        const span = document.createElement('span');
        
        span.id = e;
        span.innerHTML = e;
        
        span.classList.add('list__items');
        span.classList.add(addClass);
        
        ul.appendChild(span);
        
    })
    
    span = document.querySelectorAll('.list__items')
}

/* let limited = [];
    limited = data.slice(0, 30)
    limited.forEach((e) =>{

        const label = document.createElement('label');
        const li = document.createElement('li');
        const checkbox = document.createElement('input')
        label.setAttribute('for', e) ;
        checkbox.type = 'checkbox';
        checkbox.id = e;
        checkbox.value = e;
        
        li.classList.add('list__items');

        label.innerHTML = e;
        
        ul.appendChild(li);
        
        li.appendChild(label)
        li.appendChild(checkbox) 
        
    })
    checkbox = document.querySelectorAll('input[type= "checkbox"]');
    li = document.querySelectorAll('.list__items') */