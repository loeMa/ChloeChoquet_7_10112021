import {recipes} from './../data/recipes.js';



const sectionRecipes = document.querySelector('.recipes');
const input = document.getElementById('inputSearch');
const errorH2 = document.querySelector('.error');
let recettes = recipes;

//==============list des appliances/ingredients/ustensils=====================

let listAppliances = [];
let listUstensils = [];
let listIngredients = [];
let arrayAppliances =  [];
let arrayUstensils = [];
let arrayIngredients = [];
let ingredientlistRequete = [];
let appareilslistRequete = [];
let ustensilslistRequete = [];
let spanTarget = [];
let spans;

//==============tableau liste tag=====================

const arraySingleData = (data) =>{
    listAppliances = [];
    listUstensils = [];
    listIngredients = [];
    data.forEach((recette) => {
        listAppliances.push(recette.appliance);
        recette.ustensils.forEach((e) => listUstensils.push(e));
        recette.ingredients.forEach((e) => listIngredients.push(e.ingredient));
    })
    arrayAppliances =  [...new Set(listAppliances)];
    arrayUstensils = [...new Set(listUstensils)];
    arrayIngredients = [...new Set(listIngredients)];
}
arraySingleData(recipes)

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
        sectionRecipes.innerHTML = '';
        spans.forEach((span) =>{
            span.remove();
        })
        let newData = findByPrincipal(recipes, e.target.value);
        recettes = newData;
        displayRecipe(newData);
        arraySingleData(newData);

        domSpan(arrayAppliances, listBlockAppareil, 'appareils');
        domSpan(arrayIngredients, dropdownIngredUl, 'ingredients');
        domSpan(arrayUstensils, listBlockUstensils, 'ustensils');
        addSpan();  
        
    }else if(filtersBox != [] && e.target.value.length === 0){
        recettes = recipes;
        filterRecipe(filtersArray);

    }else if(filtersBox === [] && e.target.value.length === 0){
        spans.forEach((span) =>{
            span.remove();
        });

        arraySingleData(recipes);
        domSpan(arrayAppliances, listBlockAppareil, 'appareils');
        domSpan(arrayIngredients, dropdownIngredUl, 'ingredients');
        domSpan(arrayUstensils, listBlockUstensils, 'ustensils');
        addSpan();
        displayRecipe(recipes);
    }
})

//=============fonction tri avec l'input principal (filter)==============

function findByPrincipal(data, requete){
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


//==============Filtre par bouton tag=====================

const filterRecipe = (filters) =>{
    let filtArr = recettes;
    listIngredients = [];
    listAppliances = [];
    spanTarget = [];
    listUstensils = [];
    


    filters.forEach((filter) =>{
        filtArr = filtArr.filter((recette) =>{
            let ingredientFilter = recette.ingredients;
            let filterValue = filter.value;
            
            if(filter.type == "requete"){

                ustensilslistRequete = arrayUstensils.filter(ustensils => {
                    return ustensils.toLowerCase().includes(filter.value.toLowerCase());
                });

                appareilslistRequete = arrayAppliances.filter(appliance => {
                    return appliance.toLowerCase().includes(filter.value.toLowerCase());
                });
                
                ingredientlistRequete = arrayIngredients.filter(ingredient => {
                    return ingredient.toLowerCase().includes(filter.value.toLowerCase());
                });
                
                
                return ingredientlistRequete, appareilslistRequete, ustensilslistRequete;

            }if(filter.type == "ingredients" ){
                spans.forEach((span) =>{
                    let spanResult = span.id.includes(filterValue); 
                    if(spanResult){
                        spanTarget.push(span);
                    } 
                }) 
                for(let i of ingredientFilter){
                    let listIngred = i.ingredient;
                    
                    const resultIngred = listIngred.toLowerCase().indexOf(filter.value.toLowerCase())!== -1;
                    if(resultIngred){
                        filtArr = recette;
                        
                        return filtArr;
                    }
                } 
            }if(filter.type == "appareils" && recette.appliance.includes(filter.value) ){
                spans.forEach((span) =>{
                    let spanResult = span.id.includes(filter.value); 
                    if(spanResult){
                        spanTarget.push(span);
                    }
                })
                return true;

            }if(filter.type == "ustensils" && recette.ustensils.includes(filter.value) ){
                spans.forEach((span) =>{
                    let spanResult = span.id.includes(filter.value); 
                    if(spanResult){
                        spanTarget.push(span);
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
    arraySingleData(filtArr);
    
    domSpan(arrayAppliances, listBlockAppareil, 'appareils');
    domSpan(arrayIngredients, dropdownIngredUl, 'ingredients');
    domSpan(arrayUstensils, listBlockUstensils, 'ustensils');
    addSpan();

    return true;
}


//===========declaration variables===============

const dropdownIngredBtn = document.querySelector('#arrow1__btn');
const dropdownIngredUl = document.querySelector('#ingredientsBlock');
const ingredientBlock = document.querySelector('.ingredients__section')
const arrow1 = document.getElementById('arrow1');
const appareilBtn = document.querySelector('#arrow2__btn');
const arrow2 = document.getElementById('arrow2');
const listBlockAppareil = document.querySelector('#appliancesBlock');
const listBlockUstensils = document.querySelector('#ustensilsBlock');
const ustensilsBtn = document.querySelector('#arrow3__btn');
const arrow3 = document.getElementById('arrow3');
const filterTagBlock = document.querySelector('.filterTag');
const appareilBlock = document.querySelector('.appareils__section');
const ustensilsBlock = document.querySelector('.ustensils__section')

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
    input.addEventListener('click', () =>{
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


//===========recherche sur input ingredient===============

const inputSearch = document.querySelectorAll(".requete");


inputSearch.forEach((input) =>{
input.addEventListener('input', (e) =>{

    if(e.target.value.length >= 3){
        filtersBox = {'type' : e.target.classList[1], 'value' : e.target.value};
        filtersArray.push(filtersBox);
        filterRecipe(filtersArray);
        spans.forEach((span) =>{
            span.remove();
        })
        if(e.target.placeholder === 'Appareils'){
            arrow2.classList.toggle('arrowUp');
            listBlockAppareil.style.display = 'grid';
            appareilBlock.style.height = "100%";
            domSpan(appareilslistRequete, listBlockAppareil, 'appareils');
            
            
        }
        if(e.target.placeholder === 'Ustensiles'){
            arrow3.classList.toggle('arrowUp');
            listBlockUstensils.style.display = 'grid';
            ustensilsBlock.style.height = "100%";
            domSpan(ustensilslistRequete, listBlockUstensils, 'ustensils');
            
            
        }
        if(e.target.placeholder === 'Ingredients'){
            arrow1.classList.toggle('arrowUp');
            dropdownIngredUl.style.display = 'grid';
            ingredientBlock.style.height = "100%";
            domSpan(ingredientlistRequete, dropdownIngredUl, 'ingredients');
            
            
        }
        addSpan();
    }else{
        dropdownIngredUl.style.display = 'none';
        listBlockUstensils.style.display = 'none';
        listBlockAppareil.style.display = 'none';
    }
    console.log(e.target.value);
})
})

//===========pour chaque span on lance displayTag===============

function addSpan(){
    spans.forEach((span) =>{ 
        DisplayTag(span);
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
        spans.forEach((span) =>{
            span.remove();
        });
        arrayInput.push(data);
        //input.value = '';

        filtersBox = {'type' : i.target.classList[1], 'value' : i.target.value};
        filtersArray.push(filtersBox);
        filterRecipe(filtersArray);

        tagDom(i);
        inputSearch.forEach(input => input.value = "")
        const tagClose = document.querySelectorAll('.filterTag--close');
        tagClose.forEach((event) =>{
            event.addEventListener('click', () =>{
                event.parentNode.remove();
                let idInput = arrayInput.find((input) => input.id == event.parentNode.value);
                idInput.style.display = "block";
                idInput.checked = false; 
                spans.forEach((span) =>{
                    span.remove();
                })
                if(input.value == '' ){
                    recettes = recipes;
                }
                filtersArray = filtersArray.filter((item) => item.value != event.parentNode.value );
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
                }
            }) 
        } 

        ul.appendChild(span);
    })
     
    spans = document.querySelectorAll('.list__items');
}

