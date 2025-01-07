const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const darkMode = document.querySelector('.dark-mode');
const sunIcon = darkMode.querySelector('i.bx-sun');
const moonIcon = darkMode.querySelector('i.bxs-moon');

// Toggle side menu
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

// Toggle dark mode
darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    if (document.body.classList.contains('dark-mode-variables')) {
        sunIcon.classList.remove('active');
        moonIcon.classList.add('active');
    } else {
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
    }
});

// Ensure only one icon has the active background color
sunIcon.addEventListener('click', () => {
    if (!document.body.classList.contains('dark-mode-variables')) {
        document.body.classList.add('dark-mode-variables');
        sunIcon.classList.remove('active');
        moonIcon.classList.add('active');
    }
});

moonIcon.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode-variables')) {
        document.body.classList.remove('dark-mode-variables');
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
    }
});

// Populate orders table
Orders.forEach(order => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.status === 'Declined' ? 'danger' : order.status === 'Pending' ? 'warning' : 'primary'}">${order.status}</td>
        <td class="primary">Details</td>
    `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});