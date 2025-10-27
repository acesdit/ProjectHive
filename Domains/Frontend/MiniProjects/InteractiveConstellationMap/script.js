// Constellation data
const constellations = {
    'ursa-major': {
        name: 'Ursa Major (The Great Bear)',
        description: 'Ursa Major is a constellation in the northern sky. Its name means "the great bear" in Latin. It is dominated by the widely recognized asterism known as the Big Dipper or the Plough.',
        stars: [
            { x: 200, y: 150, name: 'Dubhe' },
            { x: 250, y: 180, name: 'Merak' },
            { x: 300, y: 160, name: 'Phecda' },
            { x: 350, y: 190, name: 'Megrez' },
            { x: 400, y: 170, name: 'Alioth' },
            { x: 450, y: 200, name: 'Mizar' },
            { x: 500, y: 180, name: 'Alkaid' }
        ],
        connections: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6]]
    },
    'orion': {
        name: 'Orion (The Hunter)',
        description: 'Orion is a prominent constellation located on the celestial equator and visible throughout the world. It is one of the most conspicuous and recognizable constellations in the night sky.',
        stars: [
            { x: 600, y: 250, name: 'Betelgeuse' },
            { x: 650, y: 300, name: 'Bellatrix' },
            { x: 550, y: 350, name: 'Mintaka' },
            { x: 600, y: 350, name: 'Alnilam' },
            { x: 650, y: 350, name: 'Alnitak' },
            { x: 600, y: 400, name: 'Saiph' },
            { x: 550, y: 450, name: 'Rigel' }
        ],
        connections: [[0,1], [1,4], [4,5], [5,6], [6,2], [2,3], [3,4], [2,0]]
    },
    'cassiopeia': {
        name: 'Cassiopeia',
        description: 'Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology, who boasted about her unrivalled beauty.',
        stars: [
            { x: 800, y: 100, name: 'Schedar' },
            { x: 750, y: 150, name: 'Caph' },
            { x: 850, y: 200, name: 'Cih' },
            { x: 800, y: 250, name: 'Ruchbah' },
            { x: 750, y: 300, name: 'Segin' }
        ],
        connections: [[0,1], [1,2], [2,3], [3,4]]
    },
    'leo': {
        name: 'Leo (The Lion)',
        description: 'Leo is one of the constellations of the zodiac, lying between Cancer to the west and Virgo to the east. Its name is Latin for lion.',
        stars: [
            { x: 300, y: 400, name: 'Regulus' },
            { x: 350, y: 350, name: 'Algieba' },
            { x: 400, y: 380, name: 'Adhafera' },
            { x: 450, y: 350, name: 'Ras Elased' },
            { x: 500, y: 400, name: 'Denebola' }
        ],
        connections: [[0,1], [1,2], [2,3], [3,4], [1,4]]
    }
};

// Canvas setup
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = canvas.offsetWidth;
let height = canvas.height = canvas.offsetHeight;

// State variables
let selectedConstellation = 'all';
let showConnections = false;
let activeConstellation = null;
let backgroundStars = [];

// Initialize the canvas
function init() {
    createBackgroundStars();
    drawSky();
    
    // Event listeners
    canvas.addEventListener('click', handleCanvasClick);
    document.getElementById('resetBtn').addEventListener('click', resetView);
    document.getElementById('connectBtn').addEventListener('click', toggleConnections);
    document.getElementById('constellation').addEventListener('change', handleConstellationChange);
    document.getElementById('closeInfo').addEventListener('click', closeInfoPanel);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Create random background stars
function createBackgroundStars() {
    backgroundStars = [];
    for (let i = 0; i < 200; i++) {
        backgroundStars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2,
            opacity: Math.random() * 0.7 + 0.3,
            twinkleSpeed: Math.random() * 0.05 + 0.02
        });
    }
}

// Draw the night sky with stars
function drawSky() {
    // Clear canvas with dark blue gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0a0a2a');
    gradient.addColorStop(1, '#1a1a4a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw background stars
    drawBackgroundStars();
    
    // Draw constellations
    if (selectedConstellation === 'all') {
        Object.values(constellations).forEach(constellation => {
            drawConstellation(constellation);
        });
    } else {
        drawConstellation(constellations[selectedConstellation]);
    }
    
    // Highlight active constellation if any
    if (activeConstellation) {
        highlightConstellation(activeConstellation);
    }
    
    // Request next animation frame
    requestAnimationFrame(drawSky);
}

// Draw twinkling background stars
function drawBackgroundStars() {
    const time = Date.now() / 1000;
    
    backgroundStars.forEach(star => {
        // Calculate twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkle;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
    });
}

// Draw a constellation
function drawConstellation(constellation) {
    if (!constellation) return;
    
    // Draw stars
    constellation.stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Add glow effect
        ctx.beginPath();
        ctx.arc(star.x, star.y, 10, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
            star.x, star.y, 5,
            star.x, star.y, 10
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw star name on hover (simplified for this example)
        // In a full implementation, you would add hover detection
    });
    
    // Draw connections if enabled
    if (showConnections) {
        ctx.strokeStyle = 'rgba(100, 150, 255, 0.7)';
        ctx.lineWidth = 2;
        
        constellation.connections.forEach(connection => {
            const [start, end] = connection;
            const startStar = constellation.stars[start];
            const endStar = constellation.stars[end];
            
            ctx.beginPath();
            ctx.moveTo(startStar.x, startStar.y);
            ctx.lineTo(endStar.x, endStar.y);
            ctx.stroke();
        });
    }
}

// Highlight a specific constellation
function highlightConstellation(constellation) {
    // Draw a glow around the constellation
    ctx.shadowColor = 'rgba(100, 150, 255, 0.5)';
    ctx.shadowBlur = 20;
    
    constellation.stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 150, 255, 0.2)';
        ctx.fill();
    });
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}

// Handle canvas click to select stars/constellations
function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Check if any constellation was clicked
    let clickedConstellation = null;
    
    if (selectedConstellation === 'all') {
        // Check all constellations
        for (const key in constellations) {
            if (isPointInConstellation(x, y, constellations[key])) {
                clickedConstellation = constellations[key];
                break;
            }
        }
    } else {
        // Check only the selected constellation
        if (isPointInConstellation(x, y, constellations[selectedConstellation])) {
            clickedConstellation = constellations[selectedConstellation];
        }
    }
    
    if (clickedConstellation) {
        activeConstellation = clickedConstellation;
        showConstellationInfo(clickedConstellation);
    } else {
        activeConstellation = null;
        closeInfoPanel();
    }
}

// Check if a point is inside a constellation (simplified)
function isPointInConstellation(x, y, constellation) {
    // Simple check: if the point is near any star in the constellation
    for (const star of constellation.stars) {
        const distance = Math.sqrt((x - star.x) ** 2 + (y - star.y) ** 2);
        if (distance < 20) {
            return true;
        }
    }
    return false;
}

// Show constellation information panel
function showConstellationInfo(constellation) {
    const infoPanel = document.getElementById('constellationInfo');
    const nameElement = document.getElementById('constellationName');
    const descriptionElement = document.getElementById('constellationDescription');
    
    nameElement.textContent = constellation.name;
    descriptionElement.textContent = constellation.description;
    
    infoPanel.classList.remove('hidden');
}

// Close the information panel
function closeInfoPanel() {
    document.getElementById('constellationInfo').classList.add('hidden');
    activeConstellation = null;
}

// Reset the view
function resetView() {
    selectedConstellation = 'all';
    showConnections = false;
    activeConstellation = null;
    document.getElementById('constellation').value = 'all';
    closeInfoPanel();
}

// Toggle constellation connections
function toggleConnections() {
    showConnections = !showConnections;
    document.getElementById('connectBtn').textContent = 
        showConnections ? 'Hide Connections' : 'Connect Dots';
}

// Handle constellation selection change
function handleConstellationChange(event) {
    selectedConstellation = event.target.value;
    activeConstellation = null;
    closeInfoPanel();
}

// Handle window resize
function handleResize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    createBackgroundStars();
}

// Initialize the application when the page loads
window.addEventListener('load', init);