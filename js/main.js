const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');

function checkInputs() {
    if (usernameInput.value !== '' && passwordInput.value !== '') {
        loginButton.disabled = false;
    } else{
        loginButton.disabled = true;
    }
}
usernameInput.addEventListener('input', checkInputs);
passwordInput.addEventListener('input', checkInputs);

const signupButton = document.getElementById('signupButton');

signupButton.addEventListener('click', () => {
    window.location.href = 'sign_up.html';
});
