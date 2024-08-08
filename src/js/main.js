document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM fully loaded and parsed');
    
    fetch('/components/Sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const sidebarContainer = document.getElementById('sidebar-container');
            if (sidebarContainer) {
                sidebarContainer.innerHTML = data;
                console.log('Sidebar loaded successfully');
                
                const btn = document.getElementById('sidebar-btn');
                const sidebar = document.getElementById('sidebar');
                
                if (btn && sidebar) {
                    btn.addEventListener('click', () => {
                        sidebar.classList.toggle('-translate-x-full');
                    });
                } else {
                    console.error('Sidebar button or sidebar element not found');
                }
            } else {
                console.error('Sidebar container element not found');
            }
        })
        .catch(error => console.error('Error loading Sidebar:', error));

    fetch('/components/Header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = data;
                console.log('Header loaded successfully');

                const menuBtn = document.getElementById('menu-btn');
                const sidebar = document.getElementById('sidebar');

                if (menuBtn && sidebar) {
                    menuBtn.addEventListener('click', () => {
                        sidebar.classList.toggle('-translate-x-full');
                    });
                } else {
                    console.error('Menu button or sidebar element not found');
                }
            } else {
                console.error('Header container element not found');
            }
        })
        .catch(error => console.error('Error loading Header:', error));
});
