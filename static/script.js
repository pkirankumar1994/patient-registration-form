const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const genderSelect = document.getElementById('gender');
const castInput = document.getElementById('cast');
const dobInput = document.getElementById('dob');
const maritalStatusSelect = document.getElementById('marital-status');
const addressTextarea = document.getElementById('address');
const insuranceInput = document.getElementById('insurance');
const pastMedicalHistoryTextarea = document.getElementById('past-medical-history');

form.addEventListener('submit', (event) => {
    let isValid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else {
        showSuccess(nameInput);
    }

    if (phoneInput.value.trim() === '') {
        showError(phoneInput, 'Phone number is required');
        isValid = false;
    } else if (!/^([0-9]{10})$/.test(phoneInput.value.trim())) {
        showError(phoneInput, 'Phone number must be 10 digits');
        isValid = false;
    } else {
        showSuccess(phoneInput);
    }

    if (genderSelect.value === '') {
        showError(genderSelect, 'Gender is required');
        isValid = false;
    } else {
        showSuccess(genderSelect);
    }

    if (castInput.value.trim() === '') {
        showError(castInput, 'Cast is required');
        isValid = false;
    } else {
        showSuccess(castInput);
    }

    if (dobInput.value === '') {
        showError(dobInput, 'Date of Birth is required');
        isValid = false;
    } else {
        showSuccess(dobInput);
    }

    if (maritalStatusSelect.value === '') {
        showError(maritalStatusSelect, 'Marital Status is required');
        isValid = false;
    } else {
        showSuccess(maritalStatusSelect);
    }

    if (addressTextarea.value.trim() === '') {
        showError(addressTextarea, 'Address is required');
        isValid = false;
    } else {
        showSuccess(addressTextarea);
    }

    if (insuranceInput.value.trim() === '') {
        showError(insuranceInput, 'Insurance name is required');
        isValid = false;
    } else {
        showSuccess(insuranceInput);
    }

    if (pastMedicalHistoryTextarea.value.trim() === '') {
        showError(pastMedicalHistoryTextarea, 'Past Medical History is required');
        isValid = false;
    } else {
        showSuccess(pastMedicalHistoryTextarea);
    }

    if (!isValid) {
        event.preventDefault();
    }
});

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.remove('success');
    formControl.classList.add('error');
    const errorElement = formControl.querySelector('small');
    errorElement.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
}

function clearValidation() {
    const formControlList = document.querySelectorAll('.form-control');
    formControlList.forEach((formControl) => {
        formControl.classList.remove('success', 'error');
        const errorElement = formControl.querySelector('small');
        errorElement.innerText = '';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    clearValidation();
});

const submitButton = document.querySelector('input[type="submit"]');

// Add an event listener to the form
form.addEventListener('submit', (event) => {
    // Prevent the form from submitting
    event.preventDefault();

    // Create a new FormData object from the form data
    const formData = new FormData(form);

    // Send a POST request to the server with the form data
    fetch('http://localhost:8000/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                location.replace('/data');
            } else {
                alert('Error occurred while registering patient!');
            }
        })
        .catch(error => console.error(error));
});
