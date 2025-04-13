fetch('data/lineups.json')
    .then(response => response.json())
    .then(lineupData => {
        const urlParams = new URLSearchParams(window.location.search);
        const map = urlParams.get('map');

        const mapNameEl = document.getElementById('map-name');
        const minimapEl = document.getElementById('minimap');
        const dotsContainerEl = document.getElementById('dots-container');

        if (map && lineupData[map]) {
            const { minimap, lineups } = lineupData[map];

            mapNameEl.textContent = map;
            minimapEl.src = minimap;

            lineups.forEach(({ title, video, description, position }) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.style.left = `${position.x}%`;
                dot.style.top = `${position.y}%`;
                dot.onclick = () => showPopup(title, video, description);
                dotsContainerEl.appendChild(dot);
            });
        } else {
            mapNameEl.textContent = "Unknown Map";
            minimapEl.alt = "Minimap not available";
        }
    })
    .catch(error => console.error("Error loading lineups:", error));

function showPopup(title, video, description) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-video').src = video;
    document.getElementById('popup-description').textContent = description;
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-video').src = "";
}
