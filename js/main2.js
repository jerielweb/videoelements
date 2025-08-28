// Asegúrate de que los IDs aquí coincidan con los de tu HTML
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('password');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const singButton = document.getElementById('singButton');

function checkInputs() {
    if (usernameInput.value !== '' && passwordInput.value !== '' && nameInput.value !== '' && lastNameInput.value !== '' && emailInput.value !== '') {
       
        singButton.disabled = false;
    } else {
        singButton.disabled = true;
    }
}

usernameInput.addEventListener('input', checkInputs);
passwordInput.addEventListener('input', checkInputs);
nameInput.addEventListener('input', checkInputs);
lastNameInput.addEventListener('input', checkInputs);
emailInput.addEventListener('input', checkInputs);


const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', () => {
    window.location.href = 'log_in.html';
});