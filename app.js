const userWeight = document.querySelector("#weight-input");
const userHeightCM = document.querySelector("#height-input");
const calculateButton = document.querySelector("#calculate-button");
const resetButton = document.querySelector("#reset");
const heightType = document.querySelector("#height-type");
const weightType = document.querySelector('#weight-type');
const feetInchesDiv = document.querySelector("#feet-inches");
const getResult = document.querySelector(".result");
let varResult = document.querySelector("#var_result");

//basic formula that calculates BMI
function calculateBMI(height, weight){
    return result = weight/(height*height);
}


//Reset button remove everthing
function resetClicked() {
    userWeight.value = "";
    userHeightCM.value = "";
    document.querySelector("#feet-input").value = "";
    document.querySelector("#inches-input").value = "";
    heightType.selectedIndex = 0;
    weightType.selectedIndex = 0;
    feetInchesDiv.classList.add("hidden");
    getResult.classList.add("hidden");
    checkHeightTypeSelected();
    console.log("Reset button was clicked");
}

//if user selects feet and inches
function checkHeightTypeSelected(){
    if(heightType.value === "feet"){
        feetInchesDiv.classList.remove("hidden");
        userHeightCM.classList.add("hidden");
    } else {
        feetInchesDiv.classList.add("hidden");
        userHeightCM.classList.remove("hidden")
    }
}

// function to get user's weight
function getWeight() {
    if (weightType.selectedIndex == 0) {  
        alert("Please select a weight type.");
        resetClicked();
        return NaN;
    }
    const weight = parseFloat(userWeight.value);
    if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight.");
        return NaN;
    }
    return weightType.selectedIndex == 1 ? weight * 0.453592 : weight; 
}

//function to get user's height 
function getHeight(){
    // if the user does not select anything
    if(heightType.selectedIndex == 0){  
        alert("please select an option");
        resetClicked();
        return;
    } else if (heightType.selectedIndex == 1) {
        return parseFloat(userHeightCM.value) / 100; 
    } else {
        const feet = parseFloat(document.querySelector("#feet-input").value) || 0; 
        const inches = parseFloat(document.querySelector("#inches-input").value) || 0;
        return (feet * 12 * 0.0254) + (inches * 0.0254); //  meters
    }
}

function checkBMI(res){
    getResult.classList.remove('hidden');

    if (res < 18.5){
        varResult.innerText = res;
        varResult.style.color = "red";
    } else if (res >= 18.5 && res <=24.9){
        varResult.innerText = res;
        varResult.style.color = "green"
    } else if(res >= 25){
        varResult.innerText = res;
        varResult.style.color = "red";
    }
}



//EventListener to change height settings 
heightType.addEventListener('change', checkHeightTypeSelected);


calculateButton.addEventListener("click", () =>{
    let w = getWeight();
    let h = getHeight();
    let res = calculateBMI(h, w);
    checkBMI(res);
});

resetButton.addEventListener("click", resetClicked);
