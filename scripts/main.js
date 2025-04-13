function viewLineups(map) {
    const agent = document.getElementById('agent')?.value || '';
    const url = `lineups.html?map=${encodeURIComponent(map)}${agent ? `&agent=${encodeURIComponent(agent)}` : ''}`;
    window.location.href = url;
}

function updateAgentImage() {
    const select = document.getElementById("agent");
    const agent = select.value;
    const display = document.getElementById("agent-display");
    const img = document.getElementById("agent-image");

    if (agent) {
        const imgPath = `assets/images/agents/${agent}.png`;
        img.src = imgPath;
        img.alt = agent;
        display.style.display = 'block';
    } else {
        display.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const agent = urlParams.get('agent');
    
    if (agent) {
        const select = document.getElementById('agent');
        if (select) select.value = agent;
        updateAgentImage();
    }
});