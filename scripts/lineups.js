let lineupData = {};
let currentMap = '';
let currentAgent = '';

// agent color mapping
const agentColors = {
    'Sova': '#00b5ad',
    'Viper': '#5ab552',
    'Brimstone': '#ff6b35',
    'Phoenix': '#ff8c42',
    'Jett': '#7bb2d9',
    'Raze': '#f9cb40',
    'Breach': '#d93b3b',
    'Omen': '#7a5cff',
    'Killjoy': '#f0e14a',
    'Cypher': '#f5f5f5',
    'Sage': '#6de1ff',
    'Reyna': '#b94eff',
    'Skye': '#6de1a3',
    'Yoru': '#4d5eff',
    'Astra': '#b467ff',
    'KAYO': '#ffffff',
    'Chamber': '#f0e14a',
    'Neon': '#1a8cff',
    'Fade': '#8a4fff',
    'Harbor': '#00ffb3',
    'Gekko': '#00ff4d',
    'Deadlock': '#ff66b3',
    'Iso': '#ff4d4d',
    'Clove': '#ff66ff'
};


const sampleLineupData = {
    Ascent: {
        minimap: "assets/images/minimaps/ascent.png",
        lineups: [
            {
                agent: "Sova",
                title: "A Site Recon Bolt",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Scan A site from A Main",
                position: { x: 35, y: 45 }
            },
            {
                agent: "Brimstone",
                title: "A Site Smokes",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Execute smokes for A site",
                position: { x: 40, y: 50 }
            },
            {
                agent: "Viper",
                title: "B Site Snake Bite",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Molly for B site control",
                position: { x: 60, y: 30 }
            },
            {
                agent: "Killjoy",
                title: "A Site Nanoswarm",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Post-plant molly for A site",
                position: { x: 38, y: 48 }
            },
            {
                agent: "Omen",
                title: "Mid Smoke",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "One-way smoke for mid control",
                position: { x: 50, y: 50 }
            }
        ]
    },
    Haven: {
        minimap: "assets/images/minimaps/haven.png",
        lineups: [
            {
                agent: "Sova",
                title: "A Site Shock Dart",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Early damage on A site",
                position: { x: 25, y: 40 }
            },
            {
                agent: "Viper",
                title: "C Site Snake Bite",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Molly for C site control",
                position: { x: 60, y: 30 }
            },
            {
                agent: "Brimstone",
                title: "C Site Molly",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Post-plant molly for C site",
                position: { x: 65, y: 35 }
            },
            {
                agent: "Killjoy",
                title: "B Site Setup",
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Turret and alarm bot placement",
                position: { x: 45, y: 55 }

                
            }
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentMap = urlParams.get('map');
    currentAgent = urlParams.get('agent') || '';
    
   
    const agentFilter = document.getElementById('agent-filter');
    if (agentFilter) {
        agentFilter.value = currentAgent;
        agentFilter.addEventListener('change', filterByAgent);
    }

   
    lineupData = sampleLineupData;
    renderLineups();
});

function renderLineups() {
    const mapNameEl = document.getElementById('map-name');
    const minimapEl = document.getElementById('minimap');
    const dotsContainerEl = document.getElementById('dots-container');

    if (!currentMap || !lineupData[currentMap]) {
        mapNameEl.textContent = "Unknown Map";
        minimapEl.alt = "Minimap not available";
        minimapEl.src = "";
        dotsContainerEl.innerHTML = '';
        return;
    }

    const { minimap, lineups } = lineupData[currentMap];
    
    mapNameEl.textContent = currentMap;
    minimapEl.src = minimap;
    minimapEl.alt = `${currentMap} Minimap`;
    dotsContainerEl.innerHTML = '';

    
    const filteredLineups = currentAgent 
        ? lineups.filter(lineup => lineup.agent.toLowerCase() === currentAgent.toLowerCase())
        : lineups;

  
    filteredLineups.forEach(lineup => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.classList.add(`agent-${lineup.agent.toLowerCase()}`);
        
        
        dot.style.backgroundColor = agentColors[lineup.agent] || '#ff0000';
        dot.style.border = "2px solid white";
        
        dot.style.left = `${lineup.position.x}%`;
        dot.style.top = `${lineup.position.y}%`;
        dot.title = `${lineup.agent}: ${lineup.title}`;
        dot.setAttribute('data-agent', lineup.agent);
        dot.onclick = () => showPopup(lineup.title, lineup.video, lineup.description);
        dotsContainerEl.appendChild(dot);
    });
}

function filterByAgent() {
    const agentFilter = document.getElementById('agent-filter');
    currentAgent = agentFilter.value;
    
    
    const newUrl = new URL(window.location);
    if (currentAgent) {
        newUrl.searchParams.set('agent', currentAgent);
    } else {
        newUrl.searchParams.delete('agent');
    }
    window.history.pushState({}, '', newUrl);
    
    
    renderLineups();
}

function showPopup(title, video, description) {
    const popupEl = document.getElementById('popup');
    const popupTitleEl = document.getElementById('popup-title');
    const popupVideoEl = document.getElementById('popup-video');
    const popupDescriptionEl = document.getElementById('popup-description');

    popupTitleEl.textContent = title;
    popupVideoEl.src = video;
    popupDescriptionEl.textContent = description;
    popupEl.style.display = 'block';
}

function closePopup() {
    const popupEl = document.getElementById('popup');
    const popupVideoEl = document.getElementById('popup-video');
    
    popupEl.style.display = 'none';
    popupVideoEl.src = "";
    
}

window.filterByAgent = filterByAgent;
window.closePopup = closePopup;