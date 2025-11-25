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
//get buttons and product details
function setupButtons(){
document.querySelectorAll('button').forEach(button =>{
    button.addEventListener("click", () =>{
            let productButtons = document.querySelectorAll('#productButtons button');
            let productDetails = document.querySelectorAll('.product');
            let buttonNum = button.dataset.target;
            let activeButton = document.querySelector(`.product[id=${buttonNum}]`);

            productButtons.forEach(button => {
                button.classList.remove('active');
            })
            productDetails.forEach(section => {
                section.classList.remove('active');
                section.classList.add('hidden');
            })

            activeButton.classList.add('active');
        })
    })
}

setupButtons();


/* guessing game */
let btn = document.getElementById('guessGame');

btn.addEventListener("click", (e) =>{
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    console.log(randomNumber);
    let userNum = document.getElementById('numGuess');
    let gameOutput = document.getElementById('gameOutput');
    e.preventDefault();
    let userGuess = userNum.value;

    if(userGuess == randomNumber){
        gameOutput.textContent = 'Congratulations! You Win!'
    }
    else if(userGuess == ""){
        gameOutput.textContent = "Please enter a number between 1 and 10."
    }
    else{
        gameOutput.textContent = 'No Dice. Try Again.'
    }

})


/* form validation */

let submitBtn = document.getElementById('mySubmit');


submitBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    let contactMe = document.getElementById('contactMe');
    let errorSpans = document.querySelectorAll(".message");

    let isValid = true;

    contactMe.myName.classList.remove("errorInput");
    contactMe.myInbox.classList.remove("errorInput");
    contactMe.myPhone.classList.remove("errorInput");
    contactMe.myComments.classList.remove("errorInput");

    errorSpans.forEach(function(span){
    span.classList.remove("error");
    })

    document.querySelector("#success").classList.remove("show");
    document.querySelector("#success").classList.add("hide");

    let nameRegex = /^[a-zA-Z]{1,30}$/;
    let telRegex = /^\+?[1-9][0-9]{7,14}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

     if(contactMe.myName.value === "" || !(nameRegex.test(contactMe.myName.value))){
        contactMe.myName.classList.add("errorInput");
        errorSpans[0].classList.add("error");
        isValid = false;
     }

     if(contactMe.myComments.value === ""){
        contactMe.myComments.classList.add("errorInput");
        errorSpans[4].classList.add("error");
        isValid = false;
     }

     let prefContactIsValid = false;

    let email = document.getElementById("prefEmail");
    let phone = document.getElementById("prefPhone");
    let emailSpan = document.getElementById("prefEmailSpan");
    let phoneSpan = document.getElementById("prefPhoneSpan");

    let prefRadios = document.querySelectorAll("input[type=\"radio\"]");

    for (let radio of prefRadios){
        radio.addEventListener("change", () => {


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

     if (isValid){
        document.querySelector("#success").classList.remove("hide");
        document.querySelector("#success").classList.add("show");

        document.getElementById("formSub").innerHTML = `<strong>Name: </strong>${contactMe.myName.value}<br><strong>Email: </strong>${contactMe.myInbox.value}<br><strong>Phone: </strong>${contactMe.myPhone.value}<br><strong>Comments: </strong>${contactMe.myComments.value}`;

        contactMe.reset();
     }
})

