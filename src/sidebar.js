
const toggleSidebarButton = document.querySelector('#sidebar-toggle-large-screen');
const filler = document.querySelector('#sidebar-body-large-screen');

toggleSidebarButton.addEventListener('click', () => filler.classList.toggle('hidden'));

export {};