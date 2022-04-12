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
    let newData = findByLoop(recipes, e.target.value);
    displayRecipe(newData)
}else{
    sectionRecipes.innerHTML = '';
    displayRecipe(recipes);
}
})

//=============fonction tri avec l'input principal (for)==============

function findByLoop(data, requete){
    let arrayRecipes = []
    for(let i in data){
        let arr = data[i];
        let title = arr.name;
        let desc = arr.description;
        let ListIngred = arr.ingredients;
        
        const resultTitle = title.toLowerCase().includes(requete.toLowerCase());
        const resultDesc = desc.toLowerCase().includes(requete.toLowerCase());

        for(let j in ListIngred){
            let ingred = ListIngred[j].ingredient;
            
            const resultIngred = ingred.toLowerCase().includes(requete.toLowerCase());
            if(resultIngred){
                arrayRecipes.push(data[i]);
                console.log(data[i]);
            } 
        }

        if(resultTitle){
            arrayRecipes.push(data[i]);
            console.log(title,arrayRecipes);

        }else if(resultDesc){
            arrayRecipes.push(data[i]);
        }
    }
    console.log(arrayRecipes);
    return arrayRecipes;
}





