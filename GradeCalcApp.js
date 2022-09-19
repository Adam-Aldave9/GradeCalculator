/*DOM Objects*/ 
let table = document.querySelector(".input-section");
let addRow = document.querySelector(".add-row-btn");
let calculateButton = document.querySelector(".calculate-btn");
let gradeInput = document.querySelectorAll(".grade");
let weightInput = document.querySelectorAll(".weight");
let namesInput = document.querySelectorAll(".name");
let resetButton = document.querySelector(".reset-btn");
let calculateTab = document.querySelector(".calculator-tab-btn");
let infoTab = document.querySelector(".info-tab-btn");

/**Objects and variables */
let currentIdNumber = 10;
let finalGrade = 0;
let grades = [];
let weights = [];
let sumWeights = 0;
let names = [];
let skipIndexes = [];
let saveGrades = [];
let saveWeights = [];
let saveNames = [];

/*Operations*/ 
for(let i = 0; i < 2; i++){
    newRow();
}

/*Event Listeners*/ 
addRow.addEventListener("click", function(){
    newRow();
});

calculateButton.addEventListener("click", function(){
    getWeights();
    getGrades();
    calculateGrade();
});

resetButton.addEventListener("click", function(){
    reset();
});

calculateTab.addEventListener("click", function(){
    let calculatorSection = document.querySelector(".calculator");
    let infoSection = document.querySelector(".info");
    calculatorSection.classList.add("active");
    infoSection.classList.remove("active");
    let nav = document.querySelector("section.nav-btns");
    if(calculatorSection.classList.contains("active")){
        nav.style.borderBottomStyle = "none";
    }
});

infoTab.addEventListener("click", function(){
    let calculatorSection = document.querySelector(".calculator");
    let infoSection = document.querySelector(".info");
    let nav = document.querySelector("section.nav-btns");
    calculatorSection.classList.remove("active");
    infoSection.classList.add("active");
    if(infoSection.classList.contains("active")){
        nav.style.borderBottomStyle = "solid";
        nav.style.borderBottomColor = "black";
    }
});



/*Functions*/ 
function updateSelectors(){
    table = document.querySelector(".input-section");
    addRow = document.querySelector(".add-row-btn");
    calculateButton = document.querySelector(".calculate-btn");
    gradeInput = document.querySelectorAll(".grade");
    weightInput = document.querySelectorAll(".weight");
    namesInput = document.querySelectorAll(".name");
}

function newRow(){
    saveInfo();
    const add = `<div class="inputs">
    <input class="name" type="text" id="${currentIdNumber}">
    <input class="grade" type="number" id="${currentIdNumber+1}">
    <input class="weight" type="number" id="${currentIdNumber+2}">
</div>`;
    currentIdNumber+=3;
    table.innerHTML+=add;
    restoreInfo();
    saveGrades = [];
    saveWeights = [];
    saveNames = [];
    updateSelectors();
}

function saveInfo(){
    for(let i = 0; i < gradeInput.length; i++){
        let id = gradeInput[i].id;
        let value = document.getElementById(id).value;
        saveGrades.push(value);
    }
    for(let i = 0; i < weightInput.length; i++){
        let id = weightInput[i].id;
        let value = document.getElementById(id).value;
        saveWeights.push(value);
    }
    for(let i = 0; i < namesInput.length; i++){  
        let id = namesInput[i].id;
        let value = document.getElementById(id).value;
        saveNames.push(value);
    }
}

function restoreInfo(){
    for(let i = 0; i < saveGrades.length; i++){
        let gradeValue = saveGrades[i];
        let gradeId = gradeInput[i].id;
        document.getElementById(gradeId).value = gradeValue;
        let weightValue = saveWeights[i];
        let weightId = weightInput[i].id;
        document.getElementById(weightId).value = weightValue;
        let nameValue = saveNames[i];
        let nameId = namesInput[i].id;
        document.getElementById(nameId).value = nameValue;
    }
}



function getGrades(){
    for(let i = 0; i < gradeInput.length; i++){
        let id = gradeInput[i].id;
        let value = document.getElementById(id).value;
        if(value === ""){
            skipIndexes.push(i);
            continue;
        }
        else if(skipIndexes.includes(i)){
            continue;
        }
        else{
            let currentGradeInput = parseFloat(value);
            grades.push(currentGradeInput);
        }
    }
}

function getWeights(){
    skip:
    for(let i = 0; i < weightInput.length; i++){
        let id = weightInput[i].id;
        let value = document.getElementById(id).value;
        if(value === "" || document.getElementById(`${parseInt(id)-1}`).value === ""){
            skipIndexes.push(i);
            continue skip;
        }
        else if(skipIndexes.includes(i)){
            continue;
        }
        else{
            let currentWeightInput = parseFloat(value);
            sumWeights+=currentWeightInput;
            weights.push(currentWeightInput);
        }
    }
}

function calculateGrade(){
    let out = document.querySelector(".output");
    skip:
    for(let i = 0; i < grades.length; i++){
        for(let j = 0; j < grades.length; j++){
            if(i === skipIndexes[j]){
                continue skip;
            }
        }
        finalGrade += grades[i]*weights[i];
    }
    let outputValue = Math.round(((finalGrade/sumWeights)+Number.EPSILON)* 100)/100;
    if(Number.isNaN(outputValue)){
        return null;
    }
    else{
        out.innerHTML = outputValue;
        grades = [];
        weights = [];
        skipIndexes = [];
        finalGrade = 0;
        sumWeights = 0;
    }
}

function reset(){
    for(let i = 0; i < gradeInput.length; i++){
        let gradeId = gradeInput[i].id;
        document.getElementById(gradeId).value = "";
        let weightId = weightInput[i].id;
        document.getElementById(weightId).value = "";
        let nameId = namesInput[i].id;
        document.getElementById(nameId).value = "";
    }
    let out = document.querySelector(".output");
    out.innerHTML = "";
}


