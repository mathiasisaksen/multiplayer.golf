
const Sidebar = (() => {
    const chatPlayersEnum = {PLAYERS: 'players', CHAT: 'chat'}
    let currentChatOrPlayers = chatPlayersEnum.PLAYERS;

    const toggleSidebarButton = document.querySelector('#sidebar-toggle-large-screen');
    toggleSidebarButton.addEventListener('click', () => sidebarBody.classList.toggle('hidden'));
    const sidebarBody = document.querySelector('#sidebar-body-large-screen');

    // Setup course section
    const prevCourseButton = sidebarBody.querySelector('#previous-course-large-screen');
    const nextCourseButton = sidebarBody.querySelector('#next-course-large-screen');
    const courseSummaryButton = sidebarBody.querySelector('#course-summary-large-screen');
    const courseHeader = sidebarBody.querySelector('#current-course-large-screen');
    const courseElements = [prevCourseButton, nextCourseButton, 
        courseSummaryButton, courseHeader];
    
    courseSummaryButton.addEventListener('click', handleCourseSummaryClick);

    function handleCourseSummaryClick() {
        courseElements.forEach(elem => elem.classList.toggle('course-summary-enabled'));
    }

    // Setup players/chat section
    const playerButton = sidebarBody.querySelector('#show-players-large-screen');
    playerButton.addEventListener('click', handlePlayerClick);
    const chatButton = sidebarBody.querySelector('#show-chat-large-screen');
    chatButton.addEventListener('click', handleChatClick);
    const chatPlayerTitle = sidebarBody.querySelector('#chat-player-title-large-screen');

    function handlePlayerClick() {
        if (currentChatOrPlayers === chatPlayersEnum.PLAYERS) return;
        currentChatOrPlayers = chatPlayersEnum.PLAYERS;

        chatButton.classList.remove('chat-player-selected');
        playerButton.classList.add('chat-player-selected');
        chatPlayerTitle.textContent = currentChatOrPlayers;
    }

    function handleChatClick() {
        if (currentChatOrPlayers === chatPlayersEnum.CHAT) return;
        currentChatOrPlayers = chatPlayersEnum.CHAT;
        
        playerButton.classList.remove('chat-player-selected');
        chatButton.classList.add('chat-player-selected');
        chatPlayerTitle.textContent = currentChatOrPlayers;
    }


})();

export default Sidebar;