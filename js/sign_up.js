document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('sign_up.html')) {
        const signupForm = document.querySelector('form');
        if (signupForm) {
            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const username = document.getElementById('usernameInput').value;
                const password = document.getElementById('password').value;
                try {
                    const res = await fetch('/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const data = await res.json();
                    if (data.success) {
                        alert('¡Registro exitoso!');
                        // Redirige o muestra contenido
                    } else {
                        alert('El usuario ya existe');
                    }
                } catch (err) {
                    alert('Error de conexión');
                }
            });
        }
    }
});
