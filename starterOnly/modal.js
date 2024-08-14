function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

const modalbg = document.querySelector(".bground");
const modalStatus = document.querySelector(".bground-status");
const modalBtn = document.querySelectorAll(".modal-btn");
const btnSubmit = document.querySelector(".btn-submit");
const formData = document.querySelectorAll(".formData");
const modalResult = document.querySelector(".result");
const content = document.querySelector(".content");
const result = document.querySelector(".result");
const btnCloseResult = document.querySelector("#btn-close-result");
const successModal = document.querySelector("#success-modal");

const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
    modalbg.style.display = "none";
});

btnSubmit.addEventListener("click", (e) => {
    validate(e);
});

btnCloseResult.addEventListener("click", () => {
    closeResult();
});

const closeResult = () => {
    modalbg.style.display = "none";
    document.body.classList.remove("no-scroll");
};

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
    modalbg.style.display = "block";
    content.style.display = "block";
    result.style.display = "none";
    document.body.classList.add("no-scroll");
}

function validate(event) {
    event.preventDefault();

    const firstnameInput = document.querySelector("#first");
    const lastnameInput = document.querySelector("#last");
    const emailInput = document.querySelector("#email");
    const birthDateInput = document.querySelector("#birthdate");
    const numberOfParticipationInput = document.querySelector("#quantity");
    const locationInputs = document.querySelectorAll(".locations");
    const termsOfUseInput = document.querySelector("#checkbox1");
    const getNotifyInput = document.querySelector("#checkbox2");

    let errors = [];

    formData.forEach((field) =>
        field.setAttribute("data-error-visible", "false")
    );

    if (!isValidName(firstnameInput.value)) {
        errors.push({
            field: firstnameInput,
            message: "Le prénom doit contenir au moins 2 caractères.",
        });
    }

    if (!isValidName(lastnameInput.value)) {
        errors.push({
            field: lastnameInput,
            message: "Le nom doit contenir au moins 2 caractères.",
        });
    }

    if (!isValidEmail(emailInput.value)) {
        errors.push({
            field: emailInput,
            message: "L'adresse email n'est pas valide.",
        });
    }

    if (!isValidBirthDate(birthDateInput.value)) {
        errors.push({
            field: birthDateInput,
            message:
                "La date de naissance doit être valide et antérieure à la date actuelle.",
        });
    }

    if (!isValidParticipationNumber(numberOfParticipationInput.value)) {
        errors.push({
            field: numberOfParticipationInput,
            message: "Le nombre de participations doit être un nombre valide.",
        });
    }

    const selectedLocation = getSelectedLocation(locationInputs);
    if (!selectedLocation) {
        errors.push({
            field: locationInputs[0],
            message: "Veuillez sélectionner un lieu.",
        });
    }

    if (!termsOfUseInput.checked) {
        errors.push({
            field: termsOfUseInput,
            message: "Vous devez accepter les conditions d'utilisation.",
        });
    }

    if (errors.length > 0) {
        errors.forEach((error) => {
            const formField = error.field.closest(".formData");
            formField.setAttribute("data-error-visible", "true");
            formField.setAttribute("data-error", error.message);
        });
    } else {
        content.style.display = "none";
        result.style.display = "flex";
        btnCloseResult.addEventListener("click", () => {
            modalbg.style.display = "none";
        });
        successModal.innerHTML = `Bienvenue ${firstnameInput.value}, \n \n Merci pour votre inscription !`;
    }
}

//retirer le js dans le html
function isValidName(name) {
    return name.trim().length >= 2;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function isValidBirthDate(birthDate) {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    return !isNaN(birthDateObj.getTime()) && birthDateObj < today;
}

function isValidParticipationNumber(number) {
    return number && !isNaN(number) && Number(number) >= 0;
}

function getSelectedLocation(locationInputs) {
    for (const location of locationInputs) {
        if (location.checked) {
            return location.value;
        }
    }
    return null;
}
