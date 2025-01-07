let menuIcon = document.querySelector('#menu-icon');
let sections = document.querySelectorAll('section');
let navbar = document.querySelector('.navbar');
let navLinks = document.querySelectorAll('header nav a');
const modal = document.getElementById('login-modal');
const loginBtn = document.getElementById('login-btn');
const closeBtn = document.getElementsByClassName('close')[0];
const loginForm = document.getElementById('login-form');
let timer;

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ' ]').classList.add('active');
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};
menuIcon.style.cursor = 'pointer';

// Open the modal
loginBtn.onclick = function() {
    modal.style.display = 'block';
};

// Close the modal
closeBtn.onclick = function() {
    modal.style.display = 'none';
};

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        // Set a timer to check if the user stays outside for less than 0.3 seconds
        timer = setTimeout(() => {
            modal.style.display = 'none';
        }, 70); // 0.3 seconds
    }
};

// Cancel the timer if the user returns quickly
window.onmousemove = function(event) {
    if (event.target == modal) {
        clearTimeout(timer);
    }
};

// Handle login form submission
loginForm.onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform login (this is a simple example, you should use a secure method)
    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
        window.location.href = '/dashboard'; // Redirect to the application
    } else {
        alert('Invalid username or password');
    }
};
