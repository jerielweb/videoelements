document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('log_in.html')) {
        const loginForm = document.querySelector('form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const username = document.getElementById('usernameInput').value;
                const password = document.getElementById('password').value;
                try {
                    const res = await fetch('/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const data = await res.json();
                    if (data.success) {
                        alert('¡Login exitoso!');
                        // Redirige o muestra contenido
                    } else {
                        alert('Usuario o contraseña incorrectos');
                    }
                } catch (err) {
                    alert('Error de conexión');
                }
            });
        }
    }
});
