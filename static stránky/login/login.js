document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById("togglePassword");  
    const showPassword = document.getElementById("showPassword");     
    const passwordField = document.getElementById("password");         

    togglePassword.addEventListener("click", function() {
        if (passwordField.type === "password") {
            passwordField.type = "text";  
            togglePassword.style.display = "none";  
            showPassword.style.display = "block";  
        } else {
            passwordField.type = "password";  
            togglePassword.style.display = "block";  
            showPassword.style.display = "none";  
        }
    });

    
    showPassword.addEventListener("click", function() {
        if (passwordField.type === "password") {
            passwordField.type = "text";  
            togglePassword.style.display = "none";  
            showPassword.style.display = "block";  
        } else {
            passwordField.type = "password";  
            togglePassword.style.display = "block";  
            showPassword.style.display = "none";  
        }
    });
});


document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        const user = JSON.parse(atob(data.token.split('.')[1]));
        if (user.role === 'teacher') {
            window.location.href = '/teacher.html';
        } else {
            window.location.href = '/student.html';
        }
    } else {
        alert(data.message);
    }
});
