document.addEventListener("DOMContentLoaded", function() {
    // Load Sidebar
    fetch('../components/Sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;

            // Add toggle functionality after sidebar is loaded
            const btn = document.getElementById('menu-btn');
            const sidebar = document.getElementById('sidebar');

            btn.addEventListener('click', () => {
                sidebar.classList.toggle('-translate-x-full');
            });
        });

    // Load Header
    fetch('../components/Header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // Add toggle functionality after header is loaded
            const btn = document.getElementById('menu-btn');
            const sidebar = document.getElementById('sidebar');

            btn.addEventListener('click', () => {
                sidebar.classList.toggle('-translate-x-full');
            });
        });
});
