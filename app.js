const IMCData = [
    { 
        name: "Maigreur", 
        color: "midnightblue",
        range: [0, 18.5],
        conseil: "Situation de dénutrition dangereuse pour la santé. Seul votre médecin pourra reconnaître une dénutrition et proposer une prise en charge diététique pour arriver à assurer un apport suffisant pour couvrir les besoins de l'organisme."
    },
    { 
        name: "Bonne santé", 
        color: "green",
        range: [18.5, 25],
        conseil: "Corpulence normale. Une alimentation équilibrée, un mode de vie sain et de l'exercice contribuent à une bonne santé physique et psychique." 
    },
    { 
        name: "Surpoids",
        color: "lightcoral", 
        range: [25, 30], 
        conseil: "Le surpoids est un facteur de risque bien connu pour nombre de maladies cardiovasculaires (diabète, hypertension, insuffisance cardiaque, athérosclérose, etc.). C'est pourquoi il convient de le réduire le plus possible avec un régime alimentaire adapté. Votre médecin et/ou diététicien nutritionniste vous aidera à perdre du poids dans un premier temps avant de maintenir votre poids idéal au moyen d'une alimentation équilibrée et d'une activité physique régulière."
    },
    { 
        name: "Obésité modérée", 
        color: "orange", 
        range: [30, 35],
        conseil: "Plus encore que le surpoids, l'obésité est un facteur de risque important pour de nombreuses maladies cardiovasculaires et réduit considérablement la qualité de vie (troubles du sommeil, troubles moteurs, etc.) et la longévité. Il est nécessaire de consulter rapidement un médecin qui, après avoir effectué les analyses nécessaires, fera un bilan de votre situation pour déterminer la meilleure approche pour perdre du poids durablement."
    },
    { 
        name: "Obésité sévère", 
        color: "crimson",
        range: [35, 40],
        conseil: "Plus encore que le surpoids, l'obésité est un facteur de risque important pour de nombreuses maladies cardiovasculaires et réduit considérablement la qualité de vie (troubles du sommeil, troubles moteurs, etc.) et la longévité. Il est nécessaire de consulter rapidement un médecin qui, après avoir effectué les analyses nécessaires, fera un bilan de votre situation pour déterminer la meilleure approche pour perdre du poids durablement."
    },
    { 
        name: "Obésité morbide", 
        color: "purple", 
        range: 40,
        conseil: "Plus encore que le surpoids, l'obésité est un facteur de risque important pour de nombreuses maladies cardiovasculaires et réduit considérablement la qualité de vie (troubles du sommeil, troubles moteurs, etc.) et la longévité. Il est nécessaire de consulter rapidement un médecin qui, après avoir effectué les analyses nécessaires, fera un bilan de votre situation pour déterminer la meilleure approche pour perdre du poids durablement. Dans un premier temps, la prise en charge comprend un traitement médical, nutritionnel, diététique et psychothérapeutique."
    },
];

// 1. Ciblage des élément du DOM
const form = document.querySelector("form");  
const taille = document.querySelector("#taille");
const poids = document.querySelector("#poids");
const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");
const conseil = document.querySelector(".conseil-info");


// On écoute l'événement "submit" sur le formulaire et on va éxecuter 
// la fucntion callback 
form.addEventListener("submit", handleForm);

// Function qui va s'éxecuter au soumission du formulaire
function handleForm(event) {
    event.preventDefault();

    calculateIMC();
}

function calculateIMC() {
    const valTaille = taille.value;
    const valPoids = poids.value;

    // si pas valeur "taille" OU "poids" manque OU
    // les valeurs sont inferieur a "0"
    if( !valTaille || !valPoids || valTaille <= 0 || valPoids <= 0 ) {
        
        handleError(); 
        // On sort de la function, on n'execut pas le code qui suive
        return ; 
    } 
    
    // Si imput remplis correctement, on fait le calcule
    // IMC = poids (en kg) / taille² (en m)
    const IMC = (valPoids / Math.pow(valTaille / 100, 2)).toFixed(1); 

    showResult(IMC);
}

// function qui va afficher message personnalisé en cas "input vide"
function handleError() {
    displayBMI.textContent = "Wops";
    displayBMI.style.color = "inherit";
    result.textContent = "Remplissez correctement les inputs.";
}

// Affichage des resultats en fonction du tableau "IMCData[]" 
function showResult(IMC) {

    const rank = IMCData.find(element => {
        // On chrche parmis les valeur du parametre "range :"
        if (IMC >= element.range[0] && IMC < element.range[1]) return element;
        // On va traiter aussi le dernier cas qui n'est pas un tableau mais un Nb
        else if( typeof element.range === "number" && IMC >= element.range) return element;
    });

    // affichage
    displayBMI.textContent = IMC;
    displayBMI.style.color = `${rank.color}`;
    result.textContent = `Resultat : ${rank.name}`;
    conseil.textContent = `Conseil : ${rank.conseil}`;
}


