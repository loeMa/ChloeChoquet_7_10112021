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
        displayRecipe(newData);
    }else{
        
        displayRecipe(recipes);
    }
})

//=============fonction tri avec l'input principal (filter)==============

function findByPrincipal(data, requete){
    if(requete.includes(' ')){
        console.log('ya un espace');
    }
        return data.filter((el) =>{
            let title = el.name;
            let desc = el.description;
            let ingred = el.ingredients;
    
            let resultTitle = title.toLowerCase().indexOf(requete.toLowerCase())!== -1;
            let resultDesc = desc.toLowerCase().indexOf(requete.toLowerCase())!== -1;
    
            let resultIngred = ingred.map((i) => i.ingredient.toLowerCase().indexOf(requete.toLowerCase())!== -1);
            if(resultIngred.includes(true)){
                return el;
            }  
            
            /* for(let i of ingred){
                let listIngred = i.ingredient;
                
                const resultIngred = listIngred.toLowerCase().indexOf(requete.toLowerCase())!== -1;
                if(resultIngred){
                    return el
                }
            }   */ 
            

            return resultTitle, resultDesc;
        })
    }


//==============list des appliances/ingredients/ustensils=====================
let listAppliances = [];
let listUstensils = [];
let listIngredients = [];
recipes.forEach((recette) => {
    listAppliances.push(recette.appliance);
    recette.ustensils.forEach((e) => listUstensils.push(e));
    recette.ingredients.forEach((e) => listIngredients.push(e.ingredient));
})
let arrayAppliances =  [...new Set(listAppliances)];
let arrayUstensils = [...new Set(listUstensils)];
let arrayIngredients = [...new Set(listIngredients)];
let ingredientlistRequete = [];
let spanTarget = [];

//==============Filtre par bouton tag=====================

const filterRecipe = (filters) =>{
    let filtArr = recipes;
    listIngredients = [];
    listAppliances = [];
    spanTarget = [];
    listUstensils = [];
    

    filters.forEach((filter) =>{
        filtArr = filtArr.filter((recette) =>{
            let ingredientFilter = recette.ingredients;

            if(filter.type == "requete"){

                ingredientlistRequete = arrayIngredients.filter(ingredient => {
                    return ingredient.toLowerCase().includes(filter.value.toLowerCase());
                });
                return ingredientlistRequete

            }if(filter.type == "ingredients" ){
                for(let i of ingredientFilter){
                    let listIngred = i.ingredient;
                    
                    const resultIngred = listIngred.toLowerCase().indexOf(filter.value.toLowerCase())!== -1;
                    if(resultIngred){
                        filtArr = recette;
                        
                        return filtArr;
                    }
                } 
                span.forEach((item) =>{
                    let spanResult = item.id.includes(filter.value); 
                    if(spanResult){
                        spanTarget.push(item);
                    }
                })

            }if(filter.type == "appareils" && recette.appliance.includes(filter.value) ){
                arrayAppliances= [recette.appliance];
                span.forEach((item) =>{
                    let spanResult = item.id.includes(filter.value); 
                    if(spanResult){
                        spanTarget.push(item);
                    }
                })
                return true;

            }if(filter.type == "ustensils" && recette.ustensils.includes(filter.value) ){
                //arrayUstensils= [recette.ustensils];
                /* recette.ustensils.forEach(e =>{
                    arrayUstensils.push(e)
                }) */
                span.forEach((item) =>{
                    let spanResult = item.id.includes(filter.value); 
                    if(spanResult){
                        spanTarget.push(item);
                    }
                })
                return true;

            }else{
                console.log('pas bien');
                return false;
            }
        })
        
    })
    displayRecipe(filtArr);
    filtArr.forEach((item) =>{
        item.ingredients.forEach((e) => listIngredients.push(e.ingredient));
        item.ustensils.forEach((e) => listUstensils.push(e));
        listAppliances.push(item.appliance);
        arrayIngredients = [...new Set(listIngredients)];
        arrayAppliances =  [...new Set(listAppliances)];
        arrayUstensils = [...new Set(listUstensils)]
    })
    
    domSpan(arrayAppliances, listBlockAppareil, 'appareils');
    domSpan(arrayIngredients, dropdownIngredUl, 'ingredients');
    domSpan(arrayUstensils, listBlockUstensils, 'ustensils');
    addSpan();

    //console.log(arrayUstensils);
    return true;
}


//===========declaration variables===============

const dropdownIngredBtn = document.querySelector('#arrow1__btn');
const dropdownIngredUl = document.querySelector('.dropdownIngred__list');
const ingredientBlock = document.querySelector('.dropdownIngred')
const arrow1 = document.getElementById('arrow1');
const arrowUp = document.querySelector('arrowUp');
const appareilBtn = document.querySelector('#arrow2__btn');
const arrow2 = document.getElementById('arrow2');
const listBlockAppareil = document.querySelector('.list__block');
const listBlockUstensils = document.querySelector('.list__block--ustensils');
const ustensilsBtn = document.querySelector('#arrow3__btn');
const arrow3 = document.getElementById('arrow3');
const filterTagBlock = document.querySelector('.filterTag');
const btnSearch = document.querySelector('.dropdownIngred__search');
const appareilBlock = document.querySelector('.appareil');
const ustensilsBlock = document.querySelector('.ustensils')
let span;
let filtersArray = [];
let filtersBox = {};
let arrayInput = [];

//===========lancement dom span et displayTag===============

domSpan(arrayAppliances, listBlockAppareil, 'appareils');
domSpan(arrayIngredients, dropdownIngredUl, 'ingredients');
domSpan(arrayUstensils, listBlockUstensils, 'ustensils');
addSpan()

//===========au click des filtres générique===============
function openFilters(input, arrow, block, list){
    input.addEventListener('click', (e) =>{
        arrow.classList.toggle('arrowUp');
        
        if(arrow.classList.contains('arrowUp')){
            block.style.display = 'grid';
            list.style.height = "100%";
            
        }else{
            block.style.display = 'none';
            list.style.height = "70px";
        }
    })
}

//===========au click du filtre lancement function===============

openFilters(appareilBtn, arrow2, listBlockAppareil, appareilBlock);
openFilters(dropdownIngredBtn, arrow1, dropdownIngredUl, ingredientBlock);
openFilters(ustensilsBtn, arrow3, listBlockUstensils, ustensilsBlock);


/* appareilBtn.addEventListener('click', (e) =>{
    arrow2.classList.toggle('arrowUp');
    
    if(arrow2.classList.contains('arrowUp')){
        listBlockAppareil.style.display = 'grid';
        appareilBlock.style.height = "100%";
        
    }else{
        listBlockAppareil.style.display = 'none';
    }
}) */

//===========au click du filtre Ingredient===============

/* dropdownIngredBtn.addEventListener('click', (e) =>{
    
    arrow1.classList.toggle('arrowUp');
    
    if(arrow1.classList.contains('arrowUp')){
        dropdownIngredUl.style.display = 'grid';
        
        
    }else{
        dropdownIngredUl.style.display = 'none';
        
    }
    
}) */

//===========au click du filtre Ustensils===============

/* ustensilsBtn.addEventListener('click', (e) =>{
    
    arrow3.classList.toggle('arrowUp');
    
    if(arrow3.classList.contains('arrowUp')){
        listBlockUstensils.style.display = 'grid';
        ustensilsBlock.style.height = "100%";
        
    }else{
        listBlockUstensils.style.display = 'none';
        
    }
    
}) */

//===========recherche sur input ingredient===============

btnSearch.addEventListener('input', (e) =>{

    if(e.target.value.length >= 3){
        filtersBox = {'type' : e.target.classList[1], 'value' : e.target.value};
        filtersArray.push(filtersBox);
        let newTest = filterRecipe(filtersArray);
        arrow1.classList.toggle('arrowUp');
        dropdownIngredUl.style.display = 'grid';
        span.forEach((e) =>{
            e.remove();
        })
        domSpan(ingredientlistRequete, dropdownIngredUl, 'ingredients');
        addSpan();
        
    }else{
        dropdownIngredUl.style.display = 'none';
        
    }
    //DisplayTag(e.target.value)
    console.log(e.target.value)
})

//===========pour chaque span on lance displayTag===============

function addSpan(){
    span.forEach((e) =>{ 
        DisplayTag(e);
    })
}

//===========creation du dom tag===============

function tagDom(data){
    const tag = document.createElement('button');
    tag.value = data.target.id;
    tag.classList.add('filterTag__btn');
    tag.innerHTML = `<p>${data.target.id}</p> <a class="filterTag--close"><img  src="./assets/icons/xmarkRound.svg" alt="cancel filter"/></a>`;
    filterTagBlock.appendChild(tag);
}

//===========Création des tag et filtrage el===============

function DisplayTag(data){

    data.addEventListener('click', (i) =>{
        span.forEach((e) =>{
            e.remove();
        })
        arrayInput.push(data);

        filtersBox = {'type' : i.target.classList[1], 'value' : i.target.value};
        filtersArray.push(filtersBox);
        let newTest = filterRecipe(filtersArray);
console.log(i.target)
        tagDom(i);
                
        const tagClose = document.querySelectorAll('.filterTag--close');
        tagClose.forEach((event) =>{
            event.addEventListener('click', () =>{
                event.parentNode.remove();
                let idInput = arrayInput.find((input) => input.id == event.parentNode.value);
                idInput.style.display = "block";
                idInput.checked = false; 
                console.log(idInput)
                span.forEach((e) =>{
                    e.remove();
                })
                filtersArray = filtersArray.filter((item) => item.value != event.parentNode.value );
                console.log(filtersArray)
                filterRecipe(filtersArray); 
            })
        }) 
    }) 
}


//===========afficher listes span===============

function domSpan(data, ul, addClass){
let limited = [];
    limited = data.slice(0, 30);

    limited.forEach((e) =>{
        const span = document.createElement('span');
        span.id = e;
        span.value = e;
        span.innerHTML = e;
        span.classList.add('list__items');
        span.classList.add(addClass);

        if(data === arrayAppliances || data === arrayIngredients || data === arrayUstensils){
            spanTarget.forEach(e => {
                if(span.id === e.id){
                    span.style.display = 'none'
                    //console.log(span.id, e.id, span)
                }
            }) 
        } 

        ul.appendChild(span);
    })
     
    span = document.querySelectorAll('.list__items');
}

