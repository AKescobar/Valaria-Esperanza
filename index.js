"use strict";

/* dark and light mode switch */
// dark mode theme and switch variables
// local storage is used so that it saves the users choice
let darkmode = localStorage.getItem('darkmode');
const modeSwitch = document.getElementById('mode-switch');

// function to enable dark mode
function enableDarkMode(){
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

// function to disable dark mode
function disableDarkMode(){
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}

// calling function
if (darkmode === "active"){
    enableDarkMode();
}

// event listener
modeSwitch.addEventListener("click", () =>{
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
})

/* product display */
// function to set up buttons
function setupButtons(){
// getting buttons
document.querySelectorAll('button').forEach(button =>{
    // event listener
    button.addEventListener("click", () =>{
            // variables
            let productButtons = document.querySelectorAll('#productButtons button');
            let productDetails = document.querySelectorAll('.product');
            let buttonNum = button.dataset.target;
            let activeButton = document.querySelector(`.product[id=${buttonNum}]`);

            // removing active from all buttons
            productButtons.forEach(button => {
                button.classList.remove('active');
            })

            // removing active from and adding hidden to each product
            productDetails.forEach(section => {
                section.classList.remove('active');
                section.classList.add('hidden');
            })

            // adding active to active button and product
            activeButton.classList.add('active');
        })
    })
}
// calling function
setupButtons();


/* guessing game */
// get submit button
let btn = document.getElementById('guessGame');

// event listener
btn.addEventListener("click", (e) =>{
    //variables
    // generate a random number
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    console.log(randomNumber);
    // user guess
    let userNum = document.getElementById('numGuess');
    // game output
    let gameOutput = document.getElementById('gameOutput');
    e.preventDefault();
    let userGuess = userNum.value;

    if(userGuess == randomNumber){
        gameOutput.textContent = 'Congratulations! You Win!' // winning message
    }
    else if(userGuess == ""){
        gameOutput.textContent = "Please enter a number between 1 and 10." // error message
    }
    else{
        gameOutput.textContent = 'No Dice. Try Again.' // losing message
    }

})


/* form validation */
// submit button
let submitBtn = document.getElementById('mySubmit');

// event listener
submitBtn.addEventListener("click", (e) =>{
    // prevent default
    e.preventDefault(); 

    //variables
    let contactMe = document.getElementById('contactMe');
    let errorSpans = document.querySelectorAll(".message");

    let isValid = true;

    //remove error from inputs
    contactMe.myName.classList.remove("errorInput");
    contactMe.myInbox.classList.remove("errorInput");
    contactMe.myPhone.classList.remove("errorInput");
    contactMe.myComments.classList.remove("errorInput");

    // hide error messages
    errorSpans.forEach(function(span){
    span.classList.remove("error");
    })

    // hide success message and submitted info 
    document.querySelector("#success").classList.remove("show");
    document.querySelector("#success").classList.add("hide");

    // regex
    let nameRegex = /^[a-zA-Z]{1,30}$/;
    let telRegex = /^\+?[1-9][0-9]{7,14}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //conditions for each input
     //name
     if(contactMe.myName.value === "" || !(nameRegex.test(contactMe.myName.value))){
        contactMe.myName.classList.add("errorInput");
        errorSpans[0].classList.add("error");
        isValid = false;
     }

     //comment
     if(contactMe.myComments.value === ""){
        contactMe.myComments.classList.add("errorInput");
        errorSpans[4].classList.add("error");
        isValid = false;
     }
     // preferred contact
     let prefContactIsValid = false;

    // variables
    let email = document.getElementById("prefEmail");
    let phone = document.getElementById("prefPhone");
    let emailSpan = document.getElementById("prefEmailSpan");
    let phoneSpan = document.getElementById("prefPhoneSpan");
    
    // getting radio buttons
    let prefRadios = document.querySelectorAll("input[type=\"radio\"]");

    for (let radio of prefRadios){
        // event listener
        radio.addEventListener("change", () => {

        // conditional for email
        if (email.checked){
            prefEmailSpan.classList.add("required");
            emailSpan.textContent = "*";
            prefPhoneSpan.classList.remove("required");
            phoneSpan.textContent = "";

            if (contactMe.myInbox.value === "" || !(emailRegex.test(contactMe.myInbox.value))){
                contactMe.myInbox.classList.add("errorInput");
                errorSpans[1].classList.add("error");
                isValid = false;
            }
        }

        // conditional for phone
        if(phone.checked){
            phoneSpan.classList.add("required");
            phoneSpan.textContent = "*";
            prefEmailSpan.classList.remove("required");
            emailSpan.textContent = "";

            if (contactMe.myPhone.value === "" || !(telRegex.test(contactMe.myPhone.value))){
                contactMe.myPhone.classList.add("errorInput");
                errorSpans[2].classList.add("error");
                isValid = false;
            }
        }

        })
    }
    // successful submit
     if (isValid){
        //showing success message and submitted info 
        document.querySelector("#success").classList.remove("hide");
        document.querySelector("#success").classList.add("show");
        
        //template for showing submitted info
        document.getElementById("formSub").innerHTML = `<strong>Name: </strong>${contactMe.myName.value}<br><strong>Email: </strong>${contactMe.myInbox.value}<br><strong>Phone: </strong>${contactMe.myPhone.value}<br><strong>Comments: </strong>${contactMe.myComments.value}`;

        //clearing form after submit
        contactMe.reset();
     }
})

